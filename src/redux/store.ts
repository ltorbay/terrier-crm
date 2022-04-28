import { configureStore } from '@reduxjs/toolkit'
import {reservedDatesSlice} from "./slice/reservedDatesSlice";

export const store = configureStore({
    reducer: {
        reservedDates: reservedDatesSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;