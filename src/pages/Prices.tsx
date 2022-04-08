import * as React from 'react';
import {Container, Divider, List, ListItem, ListItemText, Typography,} from "@mui/material";
import {useTranslation} from "react-i18next";
import moment from "moment";
import {PEAK_SEASON_END, PEAK_SEASON_START} from "../const/constants";

export default function Prices() {
    const {t} = useTranslation();
    const pageT = (key: string) => t("pages.prices." + key);
    
    return (
        <Container maxWidth="lg">
            <List>
                <ListItem alignItems="flex-start">
                    <ListItemText>
                        <ListItemText primary={pageT("peak-season")}
                                      secondary={
                                          PEAK_SEASON_START.format("DD/MM")
                                          + " - "
                                          + PEAK_SEASON_END.format("DD/MM")
                                      }/>
                        <List>
                            <ListItem>
                                <ListItemText primary={pageT("weekly-rental")}
                                              secondary={t("common.nights", {count: 7})}/>
                                <Typography gutterBottom color="primary.dark" variant="h6" component="div">
                                    4000 €
                                </Typography>
                            </ListItem>
                        </List>
                    </ListItemText>
                </ListItem>
                <Divider/>
                <ListItem alignItems="flex-start">
                    <ListItemText>
                        <ListItemText primary={pageT("off-season")}
                                      secondary={
                                          PEAK_SEASON_END.clone().add(1, "days").format("DD/MM")
                                          + " - "
                                          + PEAK_SEASON_START.clone().subtract(1, "days").format("DD/MM")
                                      }/>
                        <List>
                            <ListItem>
                                <ListItemText primary={pageT("weekly-rental")}
                                              secondary={t("common.nights", {count: 7})}/>
                                <Typography gutterBottom color="primary.dark" variant="h6" component="div">
                                    2000 €
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={pageT("weekend-rental")}
                                              secondary={t("common.nights", {count: 2})}/>
                                <Typography gutterBottom color="primary.dark" variant="h6" component="div">
                                    1100 €
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={pageT("nightly-rental")} secondary={pageT("price-per-night")}/>
                                <Typography gutterBottom color="primary.dark" variant="h6" component="div">
                                    320 €
                                </Typography>
                            </ListItem>
                        </List>
                    </ListItemText>
                </ListItem>
            </List>
        </Container>
    );
}