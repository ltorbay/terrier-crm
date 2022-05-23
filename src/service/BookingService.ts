import {Moment} from "moment/moment";
import axios from "axios";
import {BACKEND_DATES_FORMAT} from "../constants/constants";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export interface BookedDatesResponse {
    pearBookings: Moment[];
    grapesBookings: Moment[];
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
    }
}
export default BookingService;