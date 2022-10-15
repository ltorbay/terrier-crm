import {Box, List, ListItem, Typography} from "@mui/material";
import {Trans} from "react-i18next";
import React from "react";

export function TranslatedList({itemKeys, width = '100%'}: { itemKeys: string[], width?: string }) {
    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Box width={width}>
                <List>
                    {itemKeys.map((key: string) => (
                        <ListItem key={key} disablePadding sx={{paddingX:'2em'}}>
                            <Typography alignSelf='start'>{'\u25E6\u00A0\u00A0\u00A0'}</Typography>
                            <Typography alignSelf='start'><Trans i18nKey={key}/></Typography>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );
}