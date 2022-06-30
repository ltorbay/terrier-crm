import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Moment} from "moment";
import BookingService, {BookedDatesResponse} from "../../service/BookingService";
import moment, {BACKEND_DATES_FORMAT} from "../../constants/constants";
import {AppDispatch} from "../store";

interface BookedDatesState {
    pear: number[];
    grape: number[];
    queryEnd: number | undefined;
    initializedAt: number | undefined;
}

const INITIAL_STATE: BookedDatesState = {
    pear: [],
    grape: [],
    queryEnd: undefined,
    initializedAt: undefined
}

interface BookedDatesPayload {
    start: Moment,
    end: Moment,
    dispatch: AppDispatch
}

export const fetchReservedDates = createAsyncThunk(
    'BookingService/getReservedDates',
    async (payload: BookedDatesPayload, thunkAPI): Promise<{ queryEnd: number, response: BookedDatesResponse }> => {
        const state = (thunkAPI.getState() as { reservedDates: BookedDatesState }).reservedDates;
        return BookingService.getReservedDates(payload.start, payload.end, payload.dispatch)
            .then(value => {
                const previousPear = state.pear.map(item => moment(item).format(BACKEND_DATES_FORMAT)).filter(item => !value.pearBookings.includes(item));
                const previousGrape = state.grape.map(item => moment(item).format(BACKEND_DATES_FORMAT)).filter(item => !value.grapeBookings.includes(item));
                return {
                    queryEnd: payload.end.valueOf(),
                    response: {
                        pearBookings: value.pearBookings.concat(previousPear || []),
                        grapeBookings: value.grapeBookings.concat(previousGrape || [])
                    }
                }
            });
    }
)

export const reservedDatesSlice = createSlice({
    name: "reservedDates",
    initialState: INITIAL_STATE,
    extraReducers: (builder) => {
        builder.addCase(fetchReservedDates.fulfilled, (state, action: PayloadAction<{ queryEnd: number, response: BookedDatesResponse }>) => {
            state.pear = action.payload.response.pearBookings.map(date => moment(date).valueOf())
            state.grape = action.payload.response.grapeBookings.map(date => moment(date).valueOf())
            state.initializedAt = moment().valueOf();
            state.queryEnd = action.payload.queryEnd;
        })
    },
    reducers: {}
})
