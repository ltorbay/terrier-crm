import {List, ListItem, ListItemText, Typography} from "@mui/material";
import React, {useEffect, useRef} from "react";
import {TFunction, Trans, useTranslation} from "react-i18next";
import {Moment} from "moment";
import {PricingLine} from "../model/PricingModel";

class Props {
    jsonData: string;
    hasNext: boolean;
    periods: { start: Moment, end: Moment }[];

    constructor(jsonData: string, hasNext: boolean, periods: { start: Moment; end: Moment }[]) {
        this.jsonData = jsonData;
        this.hasNext = hasNext;
        this.periods = periods;
    }
}

export function PriceLine(props: Props) {
    const {t} = useTranslation();
    const dataRef = useRef(JSON.parse(props.jsonData));

    useEffect(() => {
        dataRef.current = JSON.parse(props.jsonData);
    }, [props.jsonData])

    const data = dataRef.current;
    const nights = data.days - 1;
    return (
        <>
            <ListItemText primary={t(data.labelKey)}
                          secondary={props.periods.map(display => display.start.format('DD/MM/YYYY') + (display.end ? (' - ' + display.end.format('DD/MM/YYYY')) : ' ...')
                          ).reduce((s1, s2) => s1 + '\n' + s2) + '\n' + t("common.minimum-nights", {count: nights})}/>
            <List dense>
                {listItems(t, 'common.places.full-cottage', nights, data.pricing.both)}
                {listItems(t, 'common.places.grape', nights, data.pricing.grape)}
                {listItems(t, 'common.places.pear', nights, data.pricing.pear)}
            </List>
        </>
    )
}

function listItems(t: TFunction<"translation">, titleKey: string, minimumNights: number, line: PricingLine) {
    if (!line.weekly && !line.nightly) return undefined;
    return (
        <ListItem key={titleKey}>
            <List dense>
                <ListItem key='title'>
                    <Typography display='block' textAlign='justify' variant='h6'>
                        <Trans i18nKey={titleKey}/>
                    </Typography>
                </ListItem>
                {listItemText(t, false, minimumNights, line.weekly)}
                {listItemText(t, true, minimumNights, line.nightly)}
            </List>
        </ListItem>
    );
}

function listItemText(t: TFunction<"translation">, perNight: boolean, minimumNights: number, pricingCents: number) {
    if (!pricingCents) return undefined;
    return (
        <ListItem key={perNight ? 'nightly' : 'weekly'}>
            <ListItemText
                primary={perNight ? t("components.prices-list.nightly-rental") : t("components.prices-list.weekly-rental")}
                secondary={perNight ? t("components.prices-list.price-is-per-night", {count: minimumNights}) : t("common.nights", {count: 7})}/>
            <Typography gutterBottom variant="h6" component="div">
                {pricingCents / 100}&nbsp;€
            </Typography>
        </ListItem>
    );
}