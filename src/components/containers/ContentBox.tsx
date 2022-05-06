import {Box, Typography} from "@mui/material";
import {Trans} from "react-i18next";
import React, {ReactElement} from "react";

class Props {
    children: ReactElement;
    titleKey?: string;
    width?: string;
    marginBottom?: string;
    marginTop?: string;

    constructor(children: ReactElement, titleKey: string, width: string, marginBottom: string, marginTop: string) {
        this.children = children;
        this.titleKey = titleKey;
        this.width = width;
        this.marginBottom = marginBottom;
        this.marginTop = marginTop;
    }
}

export function ContentBox({children, titleKey, width = '70%', marginBottom = '6vh', marginTop = '6vh'}: Props) {
    let displayedTitle = titleKey ? (
        <Typography paddingBottom='2rem' display='block' textAlign='center' variant='h4'>
            <Trans i18nKey={titleKey}/>
        </Typography>
    ) : undefined;

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', marginBottom: marginBottom, marginTop: marginTop}}>
            <Box width={width}>
                {displayedTitle}
                {children}
            </Box>
        </Box>
    );
}