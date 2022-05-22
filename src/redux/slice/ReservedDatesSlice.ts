import {createSlice} from "@reduxjs/toolkit";
import moment from "../../index";

interface ReservedDatesState {
    pear: number[];
    grapes: number[];
    initializedAt: number | undefined
}

const INITIAL_STATE: ReservedDatesState = {
    pear: [],
    grapes: [],
    initializedAt: undefined
}

export const reservedDatesSlice = createSlice({
    name: "reservedDates",
    initialState: INITIAL_STATE,
    reducers: {
        initReservedDates: (state) => {
            if (state.initializedAt) {
                return state
            }
            // TODO call backend and remove mocks
            state.pear = [
                moment({year: 2022, month: 4, day: 7}).valueOf(),
                moment({year: 2022, month: 4, day: 8}).valueOf(),
                moment({year: 2022, month: 4, day: 15}).valueOf(),
                moment({year: 2022, month: 4, day: 19}).valueOf(),
                moment({year: 2022, month: 4, day: 22}).valueOf(),
                moment({year: 2022, month: 4, day: 25}).valueOf(),
                moment({year: 2022, month: 5, day: 12}).valueOf(),
                moment({year: 2022, month: 5, day: 13}).valueOf(),
            ];
            state.grapes = [
                moment({year: 2022, month: 4, day: 7}).valueOf(),
                moment({year: 2022, month: 4, day: 8}).valueOf(),
                moment({year: 2022, month: 4, day: 15}).valueOf(),
                moment({year: 2022, month: 4, day: 18}).valueOf(),
                moment({year: 2022, month: 4, day: 19}).valueOf(),
                moment({year: 2022, month: 4, day: 20}).valueOf(),
                moment({year: 2022, month: 4, day: 30}).valueOf(),
            ]
            state.initializedAt = moment().valueOf();
            return state;
        }
    }
})

export const {initReservedDates} = reservedDatesSlice.actions