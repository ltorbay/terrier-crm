import {Divider, List, ListItem, ListItemText, Typography} from "@mui/material";
import {TFunction, useTranslation} from "react-i18next";
import * as React from "react";
import {BookingPricingCalculation, PricingDetail} from "../service/BookingService";
import {PricingPeriodType} from "../model/PricingPeriodType";
import {CottageSelect, cottageToPrice} from "../model/CottageSelect";
import moment from "../constants/constants";

interface BookingDetail {
    weeksCount: number;
    daysCount: number;
    pricePerWeek: number;
    pricePerDay: number;
    seasonType: PricingPeriodType;
}

interface Props {
    pricingCalculation: BookingPricingCalculation,
    totalPrice: number,
    cottageSelect: CottageSelect,
    loading: boolean,
    downPayment: boolean
}

export default function BookingPricing(props: Props) {
    const {t} = useTranslation();
    const split = splitBySeason(props.pricingCalculation.detail, props.cottageSelect);
    return (
        <List dense={true} sx={{opacity: props.loading ? 0.25 : 1}}>
            {split.map(detail => priceLine(t, detail))}
            {!props.pricingCalculation.cleaningFeeCents ? undefined : <ListItem key='cleaningFee'>
                <ListItemText primary={t('components.booking-payment.cleaning-fee')}/>
                <Typography gutterBottom variant="h6" component="div">
                    {props.pricingCalculation.cleaningFeeCents / 100}&nbsp;€
                </Typography>
            </ListItem>}
            <Divider/>
            <ListItem key='total'>
                <ListItemText primary="Total"/>
                <Typography gutterBottom variant="h5" component="div">
                    {props.totalPrice}&nbsp;€
                </Typography>
            </ListItem>
            {
                props.downPayment ? (
                        <ListItem key='downPayment'>
                            <ListItemText primary={t('components.booking-payment.down-payment')}/>
                            <Typography gutterBottom variant="h5" component="div">
                                {props.pricingCalculation.downPaymentTotalCents / 100}&nbsp;€
                            </Typography>
                        </ListItem>
                    )
                    : undefined
            }
        </List>
    )
}

function priceLine(t: TFunction<"translation">, detail: BookingDetail): React.ReactNode | undefined {
    if (detail.daysCount === 0 && detail.weeksCount === 0) return undefined
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
