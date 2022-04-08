import React from "react";
// @ts-ignore
import {fr} from "react-date-range/src/locale";
import {Moment} from "moment";

import moment from "../index";
import {DateRange as MomentRange} from "moment-range";
import {DateRange} from "react-date-range";
import {BookingSelection} from "../model/BookingSelection";

class Props {
    reservedDates: string[];
    onChange: (arg: BookingSelection) => void;

    constructor(reservedDates: string[], onChange: (arg: BookingSelection) => void) {
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

        // TODO find the first non reserved date allowing a big enough range
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
            // FIXME
            // let startDate = moment(dates.selection.startDate)
            //     .startOf("week");
            // dates.selection.startDate = startDate.toDate();
            // dates.selection.endDate = startDate.clone().add(6, "days").toDate();
            dates.selection.endDate = moment(dates.selection.startDate).clone().add(6, "days").toDate();
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
        return !this.props.reservedDates.includes(date.format("YYYYMMDD"))
            && (this.state.selectingStart || date.weekday() === 6);
    }

    firstReservedDate(fromDate: Moment): Moment | null {
        // TODO format constant - does one already exist ?
        let sortedDates = this.props.reservedDates;
        sortedDates.sort();
        return sortedDates[0] ? moment(sortedDates[0], "YYYYMMDD") : null;
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
                // TODO maxDate -> firstReservedDate(dateStart) if selectingEnd
                       preventSnapRefocus={true}
                       moveRangeOnFirstSelection={true}
                       months={2}
                       direction="horizontal"
                       weekStartsOn={0}
                       locale={fr}/>
        );
    }
}