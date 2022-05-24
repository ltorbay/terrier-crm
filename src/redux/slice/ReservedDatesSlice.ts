import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import moment from "../../index";
import {Moment} from "moment";
import BookingService, {BookedDatesResponse} from "../../service/BookingService";

interface BookedDatesState {
    pear: number[];
    grape: number[];
    initializedAt: number | undefined
}

const INITIAL_STATE: BookedDatesState = {
    pear: [],
    grape: [],
    initializedAt: undefined
}

interface BookedDatesPayload {
    start: Moment,
    end: Moment,
}

export const fetchReservedDates = createAsyncThunk(
    'BookingService/getReservedDates',
    async (payload: BookedDatesPayload, thunkAPI): Promise<BookedDatesResponse> => {
        const state = (thunkAPI.getState() as { reservedDates: BookedDatesState }).reservedDates;
        if (state.initializedAt) {
            const reservedDates: BookedDatesResponse = {
                pearBookings: state.pear.map(item => moment(item)),
                grapeBookings: state.grape.map(item => moment(item))
            }
            return Promise.resolve(reservedDates)
        }
        // TODO pagination !! (same as in PricingSlice !)
        return BookingService.getReservedDates(payload.start, payload.end);
    }
)

export const reservedDatesSlice = createSlice({
    name: "reservedDates",
    initialState: INITIAL_STATE,
    extraReducers: (builder) => {
        builder.addCase(fetchReservedDates.fulfilled, (state, action: PayloadAction<BookedDatesResponse>) => {
            state.pear = action.payload.pearBookings.map(date => moment(date).valueOf())
            state.grape = action.payload.grapeBookings.map(date => moment(date).valueOf())
            state.initializedAt = moment().valueOf();
        })
    },
    reducers: {}
})
