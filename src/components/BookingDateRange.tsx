import React, {useEffect, useState} from "react";
import {Moment} from "moment";
// @ts-ignore
import {enGB, fr} from "react-date-range/src/locale";

import {DateRange as MomentRange} from "moment-range";
import {DateRange} from "react-date-range";
import moment, {START_OF_RESERVATION_WEEK} from "../constants/constants";
import {Language} from "../model/Locale";
import i18n from "../utils/i18n";
import {Tooltip} from "@mui/material";
import {useTranslation} from "react-i18next";
import {useTheme} from "@mui/styles";
import {Theme} from "@mui/material/styles/createTheme";
import {CottageSelect} from "../model/CottageSelect";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {fetchPricingConfiguration, PricingConfigurationStateItem} from "../redux/slice/PricingSlice";
import {fetchReservedDates} from "../redux/slice/ReservedDatesSlice";

enum DayState {
    Enabled,
    Grayed,
    Disabled
}

interface SeasonRef {
    start: Moment,
    peakSeason: boolean,
    minConsecutiveDays: number
}

export class Props {
    cottageSelect: CottageSelect;
    vertical: boolean;
    onChange: (arg: MomentRange) => void;

    constructor(cottageSelect: CottageSelect, vertical: boolean, onChange: (arg: MomentRange) => void) {
        this.cottageSelect = cottageSelect;
        this.vertical = vertical;
        this.onChange = onChange;
    }
}

class State {
    reservedDates: Moment[];
    firstAvailableRange: MomentRange;
    period: MomentRange;
    selectingStart: boolean

    constructor(reservedDates: Moment[], period: MomentRange, firstAvailableRange: MomentRange) {
        this.reservedDates = reservedDates;
        this.firstAvailableRange = firstAvailableRange;
        this.period = period;
        this.selectingStart = true;
    }
}

export default function BookingDateRange(props: Props) {
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const theme: Theme = useTheme();

    const [pricingQueryBounds, setPricingQueryBounds] = useState<Moment>(moment().add(3, 'year'));
    const [seasons, setSeasons] = useState<SeasonRef[]>([]);

    const reservationsQueryEnd: number | undefined = useAppSelector((s) => s.reservedDates.queryEnd);
    const pricing = useAppSelector(s => s.pricing);
    const pearReservations = useAppSelector((s) => s.reservedDates.pear);
    const grapeReservations = useAppSelector((s) => s.reservedDates.grape);

    useEffect(() => {
        if (pricing.configuration) {
            setSeasons(pricing.configuration.map((item: PricingConfigurationStateItem) => {
                return {
                    start: moment(item.start),
                    peakSeason: 'OFF_SEASON' !== item.periodType,
                    minConsecutiveDays: item.minConsecutiveDays,
                }
            }));
        }
        if (pricing.queriedStart && pricing.queriedEnd) {
            setPricingQueryBounds(moment(pricing.queriedEnd));
        }
    }, [pricing.configuration, pricing.initializedAt, pricing.queriedStart, pricing.queriedEnd])

    const [state, setState] = useState<State>(() => buildState(props.cottageSelect, seasons, pearReservations || [], grapeReservations || []));

    useEffect(() => {
        if (pearReservations !== undefined && grapeReservations !== undefined) {
            props.onChange(state.period);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.cottageSelect, state.period])

    useEffect(() => {
        if (seasons && seasons.length) {
            const newState = buildState(props.cottageSelect, seasons, pearReservations || [], grapeReservations || []);
            setState(newState);
        }
    }, [seasons, grapeReservations, pearReservations, props.cottageSelect]);

    const fetchAdditionalSeasons = (from: Moment) => {
        if (pricingQueryBounds.isBefore(from)) {
            dispatch(fetchPricingConfiguration({
                start: pricingQueryBounds,
                end: pricingQueryBounds.clone().add(3, 'year'),
                dispatch: dispatch
            }))
        }
        const reservationsQueryEndMoment = moment(reservationsQueryEnd);
        if (reservationsQueryEndMoment.isBefore(from)) {
            dispatch(fetchReservedDates({
                start: reservationsQueryEndMoment,
                end: reservationsQueryEndMoment.clone().add(3, 'year'),
                dispatch: dispatch
            }));
        }
    }

    return (
        <DateRange ranges={[{
            key: "selection",
            startDate: state.period.start.toDate(),
            endDate: state.period.end.toDate()
        }]}
                   onChange={days => handleSelect(days, state, setState, seasons)}
                   onRangeFocusChange={rangeFocus => onRangeFocusChange(rangeFocus, setState)}
                   focusedRange={state.selectingStart ? [0, 0] : [0, 1]}
                   disabledDay={date => getDayState(moment(date), state.reservedDates, state.selectingStart, props.cottageSelect, seasons) !== DayState.Enabled}
                   minDate={getMinDate(state, seasons).toDate()}
                   maxDate={state.selectingStart ? undefined : firstReservedDate(state.period.start, state.reservedDates)?.toDate()}
                   dayContentRenderer={date => customDayContent(t, moment(date), props.cottageSelect, state, seasons)}
                   onShownDateChange={date => fetchAdditionalSeasons(moment(date))}
                   preventSnapRefocus
                   moveRangeOnFirstSelection={false}
                   months={2}
                   color={theme.palette.secondary.main}
                   rangeColors={[theme.palette.secondary.main]}
                   direction={props.vertical ? 'vertical' : 'horizontal'}
                   weekStartsOn={START_OF_RESERVATION_WEEK}
                   locale={i18n.language === Language.FR.valueOf() ? fr : enGB}/>
    );
}

function customDayContent(t: any, date: Moment, cottageSelect: CottageSelect, state: State, seasons: SeasonRef[]): React.ReactNode {
    let seasonRef = getSeasonRef(date, seasons);
    if (getDayState(date, state.reservedDates, state.selectingStart, cottageSelect, seasons) === DayState.Grayed
        && !state.period.contains(date)
        && (!seasonRef || (false !== firstReservedDate(state.period.start, state.reservedDates)?.isAfter(date, "day")
            && getMinDate(state, seasons).isBefore(date, "day")))) {
        let consecutiveNights = seasonRef.minConsecutiveDays - 1;
        return (
            <Tooltip
                placement='right'
                title={seasonRef?.peakSeason ?
                    t("common.weekly-rental", {count: consecutiveNights})
                    : t("common.minimum-nights", {count: consecutiveNights}) || `${consecutiveNights} nights minimum`}>
                <span className="grayedDate">{date.format("DD")}</span>
            </Tooltip>
        );
    }

    return <span>{date.format("DD")}</span>;
}

function getMinDate(state: State, seasons: SeasonRef[]): Moment {
    if (state.selectingStart) {
        return state.firstAvailableRange.start;
    } else {
        const seasonMinDaysShift = getSeasonRef(state.period.start, seasons).minConsecutiveDays - 1;
        return state.period.start.clone().add(seasonMinDaysShift, "days");
    }
}

function handleSelect(dates: any, state: State, setState: React.Dispatch<any>, seasons: SeasonRef[]) {
    let startMoment;
    let endMoment;
    if (state.selectingStart) {
        startMoment = moment(dates.selection.startDate);
        if (getSeasonRef(startMoment, seasons).peakSeason) {
            startMoment.startOf("week");
            endMoment = startMoment.clone().add(7, "days");
        } else {
            endMoment = startMoment.clone().add(2, "days");
        }
    } else {
        startMoment = state.period.start;
        endMoment = moment(dates.selection.endDate);
    }

    let selectedRange = moment.range(startMoment, endMoment);
    setState((prevState: State) => ({
        ...prevState,
        period: selectedRange
    }));
}

function onRangeFocusChange(rangeFocus: number[], setState: React.Dispatch<any>) {
    // Range focus is the following : [date selection index(0 if single period), 0/1 (period start/end)]
    setState((prevState: State) => ({
        ...prevState,
        selectingStart: rangeFocus[1] === 0
    }))
}

function getDayState(date: Moment, reservedDates: Moment[], selectingStart: boolean, cottageSelect: CottageSelect, seasons: SeasonRef[]): DayState {
    const seasonRef = getSeasonRef(date, seasons);
    if (seasonRef.peakSeason) {
        // Disabled if some days of the week are in the past !
        // If first day of reservation -> date is available for selection !
        if (cottageSelect !== CottageSelect.BOTH
            || date.clone().startOf("week").isBefore(today())
            || isReserved(selectingStart, date, reservedDates, "week")) {
            return DayState.Disabled;
        }
        if (selectingStart || date.weekday() === 0) {
            return DayState.Enabled;
        }
        return DayState.Grayed;
    }

    if (isReserved(selectingStart, date, reservedDates, "day")) {
        return DayState.Disabled;
    }
    if (selectingStart && (firstReservedDate(date, reservedDates)?.diff(date, "days", false) || 100) < seasonRef.minConsecutiveDays - 1) {
        return DayState.Grayed;
    }
    if (selectingStart
        && cottageSelect !== CottageSelect.BOTH
        && getSeasonRef(date.clone().add(seasonRef.minConsecutiveDays - 1, 'days'), seasons).peakSeason) {
        return DayState.Disabled;
    }

    return DayState.Enabled;
}

function buildState(cottageSelect: CottageSelect, seasons: SeasonRef[], pearReservations: number[], grapeReservations: number[]): State {
    const reservedDates = cottageReservationArray(cottageSelect, pearReservations, grapeReservations).map(epoch => moment(epoch));
    const firstAvailableRange = getFirstAvailablePeriod(reservedDates, cottageSelect, seasons);
    return new State(reservedDates, firstAvailableRange, moment.range(firstAvailableRange.start, firstAvailableRange.end));
}

function cottageReservationArray(cottage: CottageSelect, pearReservations: number[], grapeReservations: number[]): number[] {
    switch (cottage) {
        case CottageSelect.BOTH:
            return Array.from(new Set([...grapeReservations, ...pearReservations]));
        case CottageSelect.PEAR:
            return pearReservations || [];
        case CottageSelect.GRAPE:
            return grapeReservations || [];
    }
}

function getFirstAvailablePeriod(reservedDates: Moment[], cottageSelect: CottageSelect, seasons: SeasonRef[]): MomentRange {
    let start = today();
    while (getDayState(start, reservedDates, true, cottageSelect, seasons) !== DayState.Enabled) {
        start.add(1, "day");
    }

    const end = start
        .clone()
        .add(getSeasonRef(start, seasons).minConsecutiveDays - 1, "days");

    return moment.range(start, end);
}

function isReserved(selectingStart: boolean, date: Moment, reservedDates: Moment[], unitOfTime: moment.unitOfTime.Diff): boolean {
    const comparedDate = selectingStart ? date : date.clone().subtract(1, unitOfTime);
    return reservedDates.some(d => d.isSame(comparedDate, unitOfTime))
}

function today(): Moment {
    return moment().startOf('day');
}

function firstReservedDate(after: Moment | undefined, reservedDates: Moment[]): Moment | undefined {
    return reservedDates.filter(m => m.isAfter(after, "days"))
        .sort((a, b) => a.unix() - b.unix())[0] || undefined;
}

function getSeasonRef(date: Moment, seasons: SeasonRef[]): SeasonRef {
    let i = findLastIndex(seasons, value => date.isSameOrAfter(value.start));
    return seasons[i] || {
        peakSeason: false,
        minConsecutiveDays: 3,
        start: date
    };
}

function findLastIndex<T>(array: Array<T>, predicate: (value: T, index: number, obj: T[]) => boolean): number {
    let l = array.length;
    while (l--) {
        if (predicate(array[l], l, array))
            return l;
    }
    return -1;
}
