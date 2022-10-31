import {Box, Typography} from "@mui/material";
import NavigationBar from "../components/NavigationBar";
import {Shade} from "../model/Shade";
import {ImageDecoration} from "../components/ImageDecoration";
import {ImageBox} from "../components/containers/ImageBox";
import {TextBox} from "../components/containers/TextBox";
import {Trans} from "react-i18next";
import React from "react";
import {StickyBookingButton} from "../components/StickyBookingButton";
import {ImageGallery} from "../components/ImageGallery";
import {IMAGES} from "../constants/images";

// noinspection JSUnusedGlobalSymbols
export default function Gallery() {
    return (
        <Box>
            <header>
                <NavigationBar shade={Shade.Dark}/>
            </header>
            <Box sx={{paddingTop: '4vh'}}/>
            <ImageDecoration right/>
            <ImageBox src={IMAGES.gallery.main} altKey='domain.aerialView'>
                <TextBox titleKey={'pages.gallery.title'}
                         contentKey={'pages.gallery.body'}/>
            </ImageBox>
            <Typography paddingTop='2vh' paddingBottom='2vh' display='block' textAlign='center' variant='h4'
                        id='common.places.pool'>
                <Trans i18nKey={'common.places.domain'}/>
            </Typography>
            <ImageGallery images={IMAGES.gallery.domain}/>
            <Typography paddingTop='2vh' paddingBottom='2vh' display='block' textAlign='center' variant='h4'
                        id='common.places.lodge'>
                <Trans i18nKey={'common.places.the-lodge'}/>
            </Typography>
            <ImageGallery images={IMAGES.gallery.lodge}/>
            <Typography paddingTop='2vh' paddingBottom='2vh' display='block' textAlign='center' variant='h4'
                        id='common.places.pear'>
                <Trans i18nKey={'common.places.the-pear'}/>
            </Typography>
            <ImageGallery images={IMAGES.gallery.pear}/>
            <Typography paddingTop='2vh' paddingBottom='2vh' display='block' textAlign='center' variant='h4'
                        id='common.places.grape'>
                <Trans i18nKey={'common.places.the-grape'}/>
            </Typography>
            <ImageGallery images={IMAGES.gallery.grape}/>
            <StickyBookingButton/>
        </Box>
    )
}