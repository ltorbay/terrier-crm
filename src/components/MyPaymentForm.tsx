import {CreditCard, PaymentForm} from "react-square-web-payments-sdk";
import {useRef, useState} from "react";
import {PricingDetail} from "../service/BookingService";
import {CottageSelect} from "../model/CottageSelect";
import {Moment} from "moment/moment";
import {Trans, useTranslation} from "react-i18next";
import {FormControl, Grid, TextField} from "@mui/material";
import {uiMessage} from "../redux/slice/SnackbarSlice";
import {useAppDispatch} from "../redux/hooks";
import {useTheme} from "@mui/styles";

interface Props {
    pricingDetail: PricingDetail[],
    totalPrice: number,
    cottageSelect: CottageSelect,
    onValidatedPayment: (user: User, information: Information, paymentToken: TokenResult) => void
}

interface State {
    user?: User,
    information?: Information,
    paymentToken?: TokenResult,
}

interface ValidatedField<T> {
    value: T,
    updated: boolean
}

export interface User {
    firstName?: ValidatedField<string>,
    lastName?: ValidatedField<string>,
    email?: ValidatedField<string>,
    phoneNumber?: string,
    birthDate?: Moment,
}

export interface Information {
    guestsCount?: ValidatedField<number>;
    comment?: string;
}

export interface TokenResult {
    status?: 'Unknown' | 'OK' | 'Error' | 'Invalid' | 'Abort' | 'Cancel';
    token?: string;
}

export function MyPaymentForm(props: Props) {
    const {t} = useTranslation();
    // @ts-ignore
    const palette = useTheme().palette;
    const dispatch = useAppDispatch();
    const fieldColumns = 12;
    const [state, setState] = useState<State>({});
    const [hasSubmit, setSubmit] = useState(false);

    // @ts-ignore
    return (
        <FormControl>
            <Grid container>
                <Grid item xs={fieldColumns} padding='1em'>
                    <TextField required
                               fullWidth
                               id="lastName"
                               onChange={event => setState((prevState: State) => ({
                                   ...prevState,
                                   user: {
                                       ...prevState?.user,
                                       lastName: {
                                           value: event.target.value,
                                           updated: true
                                       }
                                   }
                               }))}
                               error={(hasSubmit || state.user?.lastName?.updated) && !state?.user?.lastName?.value}
                               label={t('components.payment-form.last-name')}/>
                </Grid>
                <Grid item xs={fieldColumns} padding='1em'>
                    <TextField required
                               fullWidth
                               id="firstName"
                               onChange={event => setState((prevState: State) => ({
                                   ...prevState,
                                   user: {
                                       ...prevState?.user,
                                       firstName: {
                                           value: event.target.value,
                                           updated: true
                                       }
                                   }
                               }))}
                               error={(hasSubmit || state.user?.firstName?.updated) && !state?.user?.firstName?.value}
                               label={t('components.payment-form.first-name')}/>
                </Grid>
                <Grid item xs={fieldColumns} padding='1em'>
                    <TextField required
                               fullWidth
                               id="email"
                               onChange={event => setState((prevState: State) => ({
                                   ...prevState,
                                   user: {
                                       ...prevState?.user,
                                       email: {
                                           value: event.target.value,
                                           updated: true
                                       }
                                   }
                               }))}
                               error={(hasSubmit || state.user?.email?.updated) && !state?.user?.email?.value}
                               label={t('components.payment-form.email')}/>
                </Grid>
                <Grid item xs={fieldColumns / 2} padding='1em'>
                    <TextField required
                               fullWidth
                               id="guestsCount"
                               onChange={event => setState((prevState: State) => ({
                                   ...prevState,
                                   information: {
                                       comment: prevState?.information?.comment,
                                       guestsCount: {
                                           value: parseInt(event.target.value, 10),
                                           updated: true
                                       }
                                   }
                               }))}
                               error={(hasSubmit || state.information?.guestsCount?.updated) && !informationValid(state?.information)}
                               type="number"
                               label={t('components.payment-form.guests-count')}/>
                </Grid>
                <Grid item xs={fieldColumns / 2} padding='1em'>
                    <TextField fullWidth
                               id="phone"
                               onChange={event => setState((prevState: State) => ({
                                   ...prevState,
                                   user: {
                                       ...prevState.user,
                                       phoneNumber: event.target.value
                                   }
                               }))}
                               label={t('components.payment-form.phone')}/>
                </Grid>
                <Grid item xs={12} padding='1em'>
                    <PaymentForm applicationId={process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID || 'missing-app-id'}
                                 locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || 'missing-location-id'}
                                 cardTokenizeResponseReceived={(token, _buyer) => {
                                     setSubmit(true);
                                     if (paymentTokenValid(token) && state.user && state.information && formValid(state)) {
                                         props.onValidatedPayment(state.user, state.information, token)
                                     }
                                     dispatch(uiMessage({
                                         messageKey: 'messages.failure.reserved-dates',
                                         severity: 'warning'
                                     }))
                                 }}
                                 createVerificationDetails={() => ({
                                     amount: props.totalPrice.toString(),
                                     billingContact: {
                                         familyName: state.user?.lastName?.value,
                                         givenName: state.user?.firstName?.value,
                                     },
                                     currencyCode: 'EUR',
                                     intent: 'CHARGE',
                                 })}>
                        <CreditCard style={{
                            '.input-container.is-focus': {
                                borderColor: palette.secondary.main,
                                borderWidth: '1px'
                            },
                            '.message-text': {
                                color: palette.primary.dark
                            },
                            '.message-icon': {
                                color: palette.primary.dark
                            }
                        }} buttonProps={{isLoading: !formValid(state)}}
                                    includeInputLabels>
                            <Trans i18nKey='components.payment-form.confirm-and-pay'/>
                        </CreditCard>
                    </PaymentForm>
                </Grid>
            </Grid>
        </FormControl>
    );
}

function formValid(state: State): boolean {
    return userValid(state.user) && informationValid(state.information);
}

function userValid(user: User | undefined): boolean {
    return !!user
        && !!user.firstName
        && !!user.lastName
        && !!user.email;
}

function informationValid(information: Information | undefined): boolean {
    return !!information
        && !!information.guestsCount
        && !!information.guestsCount.value
        && information.guestsCount.value >= 0
        && information.guestsCount.value <= 25;
}

function paymentTokenValid(result: TokenResult | undefined): boolean {
    return !!result
        && !!result.token
        && result.status === 'OK';
}

const useFocus = () => {
    const htmlElRef = useRef<any>(null)
    const setFocus = () => {
        htmlElRef.current && htmlElRef.current.focus()
    }

    return [htmlElRef, setFocus]
}