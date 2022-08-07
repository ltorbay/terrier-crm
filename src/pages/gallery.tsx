import {Box, ImageList, ImageListItem, Typography, useMediaQuery} from "@mui/material";
import NavigationBar from "../components/NavigationBar";
import {Shade} from "../model/Shade";
import {ImageDecoration} from "../components/ImageDecoration";
import {ImageBox} from "../components/containers/ImageBox";
import {TextBox} from "../components/containers/TextBox";
import {Trans} from "react-i18next";
import React from "react";
import {MEDIA_QUERY_650_BREAKPOINT, PICTURES} from "../constants/constants";
import Image from "next/image";
import imageLoader from "../service/ImageLoader";

class ImageInfo {
    src: string;
    title: string;
    rows: number;
    cols: number;
    smallScreenCols: number;

    constructor(src: string, title: string, rows?: number, cols?: number, smallScreenCols?: number) {
        this.src = src;
        this.title = title;
        this.rows = rows || 1;
        this.cols = cols || 1;
        this.smallScreenCols = smallScreenCols || this.cols;
    }
}

const domainImages: ImageInfo[] = [
    new ImageInfo(PICTURES.domain.arrival, 'Arrival', 2, 2),
    new ImageInfo(PICTURES.pool.large, 'Pool large', 1, 2),
    new ImageInfo(PICTURES.domain.frontTerrace, 'Front terrace', 2, 2),
    new ImageInfo(PICTURES.domain.terrace, 'Terrace'),
    new ImageInfo(PICTURES.domain.well, 'Well'),
    new ImageInfo(PICTURES.domain.yard, 'Yard', 1, 1, 2),
    new ImageInfo(PICTURES.pool.pool, 'Pool', 1, 2, 1),
    new ImageInfo(PICTURES.domain.entrance, 'entrance'),
];
const lodgeImages: ImageInfo[] = [
    new ImageInfo(PICTURES.lodge.bayView, 'Bay view', 1, 2),
    new ImageInfo(PICTURES.lodge.backside, 'Back side', 1, 1, 2),
    new ImageInfo(PICTURES.lodge.dinnerTableSunny, 'Sunny dinner table'),
    new ImageInfo(PICTURES.lodge.firstMezzanine, 'First mezzanine'),
    new ImageInfo(PICTURES.lodge.lodgeFrontView, 'Lodge front view', 2, 2),
    new ImageInfo(PICTURES.lodge.secondMezzanine, 'Second mezzanine'),
    new ImageInfo(PICTURES.lodge.viewedFromTerrace, 'Viewed from the terrace', 2, 1),
    new ImageInfo(PICTURES.lodge.viewFromMezzanine, 'View from the mezzanine'),
    new ImageInfo(PICTURES.lodge.salon, 'Lodge salon', 1, 1, 2),
    new ImageInfo(PICTURES.lodge.salonInside, 'Inside the salon', 1, 2),
];
const pearImages: ImageInfo[] = [
    new ImageInfo(PICTURES.pear.coveredTerrace, 'Covered terrace', 2, 1, 2),
    new ImageInfo(PICTURES.pear.pears, 'Pears', 2, 2),
    new ImageInfo(PICTURES.pear.kitchen, 'Kitchen', 2),
    new ImageInfo(PICTURES.pear.bathroom, 'Bathroom'),
    new ImageInfo(PICTURES.pear.dinnerTable, 'Dinner table'),
    new ImageInfo(PICTURES.pear.smallBedroom, 'Small bedroom'),
    new ImageInfo(PICTURES.pear.salon, 'Salon'),
    new ImageInfo(PICTURES.pear.smallDoubleBedroom, 'Small double bedroom', 1, 1, 2),
    new ImageInfo(PICTURES.pear.backside, 'Back side', 2, 2),
    new ImageInfo(PICTURES.pear.frontSide, 'Front side'),
    new ImageInfo(PICTURES.pear.kitchen2, 'Kitchen 2'),
    new ImageInfo(PICTURES.pear.tallBedroom, 'Tall bedroom', 1, 1, 2),
];
const grapeImages: ImageInfo[] = [
    new ImageInfo(PICTURES.grape.backside, 'Back side', 2, 1, 2),
    new ImageInfo(PICTURES.grape.grape, 'Grape', 2, 2),
    new ImageInfo(PICTURES.grape.salon2, 'High salon', 2),
    new ImageInfo(PICTURES.grape.fireplace, 'Fire place', 1, 2, 1),
    new ImageInfo(PICTURES.grape.bathroom, 'Bathroom'),
    new ImageInfo(PICTURES.grape.house, 'House', 1, 1, 2),
    new ImageInfo(PICTURES.grape.salon, 'Salon'),
    new ImageInfo(PICTURES.grape.tallBedroom, 'Tall bedroom'),
    new ImageInfo(PICTURES.grape.terrace, 'Terrace', 2, 2),
    new ImageInfo(PICTURES.grape.kitchen, 'Kitchen'),
    new ImageInfo(PICTURES.grape.smallBedroom, 'Small bedroom'),
];

// noinspection JSUnusedGlobalSymbols
export default function Gallery() {
    const smallScreen = useMediaQuery(MEDIA_QUERY_650_BREAKPOINT);

    return (
        <Box>
            <header>
                <NavigationBar shade={Shade.Dark}/>
            </header>
            <Box sx={{paddingTop: '4vh'}}/>
            <ImageDecoration right/>
            <ImageBox src={PICTURES.domain.aerialView}>
                <TextBox titleKey={'pages.gallery.title'}
                         contentKey={'pages.gallery.body'}/>
            </ImageBox>
            <Typography paddingTop='2vh' paddingBottom='2vh' display='block' textAlign='center' variant='h4'
                        id='common.places.pool'>
                <Trans i18nKey={'common.places.domain'}/>
            </Typography>
            {imageList(domainImages, smallScreen)}
            <Typography paddingTop='2vh' paddingBottom='2vh' display='block' textAlign='center' variant='h4'
                        id='common.places.lodge'>
                <Trans i18nKey={'common.places.the-lodge'}/>
            </Typography>
            {imageList(lodgeImages, smallScreen)}
            <Typography paddingTop='2vh' paddingBottom='2vh' display='block' textAlign='center' variant='h4'
                        id='common.places.pear'>
                <Trans i18nKey={'common.places.the-pear'}/>
            </Typography>
            {imageList(pearImages, smallScreen)}
            <Typography paddingTop='2vh' paddingBottom='2vh' display='block' textAlign='center' variant='h4'
                        id='common.places.grape'>
                <Trans i18nKey={'common.places.the-grape'}/>
            </Typography>
            {imageList(grapeImages, smallScreen)}
        </Box>
    )
}

function imageList(images: ImageInfo[], smallScreen: boolean) {
    const gap = 6;
    return (
        <ImageList sx={{paddingX: gap + 'px'}} variant="quilted" cols={smallScreen ? 2 : 4} gap={gap}>
            {images.map((image) => (
                <ImageListItem key={image.src}
                               cols={smallScreen ? image.smallScreenCols : image.cols}
                               rows={image.rows}>
                    <Box position='relative'
                         overflow='hidden'
                         width='100%'
                         height={typeof window === 'undefined' ?
                             image.rows * 40 + (smallScreen ? 'vw' : 'vh')
                             : (image.rows * 40 * ((smallScreen ? window.innerWidth : window.innerHeight) / 100) + (image.rows - 1) * gap) + 'px'}>
                        <Image src={image.src}
                               loader={imageLoader}
                               alt={image.title}
                               layout='fill'
                               objectFit='cover'
                               loading='eager'/>
                    </Box>
                </ImageListItem>
            ))}
        </ImageList>
    )
}