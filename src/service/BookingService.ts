import {Moment} from "moment/moment";
import axios from "axios";
import {BACKEND_DATES_FORMAT} from "../constants/constants";
import {CottageSelect, cottageToString} from "../model/CottageSelect";
import {PricingModel} from "../model/PricingModel";
import {PricingPeriodType} from "../model/PricingPeriodType";
import {uiMessage} from "../redux/slice/SnackbarSlice";
import {AppDispatch} from "../redux/store";

export interface BookedDatesResponse {
    pearBookings: string[];
    grapeBookings: string[];
}

export interface BookingPricingCalculation {
    detail: PricingDetail[];
    cleaningFeeCents: number;
    totalCents: number;
    downPaymentTotalCents: number;
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

export interface BookingRequest {
    type: 'BOTH' | 'PEAR' | 'GRAPE',
    period: {
        start: string,
        end: string
    },
    user: {
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber: string | undefined,
        birthDate: string | undefined
    },
    information: {
        guestsCount: number,
        paymentSourceId: string,
        cleaningFeeCents: number,
        paymentAmountCents: number,
        downPayment: boolean,
        comment: string | undefined,
    }
}

const BookingService = {
    getReservedDates: async function (start: Moment, end: Moment, dispatch: AppDispatch): Promise<BookedDatesResponse> {
        const resp = await axios({
            method: 'get',
            baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
            url: '/bookings',
            responseType: 'json',
            params: {
                start: start.format(BACKEND_DATES_FORMAT),
                end: end.format(BACKEND_DATES_FORMAT)
            }
        }).catch(error => {
            console.log(error)
            // TODO send error log to backend error endpoint ?
            dispatch(uiMessage({messageKey: 'messages.failure.reserved-dates', severity: 'error'}))
        });
        return resp?.data;
    },
    simulateBooking: async function (type: CottageSelect, start: Moment, end: Moment, dispatch: AppDispatch): Promise<BookingPricingCalculation> {
        const resp = await axios({
            method: 'get',
            baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
            url: '/bookings/simulations',
            responseType: 'json',
            params: {
                type: cottageToString(type),
                start: start.format(BACKEND_DATES_FORMAT),
                end: end.format(BACKEND_DATES_FORMAT)
            }
        }).catch(error => {
            console.log(error)
            dispatch(uiMessage({messageKey: 'messages.failure.simulate-booking', severity: 'error'}))
        });
        return resp?.data;
    },
    book: async function (request: BookingRequest, dispatch: AppDispatch): Promise<PricingDetail[]> {
        const resp = await axios({
            method: 'post',
            baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
            url: '/bookings',
            responseType: 'json',
            data: request,
            withCredentials: false,
        }).catch(error => {
            console.log(error)
            dispatch(uiMessage({messageKey: 'messages.failure.book', severity: 'error'}))
            throw error;
        });
        return resp?.data;
    },
}
export default BookingService;