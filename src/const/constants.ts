import moment from "moment";

export const PEAK_SEASON_START_STR = "0601";
export const PEAK_SEASON_END_STR = "0930";
export const PEAK_SEASON_START = moment(PEAK_SEASON_START_STR, "MMDD");
export const PEAK_SEASON_END = moment(PEAK_SEASON_END_STR, "MMDD");
export const PEAK_SEASON_START_JSON = {month: PEAK_SEASON_START.month(), day: PEAK_SEASON_START.date()};
export const PEAK_SEASON_END_JSON = {month: PEAK_SEASON_END.month(), day: PEAK_SEASON_END.date()};