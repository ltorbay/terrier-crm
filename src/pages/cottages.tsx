import {Box, useMediaQuery} from "@mui/material";
import {MEDIA_QUERY_650_BREAKPOINT} from "../constants/constants";
import NavigationBar from "../components/NavigationBar";
import {Shade} from "../model/Shade";
import {ImageDecoration} from "../components/ImageDecoration";
import {TextBox} from "../components/containers/TextBox";
import {ImageBox} from "../components/containers/ImageBox";
import {ContentBox} from "../components/containers/ContentBox";
import {TranslatedList} from "../components/TranslatedList";
import React from "react";
import {StickyBookingButton} from "../components/StickyBookingButton";
import {IMAGES} from "../constants/images";

// noinspection JSUnusedGlobalSymbols
export default function Cottages() {
    const textBoxWidth = useMediaQuery(MEDIA_QUERY_650_BREAKPOINT) ? '70%' : '100%';

    const amenities = ['private-alleyway', 'heated-pool', 'buildings-and-courtyard', 'private-terraces', 'terrain-description', 'domain-count']
    const pearEquipments = ['central-heater', 'stove', 'equipped-kitchen', 'covered-terrace'];
    const grapeEquipments = ['central-heater', 'stove', 'equipped-kitchen'];
    const lodgeEquipment = ['reversible-air-conditionner', 'stove'];

    return (
        <>
            <header>
                <NavigationBar shade={Shade.Dark}/>
            </header>
            <Box sx={{paddingTop: '4vh'}}/>
            <ImageDecoration right/>
            <TextBox marginBottom='4vh' titleKey={'pages.cottages.our-cottages-title'}
                     contentKey={'pages.cottages.our-cottages-body'}/>
            <TextBox marginTop='0px' contentKey={'pages.cottages.events-details'}/>
            <ImageBox src={IMAGES.cottages.amenities} hrefLink='/gallery#common.places.pool' id='common.places.pool' altKey='domain.aerialView1'>
                <ContentBox titleKey={'pages.cottages.amenities-title'} width='100%'>
                    <TranslatedList itemKeys={amenities.map(amenity => 'pages.cottages.' + amenity)}/>
                </ContentBox>
            </ImageBox>
            <ImageBox src={IMAGES.cottages.lodge} right hrefLink='/gallery#common.places.lodge' id='common.places.lodge' altKey='lodge.lodgeFrontView'>
                <ImageDecoration icon={IMAGES.icons.dark.stump} marginTop='50px' vw={30}/>
                <TextBox titleKey={'common.places.the-lodge'}
                         contentKey={'pages.cottages.lodge-description'}
                         marginBottom='0'
                         width={textBoxWidth}/>
                <TranslatedList width={textBoxWidth}
                                itemKeys={lodgeEquipment.map(item => 'common.equipments.' + item)}/>
            </ImageBox>
            <ImageBox src={IMAGES.cottages.pear} hrefLink='/gallery#common.places.pear' id='common.places.pear' altKey='lodge.backside'>
                <ImageDecoration right icon={IMAGES.icons.dark.pear}/>
                <TextBox titleKey={'common.places.the-pear'}
                         contentKey={'pages.cottages.pear-description'}
                         marginBottom='0'
                         width={textBoxWidth}/>
                <TranslatedList width={textBoxWidth}
                                itemKeys={pearEquipments.map(item => 'common.equipments.' + item)}/>
            </ImageBox>
            <ImageBox src={IMAGES.cottages.grapes} right hrefLink='/gallery#common.places.grape' id='common.places.grape' altKey='grape.house'>
                <ImageDecoration icon={IMAGES.icons.dark.grape} vw={15}/>
                <TextBox titleKey={'common.places.the-grape'}
                         contentKey={'pages.cottages.grape-description'}
                         marginBottom='0'
                         width={textBoxWidth}/>
                <TranslatedList width={textBoxWidth}
                                itemKeys={grapeEquipments.map(item => 'common.equipments.' + item)}/>
            </ImageBox>
            <StickyBookingButton/>
        </>
    )
}