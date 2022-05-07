import React, {useEffect, useState} from "react";
import {Moment} from "moment";
import "./BookingDateRange.css";
// @ts-ignore
import {enGB, fr} from "react-date-range/src/locale";

import moment from "../../index";
import {DateRange as MomentRange} from "moment-range";
import {DateRange} from "react-date-range";
import {BookingSelection} from "../../model/BookingSelection";
import {
    MIN_CONSECUTIVE_NIGHTS_OFF_SEASON,
    MIN_CONSECUTIVE_NIGHTS_PEAK_SEASON,
    START_OF_RESERVATION_WEEK
} from "../../constants/constants";
import {Language} from "../../model/Locale";
import i18n from "../../i18n";
import {Tooltip} from "@mui/material";
import {useTranslation} from "react-i18next";
import {isPeakSeason} from "../../utils/commonDatesCalculations";
import {useTheme} from "@mui/styles";
import {Theme} from "@mui/material/styles/createTheme";
import {CottageSelect} from "../../model/CottageSelect";

enum DayState {
    Enabled,
    Grayed,
    Disabled
}

class Props {
    pearReservations: number[];
    grapesReservations: number[];
    cottageSelect: CottageSelect;
    vertical: boolean;
    onChange: (arg: BookingSelection) => void;

    constructor(pearReservations: number[], grapesReservations: number[], cottageSelect: CottageSelect, vertical: boolean, onChange: (arg: BookingSelection) => void) {
        this.pearReservations = pearReservations;
        this.grapesReservations = grapesReservations;
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

    constructor(reservedDates: Moment[], firstAvailableRange: MomentRange, period: MomentRange) {
        this.reservedDates = reservedDates;
        this.firstAvailableRange = firstAvailableRange;
        this.period = period;
        this.selectingStart = true;
    }
}

export default function BookingDateRange(props: Props) {
    const {t} = useTranslation();
    const theme: Theme = useTheme();

    const [state, setState] = useState<State>(() => buildState(props));
    console.log('building component')

    useEffect(() => {
        const newState = buildState(props);
        setState(newState);
        props.onChange(new BookingSelection(newState.period));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.grapesReservations, props.pearReservations, props.cottageSelect]);

    return (
        <DateRange ranges={[{
            key: "selection",
            startDate: state.period.start.toDate(),
            endDate: state.period.end.toDate()
        }]}
                   onChange={days => handleSelect(days, props.onChange, state, setState)}
                   onRangeFocusChange={rangeFocus => onRangeFocusChange(rangeFocus, setState)}
                   focusedRange={state.selectingStart ? [0, 0] : [0, 1]}
                   disabledDay={date => getDayState(moment(date), state.reservedDates, state.selectingStart, props.cottageSelect) !== DayState.Enabled}
                   minDate={getMinDate(state, state.firstAvailableRange.start).toDate()}
                   maxDate={state.selectingStart ? undefined : firstReservedDate(state.period.start, state.reservedDates)?.toDate()}
                   dayContentRenderer={date => customDayContent(moment(date), state.reservedDates, props.cottageSelect, state, state.firstAvailableRange.start, t)}
                   preventSnapRefocus={true}
                   moveRangeOnFirstSelection={false}
                   months={2}
                   color={theme.palette.secondary.main}
                   rangeColors={[theme.palette.secondary.main]}
                   direction={props.vertical ? 'vertical' : 'horizontal'}
                   weekStartsOn={START_OF_RESERVATION_WEEK}
                   locale={i18n.language === Language.FR.valueOf() ? fr : enGB}/>
    );
}

function customDayContent(date: Moment, reservedDates: Moment[], cottageSelect: CottageSelect, state: State, firstAvailableDateStart: Moment, t: any): React.ReactNode {
    let peakSeason = isPeakSeason(date.date(), date.month());
    if (getDayState(date, reservedDates, state.selectingStart, cottageSelect) === DayState.Grayed
        && !state.period.contains(date)
        && (!peakSeason || (false !== firstReservedDate(state.period.start, reservedDates)?.isAfter(date, "day")
            && getMinDate(state, firstAvailableDateStart).isBefore(date, "day")))) {
        let consecutiveDays = peakSeason ? MIN_CONSECUTIVE_NIGHTS_PEAK_SEASON : MIN_CONSECUTIVE_NIGHTS_OFF_SEASON;
        return (
            <Tooltip
                placement='right'
                title={peakSeason ?
                    t("common.weekly-rental", {count: consecutiveDays})
                    : t("common.minimum-nights", {count: consecutiveDays}) || `${consecutiveDays} nights minimum`}>
                <span className="grayedDate">{date.format("DD")}</span>
            </Tooltip>
        );
    }

    return <span>{date.format("DD")}</span>;
}

function getMinDate(state: State, firstAvailableDateStart: moment.Moment): Moment {
    if (state.selectingStart) {
        return firstAvailableDateStart;
    } else {
        const seasonMinDaysShift = isPeakSeason(state.period.start.date(), state.period.start.month()) ?
            MIN_CONSECUTIVE_NIGHTS_PEAK_SEASON
            : MIN_CONSECUTIVE_NIGHTS_OFF_SEASON;
        return state.period.start.clone().add(seasonMinDaysShift, "days");
    }
}

function handleSelect(dates: any, onChange: (arg: BookingSelection) => void, state: State, setState: React.Dispatch<any>) {
    let startMoment;
    let endMoment;
    if (state.selectingStart) {
        startMoment = moment(dates.selection.startDate);
        if (isPeakSeason(startMoment.date(), startMoment.month())) {
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

    if (!state.selectingStart) {
        onChange(new BookingSelection(selectedRange))
    }
}

function onRangeFocusChange(rangeFocus: number[], setState: React.Dispatch<any>) {
    // Range focus is the following : [date selection index(0 if single period), 0/1 (period start/end)]
    setState((prevState: State) => ({
        ...prevState,
        selectingStart: rangeFocus[1] === 0
    }))
}

function getDayState(date: Moment, reservedDates: Moment[], selectingStart: boolean, cottageSelect: CottageSelect): DayState {
    if (isPeakSeason(date.date(), date.month())) {
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
    if (selectingStart && (firstReservedDate(date, reservedDates)?.diff(date, "days", false) || 100) < MIN_CONSECUTIVE_NIGHTS_OFF_SEASON) {
        return DayState.Grayed;
    }
    return DayState.Enabled;
}

function buildState(props: Props): State {
    console.log('building state')
    const reservedDates = cottageReservationArray(props.cottageSelect, props.pearReservations, props.grapesReservations).map(epoch => moment(epoch));
    const firstAvailableRange = getFirstAvailablePeriod(reservedDates, props.cottageSelect);
    const period = moment.range(firstAvailableRange.start, firstAvailableRange.end);
    return new State(reservedDates, firstAvailableRange, period);
}

function cottageReservationArray(cottage: CottageSelect, pearReservations: number[], grapesReservations: number[]): number[] {
    console.log('rebuilding reservation array with cottage ' + cottage)
    switch (cottage) {
        case CottageSelect.BOTH:
            return Array.from(new Set([...grapesReservations, ...pearReservations]));
        case CottageSelect.PEAR:
            return pearReservations || [];
        case CottageSelect.GRAPE:
            return grapesReservations || [];
    }
}

function getFirstAvailablePeriod(reservedDates: Moment[], cottageSelect: CottageSelect): MomentRange {
    let start = today();
    while (getDayState(start, reservedDates, true, cottageSelect) !== DayState.Enabled) {
        start.add(1, "day");
    }

    const end = start
        .clone()
        .add(isPeakSeason(start.date(), start.month()) ?
            MIN_CONSECUTIVE_NIGHTS_PEAK_SEASON
            : MIN_CONSECUTIVE_NIGHTS_OFF_SEASON, "days");

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
