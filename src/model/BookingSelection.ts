import {Moment} from "moment";
import {DateRange as MomentRange} from "moment-range";
import moment from "../index";

export class BookingSelection {
    weekStarts: Moment[];
    periods: MomentRange[];

    constructor(period: MomentRange) {
        // TODO split into weekends remaining periods ? or do that in the backend ? or avoid having distinct price for weekends ?
        const nightsPeriod = moment.range(period.start, period.end.clone().subtract(1, "day"));
        if(nightsPeriod.duration("days") < 6) {
            this.periods = [nightsPeriod];
            this.weekStarts = [];
            return;
        }
        
        let periods: MomentRange[] = [];
        let periodFirstWeekStart = nightsPeriod.start
            .clone()
            .add(6, "days")
            .startOf("week");
        let periodLastWeekEnd = nightsPeriod.end
            .clone()
            .endOf("week");

        if (!nightsPeriod.start.isSame(periodFirstWeekStart, "day")) {
            // First week starts after the start of the period -> Add the last days of the week
            periods.push(moment.range(nightsPeriod.start, periodFirstWeekStart.clone().subtract(1, "day")));
        }
        if (!nightsPeriod.end.isSame(periodLastWeekEnd, "day")) {
            // Last week ends before the end of the period -> Add the first days of the week
            periods.push(moment.range(nightsPeriod.end.clone().startOf("week"), nightsPeriod.end));
        }

        // Produce array of starting days of the included weeks
        let weeksOnlyPeriod = moment.range(periodFirstWeekStart, nightsPeriod.end.clone().subtract(6, "days").endOf("week"));

        this.weekStarts = Array.from<Moment>(weeksOnlyPeriod.by("days", {excludeEnd: false, step: 7}))
            .filter(w => !periods.some(p => p.contains(w)));

        if (periods.length === 2 && this.weekStarts.length === 0) {
            periods = [moment.range(periods[0].start, periods[1].end)];
        }

        this.periods = periods;
    }
}
