import {Grid} from "@mui/material";
import React, {useEffect, useState} from "react";
import {ContentBox} from "./containers/ContentBox";
import {PricingConfigurationStateItem} from "../redux/slice/PricingSlice";
import {useAppSelector} from "../redux/hooks";
import moment from "../constants/constants";
import {Moment} from "moment/moment";
import {PriceLine} from "./PriceLine";
import {PricingPeriodType} from "../model/PricingPeriodType";

type LabelKeys = 'common.holidays' | 'common.off-season' | 'common.peak-season' | '';

export function PricesList() {
    const pricing = useAppSelector((state) => state.pricing);

    const [priceMap, setPriceMap] = useState<Map<LabelKeys, Map<string, { start: Moment, end: Moment }[]>>>();
    useEffect(() => {
        if (pricing.configuration) {
            setPriceMap(buildPriceMap(pricing.configuration));
        }
    }, [pricing.configuration])

    return (
        <ContentBox titleKey={"components.prices-list.title"} width='100%'>
            <Grid container width='100%'>
                {priceMap ? Array.from(priceMap.keys()).map((key, index) => (
                        <Grid item key={index} marginLeft='4vw'>
                            {iterateSubMap(priceMap, key, index)}
                        </Grid>))
                    : undefined}
            </Grid>
        </ContentBox>
    );
}

function iterateSubMap(priceMap: Map<LabelKeys, Map<string, { start: Moment, end: Moment }[]>>, key: LabelKeys, index: number): React.ReactNode {
    const keys = priceMap?.get(key)?.keys();
    return keys ? Array.from(keys).map((subKey, subIndex) =>
        <PriceLine key={'' + index + subIndex}
                   labelKey={key}
                   jsonData={subKey}
                   hasPrevious={subIndex > 0}
                   periods={priceMap?.get(key)?.get(subKey) || []}/>
    ) : undefined;
}

function labelKey(periodType: PricingPeriodType): LabelKeys {
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

function buildPriceMap(pricingConfiguration: PricingConfigurationStateItem[]): Map<LabelKeys, Map<string, { start: Moment, end: Moment }[]>> {
    const today = moment().startOf('day');
    const map = new Map<LabelKeys, Map<string, { start: Moment, end: Moment }[]>>();
    pricingConfiguration?.map((value, index, array) => {
        const startMoment = moment(value.start);
        return {
            labelKey: labelKey(value.periodType),
            start: startMoment.isBefore(today) ? today : startMoment,
            end: array[index + 1] ? moment(array[index + 1].start) : undefined,
            minConsecutiveDays: value.minConsecutiveDays,
            pricing: value.pricing
        }
    }).forEach(item => {
        if (!map.has(item.labelKey)) {
            map.set(item.labelKey, new Map<string, { start: Moment, end: Moment }[]>());
        }
        const child = map.get(item.labelKey);
        if (child === undefined) return; // To make the linter happy

        const key = JSON.stringify({days: item.minConsecutiveDays, pricing: item.pricing})
        const value = {start: item.start, end: item.end};
        if (!child.has(key)) {
            child.set(key, [value]);
        } else {
            child.get(key)?.push(value);
        }
        return map;
    }, new Map<string, { start: Moment, end: Moment }[]>());
    return map;
}