import {useTranslation} from "react-i18next";
import {Divider, List, ListItem, ListItemText, Typography} from "@mui/material";
import {PEAK_SEASON_END, PEAK_SEASON_START} from "../constants/constants";
import React from "react";
import {ContentBox} from "./containers/ContentBox";

export function PricesList() {
    const {t} = useTranslation();
    const pageT = (key: string) => t("components.prices-list." + key);

    return (
        <ContentBox titleKey={"components.prices-list.title"} width='100%'>
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
        </ContentBox>
    );
}