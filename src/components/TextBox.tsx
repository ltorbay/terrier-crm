import {Box, Typography} from "@mui/material";
import React from "react";
import {Trans} from "react-i18next";

class Props {
    titleKey?: string;
    contentKey: string;
    width?: string;

    constructor(titleKey: string, contentKey: string, width: string) {
        this.titleKey = titleKey;
        this.contentKey = contentKey;
        this.width = width;
    }
}

export function TextBox({titleKey, contentKey, width = '70%'}: Props) {
    let displayedTitle = titleKey ? (
        <Typography paddingBottom='2rem' display='block' textAlign='center' variant='h4'>
            <Trans i18nKey={titleKey}/>
        </Typography>
    ) : undefined;
    
    return (
        <Box sx={{display: 'flex', justifyContent: 'center', marginBottom: '4vh', marginTop: '6vh'}}>
            <Box width={width}>
                {displayedTitle}
                <Typography display='block' textAlign='justify' variant='body1'>
                    <Trans i18nKey={contentKey}/>
                </Typography>
            </Box>
        </Box>
    );
}