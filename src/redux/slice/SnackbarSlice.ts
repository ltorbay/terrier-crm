import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface SnackbarState {
    messages: SnackbarMessage[]
}

export interface SnackbarMessage {
    severity: undefined | 'error' | 'warning' | 'info' | 'success',
    messageKey: string
}

const INITIAL_STATE: SnackbarState = {
    messages: []
}

export const snackbarSlice = createSlice({
    name: "snackbar",
    initialState: INITIAL_STATE,
    reducers: {
        uiMessage: (state, action: PayloadAction<SnackbarMessage>) => {
            if (action.payload.messageKey) {
                state.messages.push(action.payload);
            }
            return state;
        },
        consumeFirst: (state) => {
            if (state.messages.length) {
                state.messages.shift()
            }
        }
    }
})

export const {uiMessage, consumeFirst} = snackbarSlice.actions