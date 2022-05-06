import {Box, List, ListItem, Typography} from "@mui/material";
import {Trans} from "react-i18next";
import React from "react";

export function TranslatedList({itemKeys, width = '100%'}: { itemKeys: string[], width?: string }) {
    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Box width={width}>
                <List>
                    {itemKeys.map((key: string) => (
                        <ListItem key={key} disablePadding>
                            <Typography marginX='2em' alignSelf='start'>{'\u25E6'}</Typography>
                            <Typography align='justify'><Trans i18nKey={key}/></Typography>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
}