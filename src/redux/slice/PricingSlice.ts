import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import moment from "../../index";
import {Moment} from "moment";
import PriceService, {BasePricingConfiguration, PricingConfigurationResponse} from "../../service/PriceService";

export interface PricingConfigurationStateItem extends BasePricingConfiguration {
    start: number;
}

interface PricingState {
    initializedAt?: number,
    configuration?: PricingConfigurationStateItem[]
}

const INITIAL_STATE: PricingState = {}

interface InitPricingPayload {
    start: Moment,
    end: Moment,
}

export const fetchPricingConfiguration = createAsyncThunk(
    'PriceService/getPriceConfiguration',
    async (payload: InitPricingPayload, thunkAPI): Promise<PricingConfigurationResponse[]> => {
        const state = thunkAPI.getState() as PricingState;
        if (state.initializedAt && state.configuration) {
            const configuration: PricingConfigurationResponse[] = state.configuration.map(item => {
                return {
                    periodType: item.periodType,
                    start: moment(item.start),
                    pricing: item.pricing,
                    minConsecutiveDays: item.minConsecutiveDays
                }
            })
            return Promise.resolve(configuration)
        }
        return PriceService.getPriceConfiguration(payload.start, payload.end);
    }
)

export const pricingSlice = createSlice({
    name: "pricing",
    initialState: INITIAL_STATE,
    extraReducers: (builder) => {
        builder.addCase(fetchPricingConfiguration.fulfilled, (state, action: PayloadAction<PricingConfigurationResponse[]>) => {
            state.configuration = action.payload.map(pricingConfiguration => {
                return {
                    periodType: pricingConfiguration.periodType,
                    start: moment(pricingConfiguration.start).valueOf(),
                    minConsecutiveDays: pricingConfiguration.minConsecutiveDays,
                    pricing: pricingConfiguration.pricing
                }
            });
            state.initializedAt = moment().valueOf();
        })
    },
    reducers: {}
})