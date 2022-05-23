import {Moment} from "moment/moment";
import axios from "axios";
import {BACKEND_DATES_FORMAT} from "../constants/constants";
import {PricingModel} from "../model/PricingModel";
import {PricingPeriodType} from "../model/PricingPeriodType";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export interface BasePricingConfiguration {
    periodType: PricingPeriodType,
    minConsecutiveDays: number;
    pricing: PricingModel
}

export interface PricingConfigurationResponse extends BasePricingConfiguration {
    start: string;
}

const PriceService = {
    getPriceConfiguration: async function (start: Moment, end: Moment): Promise<PricingConfigurationResponse[]> {
        const resp = await axios({
            method: 'get',
            baseURL: SERVER_URL,
            url: '/pricing',
            responseType: 'json',
            params: {
                start: start.format(BACKEND_DATES_FORMAT),
                end: end.format(BACKEND_DATES_FORMAT)
            }
        }).catch(error => {
            // TODO print messages for user
        });
        return resp?.data;
    }
}
export default PriceService;