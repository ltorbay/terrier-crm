import React, {useState} from "react";
// @ts-ignore
import {fr} from "react-date-range/src/locale";
import {Moment} from "moment";

import moment from "../index";
import {DateRange as MomentRange} from "moment-range";
import {DateRange} from "react-date-range";
import {BookingSelection} from "../model/BookingSelection";
import {PEAK_SEASON_END_JSON, PEAK_SEASON_START_JSON} from "../const/constants";
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
                   disabledDay={date => !enabledDay(moment(date), props, state)}
                   minDate={firstAvailableDateStart.toDate()}
                   maxDate={state.selectingStart ? undefined : firstReservedDate(state.period.start, props)?.toDate()}
                   dayContentRenderer={customDayContent}
                   preventSnapRefocus={true}
                   moveRangeOnFirstSelection={true}
                   months={2}
                   direction="horizontal"
                   weekStartsOn={0}
                   locale={fr}/>
    );
}

function handleSelect(dates: any, onChange: (arg: BookingSelection) => void, state: State, setState: React.Dispatch<any>) {
    if (state.selectingStart) {
        if (isPeakSeason(state.period.start.date(), state.period.start.month())) {
            let startDate = moment(dates.selection.startDate)
                .startOf("week");
            dates.selection.startDate = startDate.toDate();
            dates.selection.endDate = startDate.clone().add(6, "days").toDate();
        } else {
            dates.selection.endDate = moment(dates.selection.startDate).add(2, "days").toDate();
        }
    }
    let selectedRange = moment.range(dates.selection.startDate, dates.selection.endDate);
    let selectingStart = !state.selectingStart;
    setState({
        period: selectedRange,
        selectingStart: selectingStart
    });

    if (selectingStart) {
        onChange(new BookingSelection(selectedRange))
    }
}

function enabledDay(date: Moment, props: Props, state: State): boolean {
    // TODO Handle differently if date is in off season
    // TODO handle correctly the switch between seasons -> allow reservations going over the period
    // TODO also check with minDate -> better performance
    // TODO include minimal periods in reserved dates check (from backend ?)
    return !props.reservedDates.some(d => d.isSame(date, "day"))
        && (state.selectingStart || date.weekday() === 6);
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
    sortedDates.filter(m => !after || m.isAfter(after, "days"))
        .sort((a, b) => a.unix() - b.unix());
    return sortedDates[0] || undefined;
}
