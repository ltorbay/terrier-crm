import {List, ListItem, Typography} from "@mui/material";
import {Trans} from "react-i18next";
import React from "react";

export function TranslatedList({itemKeys}: { itemKeys: string[] }) {
    return (
        <List>
            {itemKeys.map((key: string) => (
                <ListItem disablePadding>
                    <Typography marginX='2em' alignSelf='start'>{'\u25E6'}</Typography>
                    <Typography align='justify'><Trans i18nKey={key}/></Typography>
                </ListItem>
            ))}
        </List>
    );
}