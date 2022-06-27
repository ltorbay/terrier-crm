import {configureStore} from '@reduxjs/toolkit'
import {reservedDatesSlice} from "./slice/ReservedDatesSlice";
import {pricingSlice} from "./slice/PricingSlice";
import {snackbarSlice} from "./slice/SnackbarSlice";

export const store = configureStore({
    reducer: {
        reservedDates: reservedDatesSlice.reducer,
        pricing: pricingSlice.reducer,
        snackbar: snackbarSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;