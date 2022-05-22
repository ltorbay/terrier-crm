import {configureStore} from '@reduxjs/toolkit'
import {reservedDatesSlice} from "./slice/ReservedDatesSlice";
import {pricingSlice} from "./slice/PricingSlice";

export const store = configureStore({
    reducer: {
        reservedDates: reservedDatesSlice.reducer,
        pricing: pricingSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;