import {List, ListItem, ListItemText, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {TFunction, Trans, useTranslation} from "react-i18next";
import {Moment} from "moment";
import {PricingLine} from "../model/PricingModel";
import {makeStyles, useTheme} from "@mui/styles";

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

const useStyles = (palette: any) => makeStyles(() => ({
    subtitle: {
        color: palette.primary.dark,
        opacity: 0.6
    }
}));

export function PriceLine(props: Props) {
    const {t} = useTranslation();
    // @ts-ignore
    const classes = useStyles(useTheme().palette)();
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
                                              className={classes.subtitle}
                                              key={index}>
                                      {line}<br/>
                                  </Typography>)}</>}/>
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