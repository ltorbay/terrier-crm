import {Moment} from "moment/moment";
import axios from "axios";
import {BACKEND_DATES_FORMAT} from "../constants/constants";
import {PricingModel} from "../model/PricingModel";
import {PricingPeriodType} from "../model/PricingPeriodType";
import {uiMessage} from "../redux/slice/SnackbarSlice";
import {AppDispatch} from "../redux/store";

export interface BasePricingConfiguration {
    periodType: PricingPeriodType,
    minConsecutiveDays: number;
    pricing: PricingModel
}

export interface PricingConfigurationResponse extends BasePricingConfiguration {
    start: string;
}

const PriceService = {
    getPriceConfiguration: async function (start: Moment, end: Moment, dispatch: AppDispatch): Promise<PricingConfigurationResponse[]> {
        const resp = await axios({
            method: 'get',
            baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
            url: '/pricing',
            responseType: 'json',
            params: {
                start: start.format(BACKEND_DATES_FORMAT),
                end: end.format(BACKEND_DATES_FORMAT)
            }
        }).catch(error => {
            console.log(error)
            dispatch(uiMessage({messageKey: 'messages.failure.price-configuration', severity: 'error'}))
        });
        return resp?.data;
    }
}
export default PriceService;