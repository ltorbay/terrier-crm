import React, {useState} from "react";
import {Moment} from "moment";
import "./BookingDateRange.css";
// @ts-ignore
import {enGB, fr} from "react-date-range/src/locale";

import moment from "../../index";
import {DateRange as MomentRange} from "moment-range";
import {DateRange} from "react-date-range";
import {BookingSelection} from "../../model/BookingSelection";
import {
    MIN_CONSECUTIVE_DAYS_OFF_SEASON,
    MIN_CONSECUTIVE_DAYS_PEAK_SEASON,
    START_OF_RESERVATION_WEEK
} from "../../const/constants";
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

    toString(): string {
        return `${this.date.format("YYYYMMDD")}|${this.selectingStart}`;
    }

    constructor(date: Moment, selectingStart: boolean) {
        this.date = date;
        this.selectingStart = selectingStart;
    }
}

class Props {
    // TODO handle selecting one or the other building
    reservedDates: Moment[];
    onChange: (arg: BookingSelection) => void;

    constructor(reservedDates: Moment[], onChange: (arg: BookingSelection) => void) {
        this.reservedDates = reservedDates;
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
    // TODO handle saturday to saturday reservations for full weeks !
    const {t} = useTranslation();
    const firstAvailableDateStart = moment()
        .add(6, "days")
        .startOf("week");
    const firstAvailableDateEnd = firstAvailableDateStart
        .clone()
        .add(6, "days");
    const [state, setState] = useState<State>(new State(moment.range(firstAvailableDateStart, firstAvailableDateEnd)));

    return (
        <DateRange ranges={[{
            key: "selection",
            startDate: state.period.start.toDate(),
            endDate: state.period.end.toDate()
        }]}
                   onChange={days => handleSelect(days, props.onChange, state, setState)}
                   onRangeFocusChange={rangeFocus => onRangeFocusChange(rangeFocus, setState)}
                   focusedRange={state.selectingStart ? [0, 0] : [0, 1]}
                   disabledDay={date => cachedDayState(moment(date), props, state) !== DayState.Enabled && !state.period.contains(date)}
                   minDate={getMinDate(state, firstAvailableDateStart).toDate()}
                   maxDate={state.selectingStart ? undefined : firstReservedDate(state.period.start, props)?.toDate()}
                   dayContentRenderer={date => customDayContent(moment(date), props, state, firstAvailableDateStart, t)}
                   preventSnapRefocus={true}
                   moveRangeOnFirstSelection={false}
                   months={2}
                   direction="horizontal"
                   weekStartsOn={START_OF_RESERVATION_WEEK}
                   locale={i18n.language === Language.FR.valueOf() ? fr : enGB}/>
    );
}

function customDayContent(date: Moment, props: Props, state: State, firstAvailableDateStart: Moment, t: any): React.ReactNode {
    let peakSeason = isPeakSeason(date.date(), date.month());
    if (cachedDayState(date, props, state) === DayState.Grayed
        && !state.period.contains(date)
        && (!peakSeason || (false !== firstReservedDate(state.period.start, props)?.isAfter(date, "day")
            && getMinDate(state, firstAvailableDateStart).isBefore(date, "day")))) {
        let consecutiveDays = peakSeason ? MIN_CONSECUTIVE_DAYS_PEAK_SEASON : MIN_CONSECUTIVE_DAYS_OFF_SEASON - 1;
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
            MIN_CONSECUTIVE_DAYS_PEAK_SEASON - 1
            : MIN_CONSECUTIVE_DAYS_OFF_SEASON - 1;
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
            endMoment = startMoment.clone().add(6, "days");
        } else {
            endMoment = startMoment.clone().add(2, "days");
        }
    } else {
        startMoment = state.period.start;
        let selectedEnd = moment(dates.selection.endDate)
        if (isPeakSeason(selectedEnd.date(), selectedEnd.month())) {
            endMoment = selectedEnd.endOf("week");
        } else {
            endMoment = selectedEnd;
        }
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

function cachedDayState(date: Moment, props: Props, state: State): DayState {
    let key = new DayStateKey(date, state.selectingStart).toString();
    let value = DAY_STATE_CACHE[key];
    if (value !== undefined) return value;

    value = getDayState(date, props, state);
    DAY_STATE_CACHE[key] = value;
    return value;
}

function getDayState(date: Moment, props: Props, state: State): DayState {
    const peakSeason = isPeakSeason(date.date(), date.month());
    if (peakSeason) {
        if (props.reservedDates.some(d => d.isSame(date, "week"))) {
            return DayState.Disabled;
        }
        if (state.selectingStart || date.weekday() === 6) {
            return DayState.Enabled;
        }
        return DayState.Grayed;
    }

    if (props.reservedDates.some(d => d.isSame(date, "day"))) {
        return DayState.Disabled;
    }
    if (state.selectingStart && (firstReservedDate(date, props)?.diff(date, "days", false) || 100) < MIN_CONSECUTIVE_DAYS_OFF_SEASON) {
        return DayState.Grayed;
    }
    return DayState.Enabled;
}

function firstReservedDate(after: Moment | undefined, props: Props): Moment | undefined {
    return props.reservedDates.filter(m => m.isAfter(after, "days"))
        .sort((a, b) => a.unix() - b.unix())[0] || undefined;
}
