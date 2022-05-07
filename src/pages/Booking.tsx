import {
    Box,
    Card,
    FormControl,
    FormGroup,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    useMediaQuery
} from "@mui/material";
import {BookingSelection} from "../model/BookingSelection";
import BookingDateRange from "../components/booking-date-range/BookingDateRange";
import BookingPayment from "../components/BookingPayment";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {initReservedDates} from "../redux/slice/ReservedDatesSlice";
import NavigationBar from "../components/NavigationBar";
import {Shade} from "../model/Shade";
import {Trans} from "react-i18next";
import {PricesList} from "../components/PricesList";
import {ContentBox} from "../components/containers/ContentBox";
import {CottageSelect, cottageToIcon, cottageToLabel} from "../model/CottageSelect";
import {ImageDecoration} from "../components/ImageDecoration";
import moment from "../index";

export default function Booking() {
    const [state, setState] = useState<BookingSelection>();
    const [cottage, setCottage] = useState<CottageSelect>(CottageSelect.BOTH)
    // TODO centralize media queries string in constants before it gets out of hand
    const tinyScreen = useMediaQuery('(max-width:500px)');

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(initReservedDates())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const pearReservations = useAppSelector((datesState) => datesState.reservedDates.pear);
    const grapesReservations = useAppSelector((datesState) => datesState.reservedDates.grapes);

    return (
        <>
            <header>
                <NavigationBar shade={Shade.Dark}/>
            </header>
            <Box sx={{paddingTop: '8vh'}}/>
            <PricesList/>
            <Card>
                <ImageDecoration icon={cottageToIcon(cottage)} marginTop='50px'/>
                <ContentBox titleKey='pages.booking.book-stay' width={tinyScreen ? '300px' : '500px'}>
                    <FormGroup>
                        <FormControl fullWidth>
                            <Select onChange={action => setCottage(action.target.value as CottageSelect)}
                                    defaultValue={CottageSelect.BOTH}
                                    sx={{backgroundColor: 'white'}}
                                    inputProps={{name: 'cottage', id: 'uncontrolled-native'}}>
                                <MenuItem value={CottageSelect.BOTH}>
                                    <Trans i18nKey={cottageToLabel(CottageSelect.BOTH)}/>
                                </MenuItem>
                                <MenuItem value={CottageSelect.PEAR}>
                                    <Trans i18nKey={cottageToLabel(CottageSelect.PEAR)}/>
                                </MenuItem>
                                <MenuItem value={CottageSelect.GRAPE}>
                                    <Trans i18nKey={cottageToLabel(CottageSelect.GRAPE)}/>
                                </MenuItem>
                            </Select>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                &nbsp;<Trans i18nKey='pages.booking.select-cottage'/>
                            </InputLabel>
                        </FormControl>
                        <Typography display='block' textAlign='justify' variant='body2' marginLeft='1em'>
                            <Trans i18nKey={cottageSizingKey(cottage)}/>
                        </Typography>
                        <Grid>
                            <BookingDateRange cottageSelect={cottage}
                                              pearReservations={pearReservations}
                                              grapesReservations={grapesReservations}
                                              vertical={tinyScreen}
                                              onChange={setState}/>
                        </Grid>
                    </FormGroup>
                    {(state?.periods && state?.weekStarts) ?
                        <BookingPayment periods={state?.periods || []}
                                        weekStarts={state?.weekStarts || []}/> : undefined}
                </ContentBox>
            </Card>
        </>
    )
}

function cottageSizingKey(cottage: CottageSelect): string {
    switch (cottage) {
        case CottageSelect.BOTH:
            return 'pages.booking.full-cottage-count';
        case CottageSelect.PEAR:
            return 'pages.booking.pear-count';
        case CottageSelect.GRAPE:
            return 'pages.booking.grape-count';
    }
}
