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
        new Image(PICTURES.pool.large, 'Pool large', 1, 2),
        new Image(PICTURES.domain.frontTerrace, 'Front terrace', 2, 2),
        new Image(PICTURES.domain.terrace, 'Terrace'),
        new Image(PICTURES.domain.well, 'Well'),
        new Image(PICTURES.domain.yard, 'Yard'),
        new Image(PICTURES.pool.pool, 'Pool', 1, 2),
        new Image(PICTURES.domain.entrance, 'entrance'),
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
    const pearImages: Image[] = [
        new Image(PICTURES.pear.coveredTerrace, 'Covered terrace'),
        new Image(PICTURES.pear.pears, 'Pears', 1, 2),
        new Image(PICTURES.pear.kitchen, 'Kitchen'),
        new Image(PICTURES.pear.bathroom, 'Bathroom'),
        new Image(PICTURES.pear.dinnerTable, 'Dinner table'),
        new Image(PICTURES.pear.smallBedroom, 'Small bedroom'),
        new Image(PICTURES.pear.salon, 'Salon'),
        new Image(PICTURES.pear.smallDoubleBedroom, 'Small double bedroom'),
        new Image(PICTURES.pear.backside, 'Back side', 2, 2),
        new Image(PICTURES.pear.frontSide, 'Front side'),
        new Image(PICTURES.pear.kitchen2, 'Kitchen 2'),
        new Image(PICTURES.pear.tallBedroom, 'Tall bedroom'),
    ];
    const grapeImages: Image[] = [
        new Image(PICTURES.grape.backside, 'Back side'),
        new Image(PICTURES.grape.grape, 'Grape', 1, 2),
        new Image(PICTURES.grape.salon2, 'High salon'),
        new Image(PICTURES.grape.fireplace, 'Fire place', 1, 2),
        new Image(PICTURES.grape.bathroom, 'Bathroom'),
        new Image(PICTURES.grape.house, 'House'),
        new Image(PICTURES.grape.salon, 'Salon'),
        new Image(PICTURES.grape.tallBedroom, 'Tall bedroom'),
        new Image(PICTURES.grape.terrace, 'Terrace', 2, 2),
        new Image(PICTURES.grape.kitchen, 'Kitchen'),
        new Image(PICTURES.grape.smallBedroom, 'Small bedroom'),
    ];

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