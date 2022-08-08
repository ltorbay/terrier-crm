import {Box, ImageList, ImageListItem, Typography, useMediaQuery} from "@mui/material";
import NavigationBar from "../components/NavigationBar";
import {Shade} from "../model/Shade";
import {ImageDecoration} from "../components/ImageDecoration";
import {ImageBox} from "../components/containers/ImageBox";
import {TextBox} from "../components/containers/TextBox";
import {TFunction, Trans, useTranslation} from "react-i18next";
import React from "react";
import {MEDIA_QUERY_650_BREAKPOINT, PICTURES} from "../constants/constants";
import Image from "next/image";
import imageLoader from "../service/ImageLoader";

class ImageInfo {
    src: string;
    titleKey: string;
    rows: number;
    cols: number;
    smallScreenCols: number;

    constructor(src: string, titleKey: string, rows?: number, cols?: number, smallScreenCols?: number) {
        this.src = src;
        this.titleKey = titleKey;
        this.rows = rows || 1;
        this.cols = cols || 1;
        this.smallScreenCols = smallScreenCols || this.cols;
    }
}

const domainImages: ImageInfo[] = [
    new ImageInfo(PICTURES.domain.arrival, 'domain.arrival', 2, 2),
    new ImageInfo(PICTURES.pool.large, 'pool.large', 1, 2),
    new ImageInfo(PICTURES.domain.frontTerrace, 'domain.frontTerrace', 2, 2),
    new ImageInfo(PICTURES.domain.terrace, 'domain.terrace'),
    new ImageInfo(PICTURES.domain.well, 'domain.well'),
    new ImageInfo(PICTURES.domain.yard, 'domain.yard', 1, 1, 2),
    new ImageInfo(PICTURES.pool.pool, 'pool.pool', 1, 2, 1),
    new ImageInfo(PICTURES.domain.entrance, 'domain.entrance'),
];
const lodgeImages: ImageInfo[] = [
    new ImageInfo(PICTURES.lodge.bayView, 'lodge.bayView', 1, 2),
    new ImageInfo(PICTURES.lodge.backside, 'lodge.backside', 1, 1, 2),
    new ImageInfo(PICTURES.lodge.dinnerTableSunny, 'lodge.dinnerTableSunny'),
    new ImageInfo(PICTURES.lodge.firstMezzanine, 'lodge.firstMezzanine'),
    new ImageInfo(PICTURES.lodge.lodgeFrontView, 'lodge.lodgeFrontView', 2, 2),
    new ImageInfo(PICTURES.lodge.secondMezzanine, 'lodge.secondMezzanine'),
    new ImageInfo(PICTURES.lodge.viewedFromTerrace, 'lodge.viewedFromTerrace', 2, 1),
    new ImageInfo(PICTURES.lodge.viewFromMezzanine, 'lodge.viewFromMezzanine'),
    new ImageInfo(PICTURES.lodge.salon, 'lodge.salon', 1, 1, 2),
    new ImageInfo(PICTURES.lodge.salonInside, 'lodge.salonInside', 1, 2),
];
const pearImages: ImageInfo[] = [
    new ImageInfo(PICTURES.pear.coveredTerrace, 'pear.coveredTerrace', 2, 1, 2),
    new ImageInfo(PICTURES.pear.pears, 'pear.pears', 2, 2),
    new ImageInfo(PICTURES.pear.kitchen, 'pear.kitchen', 2),
    new ImageInfo(PICTURES.pear.bathroom, 'pear.bathroom'),
    new ImageInfo(PICTURES.pear.dinnerTable, 'pear.dinnerTable'),
    new ImageInfo(PICTURES.pear.smallBedroom, 'pear.smallBedroom'),
    new ImageInfo(PICTURES.pear.salon, 'pear.salon'),
    new ImageInfo(PICTURES.pear.smallDoubleBedroom, 'pear.smallDoubleBedroom', 1, 1, 2),
    new ImageInfo(PICTURES.pear.backside, 'pear.backside', 2, 2),
    new ImageInfo(PICTURES.pear.frontSide, 'pear.frontSide'),
    new ImageInfo(PICTURES.pear.kitchen2, 'Kitchen 2'),
    new ImageInfo(PICTURES.pear.tallBedroom, 'pear.tallBedroom', 1, 1, 2),
];
const grapeImages: ImageInfo[] = [
    new ImageInfo(PICTURES.grape.backside, 'grape.backside', 2, 1, 2),
    new ImageInfo(PICTURES.grape.grape, 'grape.grape', 2, 2),
    new ImageInfo(PICTURES.grape.salon2, 'High salon', 2),
    new ImageInfo(PICTURES.grape.fireplace, 'grape.fireplace', 1, 2, 1),
    new ImageInfo(PICTURES.grape.bathroom, 'grape.bathroom'),
    new ImageInfo(PICTURES.grape.house, 'grape.house', 1, 1, 2),
    new ImageInfo(PICTURES.grape.salon, 'grape.salon'),
    new ImageInfo(PICTURES.grape.tallBedroom, 'grape.tallBedroom'),
    new ImageInfo(PICTURES.grape.terrace, 'grape.terrace', 2, 2),
    new ImageInfo(PICTURES.grape.kitchen, 'grape.kitchen'),
    new ImageInfo(PICTURES.grape.smallBedroom, 'grape.smallBedroom'),
];

// noinspection JSUnusedGlobalSymbols
export default function Gallery() {
    const smallScreen = useMediaQuery(MEDIA_QUERY_650_BREAKPOINT);
    const {t} = useTranslation();

    return (
        <Box>
            <header>
                <NavigationBar shade={Shade.Dark}/>
            </header>
            <Box sx={{paddingTop: '4vh'}}/>
            <ImageDecoration right/>
            <ImageBox src={PICTURES.domain.aerialView} altKey='domain.aerialView'>
                <TextBox titleKey={'pages.gallery.title'}
                         contentKey={'pages.gallery.body'}/>
            </ImageBox>
            <Typography paddingTop='2vh' paddingBottom='2vh' display='block' textAlign='center' variant='h4'
                        id='common.places.pool'>
                <Trans i18nKey={'common.places.domain'}/>
            </Typography>
            {imageList(t, domainImages, smallScreen)}
            <Typography paddingTop='2vh' paddingBottom='2vh' display='block' textAlign='center' variant='h4'
                        id='common.places.lodge'>
                <Trans i18nKey={'common.places.the-lodge'}/>
            </Typography>
            {imageList(t, lodgeImages, smallScreen)}
            <Typography paddingTop='2vh' paddingBottom='2vh' display='block' textAlign='center' variant='h4'
                        id='common.places.pear'>
                <Trans i18nKey={'common.places.the-pear'}/>
            </Typography>
            {imageList(t, pearImages, smallScreen)}
            <Typography paddingTop='2vh' paddingBottom='2vh' display='block' textAlign='center' variant='h4'
                        id='common.places.grape'>
                <Trans i18nKey={'common.places.the-grape'}/>
            </Typography>
            {imageList(t, grapeImages, smallScreen)}
        </Box>
    )
}

function imageList(t: TFunction<"translation">, images: ImageInfo[], smallScreen: boolean) {
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
                               alt={t('common.images.' + image.titleKey)}
                               layout='fill'
                               objectFit='cover'
                               loading='eager'/>
                    </Box>
                </ImageListItem>
            ))}
        </ImageList>
    )
}