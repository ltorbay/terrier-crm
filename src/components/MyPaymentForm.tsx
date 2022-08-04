import {CreditCard, PaymentForm} from "react-square-web-payments-sdk";
import React, {useEffect, useState} from "react";
import {PricingDetail} from "../service/BookingService";
import {CottageSelect} from "../model/CottageSelect";
import {Moment} from "moment/moment";
import {Trans, useTranslation} from "react-i18next";
import Link from "next/link";
import {Checkbox, FormControl, FormControlLabel, Grid, TextField, Tooltip} from "@mui/material";
import {uiMessage} from "../redux/slice/SnackbarSlice";
import {useAppDispatch} from "../redux/hooks";
import {useTheme} from "@mui/styles";
import moment from "../constants/constants";

interface Props {
    pricingDetail: PricingDetail[],
    downPayment: number,
    totalPrice: number,
    cottageSelect: CottageSelect,
    onValidatedPayment: (user: User, information: Information, paymentToken: TokenResult) => void,
    onDownPaymentChange: (value: boolean) => void,
    selectedStart: Moment | undefined
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
    downPayment?: ValidatedField<boolean>;
    termsAndConditions?: ValidatedField<boolean>;
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
    const [state, setState] = useState<State>({information: {downPayment: {updated: false, value: false}}});
    const [hasSubmit, setSubmit] = useState(false);
    const minDelayDays = process.env.NEXT_PUBLIC_DUE_DATE_MIN_DELAY_DAYS ? parseInt(process.env.NEXT_PUBLIC_DUE_DATE_MIN_DELAY_DAYS, 10) : 30;
    const downPaymentEnabled = moment().startOf('day').isBefore(props.selectedStart?.clone().subtract(minDelayDays, 'days'), 'days');
    useEffect(() => {
        if (!downPaymentEnabled && !!state.information?.downPayment) {
            setState((prevState: State) => ({
                ...prevState,
                information: {
                    comment: prevState?.information?.comment,
                    guestsCount: prevState?.information?.guestsCount,
                    termsAndConditions: prevState?.information?.termsAndConditions,
                    downPayment: {
                        value: false,
                        updated: true
                    }
                }
            }))
            props.onDownPaymentChange(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [downPaymentEnabled, state.information?.downPayment?.value]);

    const downPaymentCheckbox = (
        <FormControlLabel
            label={t('components.payment-form.down-payment')}
            control={
                <Checkbox required
                          disabled={!downPaymentEnabled}
                          id="downPayment"
                          checked={!!state.information?.downPayment?.value}
                          onChange={event => {
                              const newValue = event.target.checked;
                              setState((prevState: State) => ({
                                  ...prevState,
                                  information: {
                                      comment: prevState?.information?.comment,
                                      guestsCount: prevState?.information?.guestsCount,
                                      termsAndConditions: prevState?.information?.termsAndConditions,
                                      downPayment: {
                                          value: downPaymentEnabled && newValue,
                                          updated: true
                                      }
                                  }
                              }))
                              props.onDownPaymentChange(newValue);
                          }}/>
            }
        />
    );

    // @ts-ignore
    return (
        <FormControl>
            <Grid container>
                <Grid item xs={fieldColumns} paddingY='1em' paddingRight='0.5em'>
                    {downPaymentEnabled ? downPaymentCheckbox : (
                        <Tooltip placement='right'
                                 title={t('components.payment-form.down-payment-disabled-tooltip', {count: minDelayDays})}>
                            {downPaymentCheckbox}
                        </Tooltip>
                    )}
                </Grid>
                <Grid item xs={fieldColumns} paddingY='1em'>
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
                <Grid item xs={fieldColumns} paddingY='1em'>
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
                <Grid item xs={fieldColumns} paddingY='1em'>
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
                               error={(hasSubmit || state.user?.email?.updated) && !emailValid(state.user?.email)}
                               label={t('components.payment-form.email')}/>
                </Grid>
                <Grid item xs={fieldColumns / 2} paddingY='1em' paddingRight='0.5em'>
                    <TextField required
                               fullWidth
                               id="guestsCount"
                               onChange={event => setState((prevState: State) => ({
                                   ...prevState,
                                   information: {
                                       comment: prevState?.information?.comment,
                                       downPayment: prevState?.information?.downPayment,
                                       termsAndConditions: prevState?.information?.termsAndConditions,
                                       guestsCount: {
                                           value: parseInt(event.target.value, 10),
                                           updated: true
                                       }
                                   }
                               }))}
                               error={(hasSubmit || state.information?.guestsCount?.updated) && !guestsCountValid(state?.information?.guestsCount)}
                               type="number"
                               label={t('components.payment-form.guests-count')}/>
                </Grid>
                <Grid item xs={fieldColumns / 2} paddingY='1em' paddingLeft='0.5em'>
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
                <Grid item xs={fieldColumns} paddingY='1em'>
                    <TextField multiline
                               minRows={4}
                               maxRows={8}
                               fullWidth
                               id="comment"
                               onChange={event => setState((prevState: State) => ({
                                   ...prevState,
                                   information: {
                                       ...prevState?.information,
                                       comment: event.target.value
                                   }
                               }))}
                               label={t('components.payment-form.comment')}/>
                </Grid>
                <Grid item xs={fieldColumns} paddingY='1em' paddingRight='0.5em' sx={{
                    borderRadius: '4px',
                    borderWidth: '1px',
                    borderStyle: (hasSubmit || state.information?.termsAndConditions?.updated)
                    && !termsAndConditionsValid(state.information?.termsAndConditions) ? 'solid' : 'none',
                    borderColor: palette.error.main
                }}>
                    <FormControlLabel color='red' //sx={{color: 'red'}}
                                      label={<span>
                                          {t('components.payment-form.accept-the')}
                                          <Link href='/termsAndConditions'
                                                key='terms-and-conditions'>{t('components.payment-form.terms-and-conditions')}</Link>
                                      </span>}
                                      control={
                                          <Checkbox id="termsAndConditions"
                                                    checked={!!state.information?.termsAndConditions?.value}
                                                    onChange={event => {
                                                        const newValue = event.target.checked;
                                                        setState((prevState: State) => ({
                                                            ...prevState,
                                                            information: {
                                                                comment: prevState?.information?.comment,
                                                                guestsCount: prevState?.information?.guestsCount,
                                                                downPayment: prevState?.information?.downPayment,
                                                                termsAndConditions: {
                                                                    value: newValue,
                                                                    updated: true
                                                                }
                                                            }
                                                        }))
                                                    }}/>
                                      }
                    />
                </Grid>
                <Grid item xs={12} paddingY='1em'>
                    <PaymentForm applicationId={process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID || 'missing-app-id'}
                                 locationId={process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || 'missing-location-id'}
                                 cardTokenizeResponseReceived={(token, _buyer) => {
                                     setSubmit(true);
                                     if (paymentTokenValid(token) && state.user && state.information && formValid(state)) {
                                         props.onValidatedPayment(state.user, state.information, token);
                                         return;
                                     }
                                     dispatch(uiMessage({
                                         messageKey: 'messages.failure.reserved-dates',
                                         severity: 'warning'
                                     }))
                                 }}
                                 createVerificationDetails={() => ({
                                     amount: !!state.information?.downPayment ? props.downPayment.toString() : props.totalPrice.toString(),
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
                        }}
                                    buttonProps={{
                                        isLoading: !formValid(state),
                                        css: {backgroundColor: palette.primary.contrastText}
                                    }}
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
        && emailValid(user.email)
}

function emailValid(email: ValidatedField<string> | undefined): boolean {
    return !!email
        && !!email.value
        // eslint-disable-next-line 
        && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)
}

function informationValid(information: Information | undefined): boolean {
    return !!information
        && !!information.guestsCount
        && !!information.guestsCount.value
        && !!information.downPayment
        && information.downPayment.value !== undefined
        && guestsCountValid(information.guestsCount)
        && termsAndConditionsValid(information.termsAndConditions);
}

function guestsCountValid(count: ValidatedField<number> | undefined): boolean {
    return !!count
        && count.value >= 0
        && count.value <= 15
}

function termsAndConditionsValid(terms: ValidatedField<boolean> | undefined): boolean {
    return !!terms && terms.value && terms.updated
}

function paymentTokenValid(result: TokenResult | undefined): boolean {
    return !!result
        && !!result.token
        && result.status === 'OK';
}
