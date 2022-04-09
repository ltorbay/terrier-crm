import React, {useState} from "react";
// @ts-ignore
import {fr} from "react-date-range/src/locale";
import {Moment} from "moment";

import moment from "../index";
import {DateRange as MomentRange} from "moment-range";
import {DateRange} from "react-date-range";
import {BookingSelection} from "../model/BookingSelection";
import {
    MIN_CONSECUTIVE_DAYS_OFF_SEASON,
    MIN_CONSECUTIVE_DAYS_PEAK_SEASON,
    PEAK_SEASON_END_JSON,
    PEAK_SEASON_START_JSON,
    START_OF_RESERVATION_WEEK
} from "../const/constants";
import {Tooltip} from "@mui/material";
import {useTranslation} from "react-i18next";


class Props {
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
    const {t} = useTranslation();

    // TODO find the first non reserved date allowing a big enough range, depends on season !
    const firstAvailableDateStart = moment()
        .add(6, "days")
        .startOf("week");
    const firstAvailableDateEnd = firstAvailableDateStart
        .clone()
        .add(6, "days");
    const [state, setState] = useState<State>(new State(moment.range(firstAvailableDateStart, firstAvailableDateEnd)));

    const content = (day: Date) => (<span>{moment(day).format("DD")}</span>);
    // TODO add visual separator between high and low season
    const customDayContent = (day: Date) => isPeakSeason(day.getDate(), day.getMonth()) ? (
        <Tooltip title={t("common.peak-season") || "Peak season"}>
            {content(day)}
        </Tooltip>
    ) : (
        <Tooltip title={t("common.off-season") || "Off season"}>
            <i>
                {content(day)}
            </i>
        </Tooltip>
    );

    // TODO cleanly handle locale mapping to react-date-range locale object
    return (
        <DateRange ranges={[{
            key: "selection",
            startDate: state.period.start.toDate(),
            endDate: state.period.end.toDate()
        }]}
                   onChange={days => handleSelect(days, props.onChange, state, setState)}
                   onRangeFocusChange={rangeFocus => onRangeFocusChange(rangeFocus, state, setState)}
                   focusedRange={state.selectingStart ? [0, 0] : [0, 1]}
                   disabledDay={date => !enabledDay(moment(date), props, state)}
                   minDate={getMinDate(state, firstAvailableDateStart).toDate()}
                   maxDate={state.selectingStart ? undefined : firstReservedDate(state.period.start, props)?.toDate()}
                   dayContentRenderer={customDayContent}
                   preventSnapRefocus={true}
                   moveRangeOnFirstSelection={false}
                   months={2}
                   direction="horizontal"
                   weekStartsOn={START_OF_RESERVATION_WEEK}
                   locale={fr}/>
    );
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
        endMoment = moment(dates.selection.endDate)
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

function onRangeFocusChange(rangeFocus: number[], state: State, setState: React.Dispatch<any>) {
    // Range focus is the following : [date selection index(0 if single period), 0/1 (period start/end)]
    setState((prevState: State) => ({
        period: prevState.period,
        selectingStart: rangeFocus[1] === 0
    }))
}

function enabledDay(date: Moment, props: Props, state: State): boolean {
    return !props.reservedDates.some(d => d.isSame(date, "day"))
        && (state.selectingStart || (isPeakSeason(date.date(), date.month()) ? date.weekday() === 6 : true));
}

function isPeakSeason(date: number, month: number) {
    // This simplification only works if peak season does not contain year change, which I hope it never will...
    let afterStart = month > PEAK_SEASON_START_JSON.month
        || (month === PEAK_SEASON_START_JSON.month && date >= PEAK_SEASON_START_JSON.day);
    let beforeEnd = month < PEAK_SEASON_END_JSON.month
        || (month === PEAK_SEASON_END_JSON.month && date <= PEAK_SEASON_END_JSON.day);
    return afterStart && beforeEnd;
}

function firstReservedDate(after: Moment | undefined, props: Props): Moment | undefined {
    let sortedDates = props.reservedDates;
    return sortedDates.filter(m => m.isAfter(after, "days"))
        .sort((a, b) => a.unix() - b.unix())[0] || undefined;
}
