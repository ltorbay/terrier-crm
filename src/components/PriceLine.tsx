import {List, ListItem, ListItemText, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {TFunction, Trans, useTranslation} from "react-i18next";
import {Moment} from "moment";
import {PricingLine} from "../model/PricingModel";

class Props {
    labelKey: string;
    jsonData: string;
    hasPrevious: boolean;
    periods: { start: Moment, end: Moment }[];

    constructor(key: string, jsonData: string, hasPrevious: boolean, periods: { start: Moment; end: Moment }[]) {
        this.labelKey = key;
        this.jsonData = jsonData;
        this.hasPrevious = hasPrevious;
        this.periods = periods;
    }
}

const classes = {
    subtitle: {
        color: 'primary.dark',
        opacity: 0.6
    }
};

export function PriceLine(props: Props) {
    const {t} = useTranslation();
    const [data, setData] = useState(JSON.parse(props.jsonData));

    useEffect(() => {
        setData(JSON.parse(props.jsonData));
    }, [props.jsonData])

    const nights = data.days - 1;
    return (
        <>
            <ListItemText primary={props.hasPrevious ? '' :
                <Typography component='span'
                            variant='h6'>
                    {t(props.labelKey)}
                </Typography>}
                          secondary={<>{props.periods.map(display => display.start.format('DD/MM/YYYY')
                              + ' - '
                              + (display.end ? (display.end.format('DD/MM/YYYY')) : '...'))
                              .map((line, index) =>
                                  <Typography component='span'
                                              variant='body2'
                                              sx={classes.subtitle}
                                              key={index}>
                                      {line}<br/>
                                  </Typography>)}</>}/>
            <List dense>
                {listItems(t, nights, data.pricing.both)}
            </List>
        </>
    )
}

function listItems(t: TFunction<"translation">, minimumNights: number, line: PricingLine) {
    if (!line.weekly && !line.nightly) return undefined;
    return (
        <ListItem>
            <List dense>
                {listItemText(t, false, minimumNights, line.weekly)}
                {listItemText(t, true, minimumNights, line.nightly)}
            </List>
        </ListItem>
    );
}

function listItemText(t: TFunction<"translation">, perNight: boolean, minimumNights: number, pricingCents: number) {
    if (!pricingCents) return undefined;
    return (
        <ListItem key={perNight ? 'nightly' : 'weekly'} sx={{width: '300px'}}>
            <ListItemText
                primary={perNight ? t("components.prices-list.nightly-rental") : t("components.prices-list.weekly-rental")}
                secondary={perNight ? t("components.prices-list.price-is-per-night", {count: minimumNights}) : t("common.nights", {count: 7})}/>
            <Typography gutterBottom variant="h6" component="div">
                {pricingCents / 100}&nbsp;€
            </Typography>
        </ListItem>
    );
}