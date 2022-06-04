import {Box, ImageList, ImageListItem, Typography} from "@mui/material";
import NavigationBar from "../components/NavigationBar";
import {Shade} from "../model/Shade";
import {ImageDecoration} from "../components/ImageDecoration";
import {ImageBox} from "../components/containers/ImageBox";
import {TextBox} from "../components/containers/TextBox";
import {Trans} from "react-i18next";
import React from "react";
import {PICTURES} from "../../public/assets";
import Image from "next/image";

class ImageInfo {
    src: string;
    title: string;
    rows: number;
    cols: number;

    constructor(src: string, title: string, rows?: number, cols?: number) {
        this.src = src;
        this.title = title;
        this.rows = rows || 1;
        this.cols = cols || 1;
    }
}

const domainImages: ImageInfo[] = [
    new ImageInfo(PICTURES.domain.arrival, 'Arrival', 2, 2),
    new ImageInfo(PICTURES.pool.large, 'Pool large', 1, 2),
    new ImageInfo(PICTURES.domain.frontTerrace, 'Front terrace', 2, 2),
    new ImageInfo(PICTURES.domain.terrace, 'Terrace'),
    new ImageInfo(PICTURES.domain.well, 'Well'),
    new ImageInfo(PICTURES.domain.yard, 'Yard'),
    new ImageInfo(PICTURES.pool.pool, 'Pool', 1, 2),
    new ImageInfo(PICTURES.domain.entrance, 'entrance'),
];
const lodgeImages: ImageInfo[] = [
    new ImageInfo(PICTURES.lodge.bayView, 'Bay view', 1, 2),
    new ImageInfo(PICTURES.lodge.backside, 'Back side'),
    new ImageInfo(PICTURES.lodge.dinnerTableSunny, 'Sunny dinner table'),
    new ImageInfo(PICTURES.lodge.firstMezzanine, 'First mezzanine'),
    new ImageInfo(PICTURES.lodge.lodgeFrontView, 'Lodge front view', 2, 2),
    new ImageInfo(PICTURES.lodge.secondMezzanine, 'Second mezzanine'),
    new ImageInfo(PICTURES.lodge.viewedFromTerrace, 'Viewed from the terrace', 2, 1),
    new ImageInfo(PICTURES.lodge.viewFromMezzanine, 'View from the mezzanine'),
    new ImageInfo(PICTURES.lodge.salon, 'Lodge salon'),
    new ImageInfo(PICTURES.lodge.salonInside, 'Inside the salon', 1, 2),
];
const pearImages: ImageInfo[] = [
    new ImageInfo(PICTURES.pear.coveredTerrace, 'Covered terrace', 2),
    new ImageInfo(PICTURES.pear.pears, 'Pears', 2, 2),
    new ImageInfo(PICTURES.pear.kitchen, 'Kitchen', 2),
    new ImageInfo(PICTURES.pear.bathroom, 'Bathroom'),
    new ImageInfo(PICTURES.pear.dinnerTable, 'Dinner table'),
    new ImageInfo(PICTURES.pear.smallBedroom, 'Small bedroom'),
    new ImageInfo(PICTURES.pear.salon, 'Salon'),
    new ImageInfo(PICTURES.pear.smallDoubleBedroom, 'Small double bedroom'),
    new ImageInfo(PICTURES.pear.backside, 'Back side', 2, 2),
    new ImageInfo(PICTURES.pear.frontSide, 'Front side'),
    new ImageInfo(PICTURES.pear.kitchen2, 'Kitchen 2'),
    new ImageInfo(PICTURES.pear.tallBedroom, 'Tall bedroom'),
];
const grapeImages: ImageInfo[] = [
    new ImageInfo(PICTURES.grape.backside, 'Back side', 2),
    new ImageInfo(PICTURES.grape.grape, 'Grape', 2, 2),
    new ImageInfo(PICTURES.grape.salon2, 'High salon', 2),
    new ImageInfo(PICTURES.grape.fireplace, 'Fire place', 1, 2),
    new ImageInfo(PICTURES.grape.bathroom, 'Bathroom'),
    new ImageInfo(PICTURES.grape.house, 'House'),
    new ImageInfo(PICTURES.grape.salon, 'Salon'),
    new ImageInfo(PICTURES.grape.tallBedroom, 'Tall bedroom'),
    new ImageInfo(PICTURES.grape.terrace, 'Terrace', 2, 2),
    new ImageInfo(PICTURES.grape.kitchen, 'Kitchen'),
    new ImageInfo(PICTURES.grape.smallBedroom, 'Small bedroom'),
];

export default function Gallery() {
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

function imageList(images: ImageInfo[]) {
    const vh = window.innerHeight / 100;
    const gap = 6;
    return (
        <ImageList variant="quilted" cols={4} gap={gap}>
            {images.map((image) => (
                <ImageListItem key={image.src}
                               cols={image.cols}
                               rows={image.rows}>
                    <Box position='relative'
                         overflow='hidden'
                         width='100%'
                         height={image.rows * 40 * vh + (image.rows - 1) * gap}>
                        <Image src={image.src}
                               alt={image.title}
                               layout='fill'
                               objectFit='cover'
                               loading="lazy"/>
                    </Box>
                </ImageListItem>
            ))}
        </ImageList>
    )
}