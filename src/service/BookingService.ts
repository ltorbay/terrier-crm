import {Moment} from "moment/moment";
import axios from "axios";
import {BACKEND_DATES_FORMAT} from "../constants/constants";
import {CottageSelect, cottageToString} from "../model/CottageSelect";
import {PricingModel} from "../model/PricingModel";
import {PricingPeriodType} from "../model/PricingPeriodType";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export interface BookedDatesResponse {
    pearBookings: string[];
    grapeBookings: string[];
}

export interface PricingDetail {
    periodConfiguration: {
        periodType: PricingPeriodType,
        start: string,
        minConsecutiveDays: number,
        pricing: PricingModel
    },
    bookingPeriod: {
        start: string,
        end: string
    },
    totalCents: number
}

const BookingService = {
    getReservedDates: async function (start: Moment, end: Moment): Promise<BookedDatesResponse> {
        const resp = await axios({
            method: 'get',
            baseURL: SERVER_URL,
            url: '/bookings',
            responseType: 'json',
            params: {
                start: start.format(BACKEND_DATES_FORMAT),
                end: end.format(BACKEND_DATES_FORMAT)
            }
        }).catch(error => {
            // TODO print messages for user
        });
        return resp?.data;
    },
    simulateBooking: async function (type: CottageSelect, start: Moment, end: Moment): Promise<PricingDetail[]> {
        const resp = await axios({
            method: 'get',
            baseURL: SERVER_URL,
            url: '/bookings/simulations',
            responseType: 'json',
            params: {
                type: cottageToString(type),
                start: start.format(BACKEND_DATES_FORMAT),
                end: end.format(BACKEND_DATES_FORMAT)
            }
        }).catch(error => {
            // TODO print messages for user
        });
        return resp?.data;
    }
}
export default BookingService;