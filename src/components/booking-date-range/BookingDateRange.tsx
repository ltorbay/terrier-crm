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

const DAY_STATE_CACHE: Record<string, DayState> = {};

enum DayState {
    Enabled,
    Grayed,
    Disabled
}

class DayStateKey {
    date: Moment;
    selectingStart: boolean;
    enablePeakSeason: boolean;

    toString(): string {
        return `${this.date.format("YYYYMMDD")}|${this.selectingStart}|${this.enablePeakSeason}`;
    }

    constructor(date: Moment, selectingStart: boolean, enablePeakSeason: boolean) {
        this.date = date;
        this.selectingStart = selectingStart;
        this.enablePeakSeason = enablePeakSeason;
    }
}

class Props {
    reservedDates: Moment[];
    enablePeakSeason: boolean;
    onChange: (arg: BookingSelection) => void;

    constructor(reservedDates: Moment[], enablePeakSeason: boolean, onChange: (arg: BookingSelection) => void) {
        this.reservedDates = reservedDates;
        this.enablePeakSeason = enablePeakSeason;
        this.onChange = onChange;
    }
}

class State {
    period: MomentRange;
    selectingStart: boolean

    constructor(period: MomentRange) {
        this.period = period;
        this.selectingStart = true;
    }
}

export default function BookingDateRange(props: Props) {
    const {t} = useTranslation();

    const [firstAvailableRange] = useState<MomentRange>(() => getFirstAvailablePeriod(props.reservedDates, props.enablePeakSeason))
    const [state, setState] = useState<State>(() => new State(moment.range(firstAvailableRange.start, firstAvailableRange.end)));

    useEffect(() => {
        props.onChange(new BookingSelection(state.period));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <DateRange ranges={[{
            key: "selection",
            startDate: state.period.start.toDate(),
            endDate: state.period.end.toDate()
        }]}
                   onChange={days => handleSelect(days, props.onChange, state, setState)}
                   onRangeFocusChange={rangeFocus => onRangeFocusChange(rangeFocus, setState)}
                   focusedRange={state.selectingStart ? [0, 0] : [0, 1]}
                   disabledDay={date => cachedDayState(moment(date), props.reservedDates, state.selectingStart, props.enablePeakSeason) !== DayState.Enabled}
                   minDate={getMinDate(state, firstAvailableRange.start).toDate()}
                   maxDate={state.selectingStart ? undefined : firstReservedDate(state.period.start, props.reservedDates)?.toDate()}
                   dayContentRenderer={date => customDayContent(moment(date), props, state, firstAvailableRange.start, t)}
                   preventSnapRefocus={true}
                   moveRangeOnFirstSelection={false}
                   months={2}
                   direction="horizontal"
                   weekStartsOn={START_OF_RESERVATION_WEEK}
                   locale={i18n.language === Language.FR.valueOf() ? fr : enGB}/>
    );
}

function getFirstAvailablePeriod(reservedDates: Moment[], enablePeakSeason: boolean): MomentRange {
    let start = today();
    while (cachedDayState(start, reservedDates, true, enablePeakSeason) !== DayState.Enabled) {
        start.add(1, "day");
    }

    const end = start
        .clone()
        .add(isPeakSeason(start.date(), start.month()) ?
            MIN_CONSECUTIVE_NIGHTS_PEAK_SEASON
            : MIN_CONSECUTIVE_NIGHTS_OFF_SEASON, "days");

    return moment.range(start, end);
}

function customDayContent(date: Moment, props: Props, state: State, firstAvailableDateStart: Moment, t: any): React.ReactNode {
    let peakSeason = isPeakSeason(date.date(), date.month());
    if (cachedDayState(date, props.reservedDates, state.selectingStart, props.enablePeakSeason) === DayState.Grayed
        && !state.period.contains(date)
        && (!peakSeason || (false !== firstReservedDate(state.period.start, props.reservedDates)?.isAfter(date, "day")
            && getMinDate(state, firstAvailableDateStart).isBefore(date, "day")))) {
        let consecutiveDays = peakSeason ? MIN_CONSECUTIVE_NIGHTS_PEAK_SEASON : MIN_CONSECUTIVE_NIGHTS_OFF_SEASON;
        return (
            <Tooltip
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
        period: selectedRange,
        selectingStart: prevState.selectingStart
    }));

    if (!state.selectingStart) {
        onChange(new BookingSelection(selectedRange))
    }
}

function onRangeFocusChange(rangeFocus: number[], setState: React.Dispatch<any>) {
    // Range focus is the following : [date selection index(0 if single period), 0/1 (period start/end)]
    setState((prevState: State) => ({
        period: prevState.period,
        selectingStart: rangeFocus[1] === 0
    }))
}

function cachedDayState(date: Moment, reservedDates: Moment[], selectingStart: boolean, enablePeakSeason: boolean): DayState {
    let key = new DayStateKey(date, selectingStart, enablePeakSeason).toString();
    let value = DAY_STATE_CACHE[key];
    if (value !== undefined) return value;

    value = getDayState(date, reservedDates, selectingStart, enablePeakSeason);
    DAY_STATE_CACHE[key] = value;
    return value;
}

function getDayState(date: Moment, reservedDates: Moment[], selectingStart: boolean, enablePeakSeason: boolean): DayState {
    if (isPeakSeason(date.date(), date.month())) {
        // Disabled if some days of the week are in the past !
        // If first day of reservation -> date is available for selection !
        if (!enablePeakSeason
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
