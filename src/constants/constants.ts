import {LatLng} from "leaflet";

export const START_OF_RESERVATION_WEEK = 6;
export const BACKEND_DATES_FORMAT = "YYYY-MM-DD";

export const PRICES = {
    peakSeason: {
        pricePerWeek: 4000
    },
    offSeason: {
        pricePerWeek: 2000,
        pricePerDay: 320
    }
}

export const POSITION = new LatLng(45.139756772239814, 0.9903618727530135, 11);
export const ADDRESS = "86 A La Placette, 24210 Fossemagne";