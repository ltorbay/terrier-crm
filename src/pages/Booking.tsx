import {Box, Container, Divider, FormGroup, List, ListItem, ListItemText, Typography} from "@mui/material";
import {BookingSelection} from "../model/BookingSelection";
import BookingDateRange from "../components/booking-date-range/BookingDateRange";
import BookingPayment from "../components/BookingPayment";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {initReservedDates} from "../redux/slice/ReservedDatesSlice";
import moment from "../index";
import NavigationBar from "../components/NavigationBar";
import {Shade} from "../model/Shade";
import {PEAK_SEASON_END, PEAK_SEASON_START} from "../const/constants";
import {useTranslation} from "react-i18next";

export default function Booking() {
    const [state, setState] = useState<BookingSelection>();
    useAppDispatch()(initReservedDates())
    const {t} = useTranslation();
    const pageT = (key: string) => t("pages.booking." + key);

    const reservedDates = useAppSelector((datesState) => datesState.reservedDates.array)
        .map(epoch => moment(epoch));
    return (
        <Container maxWidth="sm">
            <header>
                <NavigationBar shade={Shade.Dark}/>
            </header>
            <Box height='100px'></Box>
            <Container maxWidth="lg">
                <List>
                    <ListItem alignItems="flex-start">
                        <ListItemText>
                            <ListItemText primary={t("common.peak-season")}
                                          secondary={
                                              PEAK_SEASON_START.format("DD/MM")
                                              + " - "
                                              + PEAK_SEASON_END.format("DD/MM")
                                          }/>
                            <List>
                                <ListItem>
                                    <ListItemText primary={pageT("weekly-rental")}
                                                  secondary={t("common.nights", {count: 7})}/>
                                    <Typography gutterBottom variant="h6" component="div">
                                        4000 €
                                    </Typography>
                                </ListItem>
                            </List>
                        </ListItemText>
                    </ListItem>
                    <Divider/>
                    <ListItem alignItems="flex-start">
                        <ListItemText>
                            <ListItemText primary={t("common.off-season")}
                                          secondary={
                                              PEAK_SEASON_END.clone().add(1, "days").format("DD/MM")
                                              + " - "
                                              + PEAK_SEASON_START.clone().subtract(1, "days").format("DD/MM")
                                          }/>
                            <List>
                                <ListItem>
                                    <ListItemText primary={pageT("weekly-rental")}
                                                  secondary={t("common.nights", {count: 7})}/>
                                    <Typography gutterBottom variant="h6" component="div">
                                        2000 €
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={pageT("weekend-rental")}
                                                  secondary={t("common.nights", {count: 2})}/>
                                    <Typography gutterBottom variant="h6" component="div">
                                        1100 €
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary={pageT("nightly-rental")}
                                                  secondary={pageT("price-per-night")}/>
                                    <Typography gutterBottom variant="h6" component="div">
                                        320 €
                                    </Typography>
                                </ListItem>
                            </List>
                        </ListItemText>
                    </ListItem>
                </List>
            </Container>
            <FormGroup>
                <BookingDateRange reservedDates={reservedDates}
                                  onChange={setState}/>
            </FormGroup>
            {(state?.periods && state?.weekStarts) ?
                <BookingPayment periods={state?.periods || []} weekStarts={state?.weekStarts || []}/> : undefined}
        </Container>
    )
}
