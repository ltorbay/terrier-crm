import {Box, ImageList, ImageListItem, Typography} from "@mui/material";
import {PICTURES} from "../assets";
import React from "react";
import NavigationBar from "../components/NavigationBar";
import {Shade} from "../model/Shade";
import {ImageDecoration} from "../components/ImageDecoration";
import {TextBox} from "../components/containers/TextBox";
import {ImageBox} from "../components/containers/ImageBox";
import {Trans} from "react-i18next";

class Image {
    // TODO srcSet with cropped images !
    // TODO vary width and height from image server requests (w&h)
    src: string;
    title: string;
    rows?: number;
    cols?: number;

    constructor(src: string, title: string, rows?: number, cols?: number) {
        this.src = src;
        this.title = title;
        this.rows = rows;
        this.cols = cols;
    }
}

export default function Gallery() {
    const domainImages: Image[] = [
        new Image(PICTURES.domain.arrival, 'Arrival', 2, 2),
        new Image(PICTURES.domain.entrance, 'entrance', 1, 1),
        new Image(PICTURES.domain.yard, 'Yard'),
        new Image(PICTURES.domain.frontTerrace, 'Front terrace', 2, 2),
        new Image(PICTURES.domain.terrace, 'Terrace'),
        new Image(PICTURES.domain.well, 'Well'),
    ];
    const lodgeImages: Image[] = [
        new Image(PICTURES.lodge.bayView, 'Bay view', 1, 2),
        new Image(PICTURES.lodge.backside, 'Back side'),
        new Image(PICTURES.lodge.dinnerTableSunny, 'Sunny dinner table'),
        new Image(PICTURES.lodge.firstMezzanine, 'First mezzanine'),
        new Image(PICTURES.lodge.lodgeFrontView, 'Lodge front view', 2, 2),
        new Image(PICTURES.lodge.secondMezzanine, 'Second mezzanine'),
        new Image(PICTURES.lodge.viewedFromTerrace, 'Viewed from the terrace', 2, 1),
        new Image(PICTURES.lodge.viewFromMezzanine, 'View from the mezzanine'),
        new Image(PICTURES.lodge.salon, 'Lodge salon'),
        new Image(PICTURES.lodge.salonInside, 'Inside the salon', 1, 2),
    ];
    const pearImages: Image[] = [];
    const grapeImages: Image[] = [];
    const poolImages: Image[] = [];

    return (
        <Box>
            <header>
                <NavigationBar shade={Shade.Dark}/>
            </header>
            <Box sx={{paddingTop: '4vh'}}/>
            <ImageDecoration right/>
            <ImageBox src={PICTURES.domain.aerialView}>
                <TextBox titleKey={'pages.gallery.label'}
                         contentKey={'pages.gallery.body'}/>
            </ImageBox>
            <Typography paddingTop='2vh' paddingBottom='2vh' display='block' textAlign='center' variant='h4'>
                <Trans i18nKey={'common.places.domain'}/>
            </Typography>
            {imageList(domainImages)}
            <Typography paddingTop='2vh' paddingBottom='2vh' display='block' textAlign='center' variant='h4'>
                <Trans i18nKey={'common.places.the-lodge'}/>
            </Typography>
            {imageList(lodgeImages)}
            <Typography paddingTop='2vh' paddingBottom='2vh' display='block' textAlign='center' variant='h4'>
                <Trans i18nKey={'common.places.the-pear'}/>
            </Typography>
            {imageList(pearImages)}
            <Typography paddingTop='2vh' paddingBottom='2vh' display='block' textAlign='center' variant='h4'>
                <Trans i18nKey={'common.places.the-grape'}/>
            </Typography>
            {imageList(grapeImages)}
            <Typography paddingTop='2vh' paddingBottom='2vh' display='block' textAlign='center' variant='h4'>
                <Trans i18nKey={'common.places.the-pool'}/>
            </Typography>
            {imageList(poolImages)}
        </Box>
    )
}

function imageList(images: Image[]) {
    return (
        <ImageList variant="quilted"  cols={4} gap={6}>
            {images.map((image) => (
                <ImageListItem key={image.src}
                               cols={image.cols || 1}
                               rows={image.rows || 1}>
                    <img src={image.src}
                         alt={image.title}
                         loading="lazy"/>
                </ImageListItem>
            ))}
        </ImageList>
    )
}