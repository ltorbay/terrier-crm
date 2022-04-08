import React from "react";
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

export class BookingDateRange extends React.Component<Props, State> {
    firstAvailableDateStart: Moment;
    firstAvailableDateEnd: Moment;

    constructor(props: Props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.enabledDay = this.enabledDay.bind(this);
        this.firstReservedDate = this.firstReservedDate.bind(this);
        this.customDayContent = this.customDayContent.bind(this);

        // TODO find the first non reserved date allowing a big enough range
        // And find another way of calculating season start/ends => find next occurrence of the month/day specified ?
        this.firstAvailableDateStart = moment()
            .add(6, "days")
            .startOf("week");
        this.firstAvailableDateEnd = this.firstAvailableDateStart
            .clone()
            .add(6, "days");

        this.state = new State(moment.range(this.firstAvailableDateStart, this.firstAvailableDateEnd));
    }

    handleSelect(dates: any) {
        if (this.state.selectingStart) {
            if (this.isPeakSeason(this.state.period.start.date(), this.state.period.start.month())) {
                let startDate = moment(dates.selection.startDate)
                    .startOf("week");
                dates.selection.startDate = startDate.toDate();
                dates.selection.endDate = startDate.clone().add(6, "days").toDate();
            } else {
                dates.selection.endDate = moment(dates.selection.startDate).add(2, "days").toDate();
            }
        }
        let selectedRange = moment.range(dates.selection.startDate, dates.selection.endDate);
        let selectingStart = !this.state.selectingStart;
        this.setState({
            period: selectedRange,
            selectingStart: selectingStart
        });

        if (selectingStart) {
            this.props.onChange(new BookingSelection(selectedRange))
        }
    }

    enabledDay(date: Moment): boolean {

        // TODO Handle differently if dates selected are in off season
        // TODO handle correctly the switch between seasons -> allow reservations going over the period
        // TODO also check with minDate -> better performance
        // TODO include minimal periods in reserved dates check (from backend ?)
        // FIXME does the include check work ?
        return !this.props.reservedDates.some(d => d.isSame(date, "day"))
            && (this.state.selectingStart || date.weekday() === 6);
    }

    isPeakSeason(date: number, month: number) {
        // This simplification only works if peak season does not contain year change, which I hope it never will...
        let afterStart = month > PEAK_SEASON_START_JSON.month
            || (month === PEAK_SEASON_START_JSON.month && date >= PEAK_SEASON_START_JSON.day);
        let beforeEnd = month < PEAK_SEASON_END_JSON.month
            || (month === PEAK_SEASON_END_JSON.month && date <= PEAK_SEASON_END_JSON.day);
        return afterStart && beforeEnd;
    }

    firstReservedDate(after: Moment | undefined): Moment | undefined {
        let sortedDates = this.props.reservedDates;
        sortedDates.filter(m => !after || m.isAfter(after, "days"))
            .sort((a, b) => a.unix() - b.unix());
        return sortedDates[0] || undefined;
    }

    // customDayContent(day: Date) {
    //     let momentDay = moment(day);
    //     let extraDot = null;
    //     if (this.isPeakSeason(day.getDate(), day.getMonth())) {
    //         extraDot = (
    //             <div
    //                 style={{
    //                     height: "5px",
    //                     width: "5px",
    //                     borderRadius: "100%",
    //                     background: "orange",
    //                     position: "absolute",
    //                     top: 2,
    //                     right: 2,
    //                 }}
    //             />
    //         )
    //     }
    //     return (
    //         <span style={{
    //             background: this.isPeakSeason(day.getDate(), day.getMonth()) ? "orange" : "dark"
    //         }}>{moment(day).format("DD")}</span>
    //     )
    // }

    customDayContent(day: Date) {
        const {t} = useTranslation();
        return this.isPeakSeason(day.getDate(), day.getMonth()) ? (
            <Tooltip title={t("common.peak-season") || "Peak season"}>
                <strong>
                    <span>{moment(day).format("DD")}</span>
                </strong>
            </Tooltip>
        ) : (
            <span>{moment(day).format("DD")}</span>
        );
    }

    render() {
        // TODO cleanly handle locale
        return (
            <DateRange ranges={[{
                key: "selection",
                startDate: this.state.period.start.toDate(),
                endDate: this.state.period.end.toDate()
            }]}
                       onChange={this.handleSelect}
                       disabledDay={date => !this.enabledDay(moment(date))}
                       minDate={this.firstAvailableDateStart.toDate()}
                       maxDate={this.state.selectingStart ? undefined : this.firstReservedDate(this.state.period.start)?.toDate()}
                       dayContentRenderer={this.customDayContent}
                       preventSnapRefocus={true}
                       moveRangeOnFirstSelection={true}
                       months={2}
                       direction="horizontal"
                       weekStartsOn={0}
                       locale={fr}/>
        );
    }
}