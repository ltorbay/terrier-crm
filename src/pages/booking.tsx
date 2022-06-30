import dynamic from "next/dynamic";
import {Props} from "../components/BookingDateRange";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {CottageSelect, cottageToIcon, cottageToLabel, cottageToString} from "../model/CottageSelect";
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
import moment, {BACKEND_DATES_FORMAT, MEDIA_QUERY_550_BREAKPOINT} from "../constants/constants";
import {useAppDispatch} from "../redux/hooks";
import {fetchReservedDates} from "../redux/slice/ReservedDatesSlice";
import BookingService, {PricingDetail} from "../service/BookingService";
import NavigationBar from "../components/NavigationBar";
import {Shade} from "../model/Shade";
import {PricesList} from "../components/PricesList";
import {ImageDecoration} from "../components/ImageDecoration";
import {ContentBox} from "../components/containers/ContentBox";
import {Trans} from "react-i18next";
import BookingPricing from "../components/BookingPricing";
import {Information, MyPaymentForm, TokenResult, User} from "../components/MyPaymentForm";
import Button from "@mui/material/Button";
import {useTheme} from "@mui/styles";
import {DateRange as MomentRange} from "moment-range";
import {uiMessage} from "../redux/slice/SnackbarSlice";
import {fetchPricingConfiguration} from "../redux/slice/PricingSlice";

const BookingDateRange = dynamic<Props>(
    () => import("../components/BookingDateRange"),
    {ssr: false}
);

// noinspection JSUnusedGlobalSymbols
export default function Booking() {
    // @ts-ignore
    const palette = useTheme().palette;
    const [loading, setLoading] = useState<boolean>(false);
    const [cottage, setCottage] = useState<CottageSelect>(CottageSelect.BOTH);
    const [pricingDetail, setPricingDetail] = useState<PricingDetail[]>([]);
    const [enabledPaymentForm, enablePaymentForm] = useState(false);
    const [selectedRange, selectRange] = useState<MomentRange>();
    const tinyScreen = useMediaQuery(MEDIA_QUERY_550_BREAKPOINT);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchReservedDates({start: moment(), end: moment().add(3, 'year'), dispatch: dispatch}))
        dispatch(fetchPricingConfiguration({start: moment(), end: moment().add(3, 'year'), dispatch: dispatch}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const totalPriceCents = pricingDetail.map(detail => detail.totalCents).reduce((v1, v2) => v1 + v2, 0);
    const totalPrice = totalPriceCents / 100;

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
                                              vertical={tinyScreen}
                                              onChange={newSelection => {
                                                  setLoading(true);

                                                  BookingService.simulateBooking(cottage, newSelection.start, newSelection.end, dispatch).then(r => {
                                                      selectRange(newSelection);
                                                      setPricingDetail(r);
                                                      setLoading(false);
                                                  })
                                              }}/>
                        </Grid>
                    </FormGroup>
                    {pricingDetail && pricingDetail.length ?
                        <>
                            <BookingPricing
                                loading={loading}
                                cottageSelect={cottage}
                                pricingDetail={pricingDetail}
                                totalPrice={totalPrice}/>
                            {bookingButton(enabledPaymentForm, enablePaymentForm, palette)}
                        </> : undefined
                    }
                    {enabledPaymentForm ?
                        <MyPaymentForm cottageSelect={cottage}
                                       pricingDetail={pricingDetail}
                                       totalPrice={totalPrice}
                                       onValidatedPayment={(user: User, information: Information, paymentToken: TokenResult) => {
                                           setLoading(true);
                                           BookingService.book({
                                               type: cottageToString(cottage),
                                               information: {
                                                   guestsCount: information.guestsCount?.value || 1,
                                                   comment: information.comment,
                                                   paymentSourceId: paymentToken.token || '',
                                                   paymentAmountCents: totalPriceCents
                                               },
                                               user: {
                                                   firstName: user.firstName?.value || '',
                                                   lastName: user.lastName?.value || '',
                                                   birthDate: user.birthDate?.format(BACKEND_DATES_FORMAT),
                                                   email: user.email?.value || '',
                                                   phoneNumber: user.phoneNumber
                                               },
                                               period: {
                                                   start: selectedRange?.start.format(BACKEND_DATES_FORMAT) || '',
                                                   end: selectedRange?.end.format(BACKEND_DATES_FORMAT) || ''
                                               }
                                           }, dispatch).then(_r => {
                                               dispatch(fetchReservedDates({
                                                   start: moment(),
                                                   end: moment().add(3, 'year'),
                                                   dispatch: dispatch
                                               }))
                                               selectRange(undefined);
                                               dispatch(uiMessage({
                                                   messageKey: 'messages.success.book',
                                                   severity: 'success'
                                               }));
                                               enablePaymentForm(false)
                                               setLoading(false);
                                           }).catch(_error => {
                                               setLoading(false);
                                           })
                                       }}/> : undefined
                    }
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

function bookingButton(enabledPaymentForm: boolean, enablePaymentForm: Dispatch<SetStateAction<boolean>>, palette: any): React.ReactNode | undefined {
    if (enabledPaymentForm) return undefined;
    return (
        <Button variant='contained'
                disableElevation
                sx={{
                    width: '100%',
                    marginX: 0,
                    marginY: '1em',
                    paddingY: '12px',
                    backgroundColor: palette.primary.contrastText,
                    color: palette.primary.light,
                    ":hover": {
                        backgroundColor: palette.primary.contrastText
                    }
                }}
                onClick={_event => enablePaymentForm(true)}>
            <Trans i18nKey='pages.booking.book-button'/>
        </Button>
    )
}