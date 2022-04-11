import moment from "moment";

// TODO all this should come from the backend and be available through redux
export const PEAK_SEASON_START_STR = "0601";
export const PEAK_SEASON_END_STR = "0930";
export const PEAK_SEASON_START = moment(PEAK_SEASON_START_STR, "MMDD");
export const PEAK_SEASON_END = moment(PEAK_SEASON_END_STR, "MMDD");
export const PEAK_SEASON_START_JSON = {month: PEAK_SEASON_START.month(), day: PEAK_SEASON_START.date()};
export const PEAK_SEASON_END_JSON = {month: PEAK_SEASON_END.month(), day: PEAK_SEASON_END.date()};
export const MIN_CONSECUTIVE_DAYS_PEAK_SEASON=7;
export const MIN_CONSECUTIVE_DAYS_OFF_SEASON=3;
export const START_OF_RESERVATION_WEEK=6;

export const PRICES = {
    peakSeason: {
        pricePerWeek: 4000
    },
    offSeason: {
        pricePerWeek: 2000,
        pricePerDay: 320
    }
}