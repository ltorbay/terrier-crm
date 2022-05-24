import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Moment} from "moment";
import PriceService, {BasePricingConfiguration, PricingConfigurationResponse} from "../../service/PriceService";
import moment, {BACKEND_DATES_FORMAT} from "../../constants/constants";

export interface PricingConfigurationStateItem extends BasePricingConfiguration {
    start: number;
}

interface PricingState {
    initializedAt?: number,
    queriedStart?: number,
    queriedEnd?: number,
    configuration?: PricingConfigurationStateItem[]
}

const INITIAL_STATE: PricingState = {}

interface InitPricingPayload {
    start: Moment,
    end: Moment,
}

export const fetchPricingConfiguration = createAsyncThunk(
    'PriceService/getPriceConfiguration',
    async (payload: InitPricingPayload, thunkAPI): Promise<{ query: { start: number, end: number }, response: PricingConfigurationResponse[] }> => {
        const state = (thunkAPI.getState() as { pricing: PricingState }).pricing;
        const endMoment = moment(state.queriedEnd);
        if (state.initializedAt && state.configuration && endMoment.isAfter(payload.start)) {
            const configuration: PricingConfigurationResponse[] = state.configuration.map(stateItemToResponse)
            return Promise.resolve({
                query: {start: moment(state.queriedStart).valueOf(), end: endMoment.valueOf()},
                response: configuration
            })
        }
        return PriceService.getPriceConfiguration(payload.start, payload.end)
            .then(value => {
                const responseStartTimestamp = value.map(configResponse => moment(configResponse.start).valueOf());
                const previousResponse = state.configuration?.filter(item => !responseStartTimestamp.includes(item.start)).map(stateItemToResponse);
                return {
                    query: {start: payload.start.valueOf(), end: payload.end.valueOf()},
                    response: value.concat(previousResponse || [])
                        .sort((a, b) => moment(a.start).diff(moment(b.start)))
                }
            });
    }
)

function stateItemToResponse(item: PricingConfigurationStateItem): PricingConfigurationResponse {
    return {
        periodType: item.periodType,
        start: moment(item.start).format(BACKEND_DATES_FORMAT),
        pricing: item.pricing,
        minConsecutiveDays: item.minConsecutiveDays
    }
}

export const pricingSlice = createSlice({
    name: "pricing",
    initialState: INITIAL_STATE,
    extraReducers: (builder) => {
        builder.addCase(fetchPricingConfiguration.fulfilled, (state, action: PayloadAction<{ query: { start: number, end: number }, response: PricingConfigurationResponse[] }>) => {
            state.configuration = action.payload.response.map(pricingConfiguration => {
                return {
                    periodType: pricingConfiguration.periodType,
                    start: moment(pricingConfiguration.start).valueOf(),
                    minConsecutiveDays: pricingConfiguration.minConsecutiveDays,
                    pricing: pricingConfiguration.pricing
                }
            });
            state.queriedStart = state.queriedStart || action.payload.query.start;
            state.queriedEnd = action.payload.query.end;
            state.initializedAt = moment().valueOf();
        })
    },
    reducers: {}
})