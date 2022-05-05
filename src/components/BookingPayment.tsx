import {BookingSelection} from "../model/BookingSelection";
import {Card, CardContent, Divider, List, ListItem, ListItemText, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {isPeakSeason} from "../utils/commonDatesCalculations";
import {PRICES} from "../constants/constants";
import * as React from "react";

interface SplitBookings {
    offSeasonDays: number,
    offSeasonWeeks: number,
    peakSeasonWeeks: number
}

export default function BookingPayment(props: BookingSelection) {
    const {t} = useTranslation();
    const split = splitSeasons(props);
    const total = totalPrice(split);
    return (
        <Card>
            <CardContent>
                <List dense={true}>
                    {priceLine(split.peakSeasonWeeks, PRICES.peakSeason.pricePerWeek, true, "components.booking-payment.per-week", t)}
                    {priceLine(split.offSeasonWeeks, PRICES.offSeason.pricePerWeek, false, "components.booking-payment.per-week", t)}
                    {priceLine(split.offSeasonDays, PRICES.offSeason.pricePerDay, false, "components.booking-payment.per-day", t)}
                    <Divider/>
                    <ListItem>
                        <ListItemText primary="Total"/>
                        <Typography gutterBottom variant="h5" component="div">
                            {total} €
                        </Typography>
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    )
}

function totalPrice(booking: SplitBookings): number {
    return booking.offSeasonDays * PRICES.offSeason.pricePerDay
        + booking.offSeasonWeeks * PRICES.offSeason.pricePerWeek
        + booking.peakSeasonWeeks * PRICES.peakSeason.pricePerWeek;
}

function priceLine(count: number, pricePerItem: number, peakSeason: boolean, labelCode: string, t: any): React.ReactNode | undefined {
    if (count === 0) return undefined
    return (
        <ListItem>
            <ListItemText primary={t(labelCode, {count: count})}
                          secondary={peakSeason ? t("common.peak-season") : t("common.off-season")}/>
            <Typography gutterBottom variant="h6" component="div">
                {count * pricePerItem} €
            </Typography>
        </ListItem>
    );
}

function splitSeasons(selection: BookingSelection): SplitBookings {
    let offSeasonPeriodDays = selection.periods.map(period => period.end.diff(period.start, "days", false) + 1)
        .reduce((a, b) => a + b, 0);

    let offSeasonWeeks = 0;
    let peakSeasonWeeks = 0;
    for (const start of selection.weekStarts) {
        if (isPeakSeason(start.date(), start.month())) {
            peakSeasonWeeks += 1;
        } else {
            offSeasonWeeks += 1;
        }
    }
    return {
        offSeasonDays: offSeasonPeriodDays,
        offSeasonWeeks: offSeasonWeeks,
        peakSeasonWeeks: peakSeasonWeeks
    }
}