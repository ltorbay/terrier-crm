import {PEAK_SEASON_END_JSON, PEAK_SEASON_START_JSON} from "../constants/constants";

export function isPeakSeason(date: number, month: number) {
    // This simplification only works if peak season does not contain year change, which I hope it never will...
    let afterStart = month > PEAK_SEASON_START_JSON.month
        || (month === PEAK_SEASON_START_JSON.month && date >= PEAK_SEASON_START_JSON.day);
    let beforeEnd = month < PEAK_SEASON_END_JSON.month
        || (month === PEAK_SEASON_END_JSON.month && date <= PEAK_SEASON_END_JSON.day);
    return afterStart && beforeEnd;
}