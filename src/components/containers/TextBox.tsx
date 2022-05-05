import {Typography} from "@mui/material";
import React from "react";
import {Trans} from "react-i18next";
import {ContentBox} from "./ContentBox";

class Props {
    titleKey?: string;
    contentKey: string;
    width?: string;
    marginBottom?: string;

    constructor(titleKey: string, contentKey: string, width: string, marginBottom: string) {
        this.titleKey = titleKey;
        this.contentKey = contentKey;
        this.width = width;
        this.marginBottom = marginBottom;
    }
}

export function TextBox({titleKey, contentKey, width = '70%', marginBottom = '6vh'}: Props) {
    return (
        <ContentBox titleKey={titleKey} width={width} marginBottom={marginBottom}>
            <Typography display='block' textAlign='justify' variant='body1'>
                <Trans i18nKey={contentKey}/>
            </Typography>
        </ContentBox>
    );
}