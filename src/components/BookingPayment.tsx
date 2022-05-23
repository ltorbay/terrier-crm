import {Divider, List, ListItem, ListItemText, Typography} from "@mui/material";
import {TFunction, useTranslation} from "react-i18next";
import * as React from "react";
import {PricingDetail} from "../service/BookingService";
import {PricingPeriodType} from "../model/PricingPeriodType";
import moment from "../index";
import {CottageSelect, cottageToPrice} from "../model/CottageSelect";

interface BookingDetail {
    weeksCount: number;
    daysCount: number;
    pricePerWeek: number;
    pricePerDay: number;
    seasonType: PricingPeriodType;
}

interface Props {
    pricingDetail: PricingDetail[],
    cottageSelect: CottageSelect
}

export default function BookingPayment(props: Props) {
    const {t} = useTranslation();
    const split = splitBySeason(props.pricingDetail, props.cottageSelect);
    const total = props.pricingDetail.map(detail => detail.totalCents).reduce((v1, v2) => v1 + v2, 0) / 100;
    return (
        <List dense={true}>
            {split.map(detail => priceLine(t, detail))}
            <Divider/>
            <ListItem>
                <ListItemText primary="Total"/>
                <Typography gutterBottom variant="h5" component="div">
                    {total}&nbsp;€
                </Typography>
            </ListItem>
        </List>
    )
}

function priceLine(t: TFunction<"translation">, detail: BookingDetail): React.ReactNode | undefined {
    if (detail.daysCount === 0 && detail.weeksCount === 0) return undefined
    // TODO missing holidays ('OFF_SEASON' | 'PEAK_SEASON' | 'HOLIDAYS')

    const seasonLabel = t(seasonKey(detail.seasonType));
    return (
        <ListItem key={detail.seasonType}>
            <List dense={true} sx={{width: '100%'}}>
                {listItem(t, seasonLabel, 'components.booking-payment.per-week', detail.weeksCount, detail.pricePerWeek || detail.pricePerDay * 7)}
                {listItem(t, seasonLabel, 'components.booking-payment.per-day', detail.daysCount, detail.pricePerDay || 100 * Math.floor(detail.pricePerWeek / 700))}
            </List>
        </ListItem>
    );
}

function listItem(t: TFunction<"translation">, seasonLabel: string, paymentTypeKey: string, count: number, pricePerDay: number): React.ReactNode | undefined {
    if (count === 0 || pricePerDay === 0) return undefined;
    return (
        <ListItem key={paymentTypeKey} disablePadding>
            <ListItemText primary={t(paymentTypeKey, {count: count})}
                          secondary={seasonLabel}/>
            <Typography gutterBottom variant="h6" component="div">
                {(count * pricePerDay) / 100}&nbsp;€
            </Typography>
        </ListItem>
    )
}

function seasonKey(seasonType: PricingPeriodType): string {
    switch (seasonType) {
        case "OFF_SEASON":
            return 'common.off-season'
        case "PEAK_SEASON":
            return 'common.peak-season'
        case "HOLIDAYS":
            return 'common.holidays'
    }
}

function splitBySeason(pricingDetail: PricingDetail[], select: CottageSelect): BookingDetail[] {
    return pricingDetail.map(detail => {
        const nights = moment.range(detail.bookingPeriod.start, detail.bookingPeriod.end).duration('days', false);
        const line = cottageToPrice(select, detail.periodConfiguration.pricing);
        return {
            weeksCount: Math.floor(nights / 7),
            daysCount: nights % 7,
            pricePerWeek: line.weekly,
            pricePerDay: line.nightly,
            seasonType: detail.periodConfiguration.periodType
        }
    });
}
