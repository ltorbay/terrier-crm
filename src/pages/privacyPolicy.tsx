import NavigationBar from "../components/NavigationBar";
import {Shade} from "../model/Shade";
import * as React from "react";
import {Box} from "@mui/material";
import {ImageDecoration} from "../components/ImageDecoration";
import {TextBox} from "../components/containers/TextBox";
import {StickyBookingButton} from "../components/StickyBookingButton";
import {IMAGES} from "../constants/images";

// noinspection JSUnusedGlobalSymbols
export default function PrivacyPolicy() {
    return (
        <>
            <header>
                <NavigationBar shade={Shade.Dark}/>
            </header>
            <Box sx={{paddingTop: '7vh'}}/>
            <ImageDecoration icon={IMAGES.icons.dark.keys} right/>
            <TextBox titleKey={'pages.privacy-policy.label'}
                     contentKey={'pages.privacy-policy.content'}/>
            <StickyBookingButton/>
        </>
    );
}