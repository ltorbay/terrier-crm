import {Grid} from "@mui/material";
import React, {MutableRefObject, useEffect, useRef} from "react";
import {ContentBox} from "./containers/ContentBox";
import {fetchPricingConfiguration, PricingConfigurationStateItem} from "../redux/slice/PricingSlice";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import moment from "../constants/constants";
import {Moment} from "moment/moment";
import {PriceLine} from "./PriceLine";
import {PricingPeriodType} from "../model/PricingPeriodType";

export function PricesList() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchPricingConfiguration({start: moment(), end: moment().endOf('year')}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const pricing = useAppSelector((state) => state.pricing);

    const priceMapRef: MutableRefObject<Map<string, { start: Moment, end: Moment }[]> | undefined> = useRef();
    useEffect(() => {
        if (pricing.configuration) {
            priceMapRef.current = buildPriceMap(pricing.configuration);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pricing.configuration === undefined, pricing.initializedAt])

    const priceMap = priceMapRef.current;
    return (
        <ContentBox titleKey={"components.prices-list.title"} width='100%'>
            <Grid container>
                {priceMap ? Array.from(priceMap.keys()).map((key, index, array) => (
                        <Grid item key={index} marginLeft='4vw'>
                            <PriceLine jsonData={key} hasNext={index < array.length - 1}
                                       periods={priceMap?.get(key) || []}/>
                        </Grid>))
                    : undefined}
            </Grid>
        </ContentBox>
    );
}

function labelKey(periodType: PricingPeriodType): string {
    switch (periodType) {
        case 'HOLIDAYS':
            return 'common.holidays';
        case 'OFF_SEASON':
            return 'common.off-season';
        case 'PEAK_SEASON':
            return 'common.peak-season';
        default:
            return '';
    }
}

function buildPriceMap(pricingConfiguration: PricingConfigurationStateItem[]): Map<string, { start: Moment, end: Moment }[]> {
    const today = moment().startOf('day');
    return pricingConfiguration?.map((value, index, array) => {
        const startMoment = moment(value.start);
        return {
            labelKey: labelKey(value.periodType),
            start: startMoment.isBefore(today) ? today : startMoment,
            end: array[index + 1] ? moment(array[index + 1].start) : undefined,
            minConsecutiveDays: value.minConsecutiveDays,
            pricing: value.pricing
        }
    }).reduce((map, item) => {
        const key = JSON.stringify({labelKey: item.labelKey, days: item.minConsecutiveDays, pricing: item.pricing})
        const value = {start: item.start, end: item.end};
        if (!map.has(key)) {
            map.set(key, [value]);
        } else {
            map.get(key)?.push(value);
        }
        return map;
    }, new Map<string, { start: Moment, end: Moment }[]>());
}