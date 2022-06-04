import dynamic from "next/dynamic";
import {Props} from "../components/BookingDateRange";
import React, {useEffect, useRef, useState} from "react";
import {CottageSelect, cottageToIcon, cottageToLabel} from "../model/CottageSelect";
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
import moment, {MEDIA_QUERY_500_BREAKPOINT} from "../constants/constants";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {fetchReservedDates} from "../redux/slice/ReservedDatesSlice";
import BookingService, {PricingDetail} from "../service/BookingService";
import NavigationBar from "../components/NavigationBar";
import {Shade} from "../model/Shade";
import {PricesList} from "../components/PricesList";
import {ImageDecoration} from "../components/ImageDecoration";
import {ContentBox} from "../components/containers/ContentBox";
import {Trans} from "react-i18next";
import BookingPayment from "../components/BookingPayment";

const BookingDateRange = dynamic<Props>(
    () => import("../components/BookingDateRange"),
    {ssr: false}
);

export default function Booking() {
    const [loading, setLoading] = useState<boolean>(false);
    const [cottage, setCottage] = useState<CottageSelect>(CottageSelect.BOTH)
    const tinyScreen = useMediaQuery(MEDIA_QUERY_500_BREAKPOINT);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchReservedDates({start: moment(), end: moment().add(1, 'year')}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const pricingDetailRef = useRef<PricingDetail[]>([]);

    const pearReservations = useAppSelector((s) => s.reservedDates.pear);
    const grapeReservations = useAppSelector((s) => s.reservedDates.grape);

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
                                              grapeReservations={grapeReservations}
                                              vertical={tinyScreen}
                                              onChange={newSelection => {
                                                  setLoading(true);
                                                  BookingService.simulateBooking(cottage, newSelection.start, newSelection.end).then(r => {
                                                      pricingDetailRef.current = r;
                                                      setLoading(false);
                                                  })
                                              }}/>
                        </Grid>
                    </FormGroup>
                    {pricingDetailRef.current ?
                        <BookingPayment
                            loading={loading}
                            cottageSelect={cottage}
                            pricingDetail={pricingDetailRef.current}/> : undefined}
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
