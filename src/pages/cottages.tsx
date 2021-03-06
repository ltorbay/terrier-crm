import {Box, useMediaQuery} from "@mui/material";
import {ICONS, MEDIA_QUERY_650_BREAKPOINT, PICTURES} from "../constants/constants";
import NavigationBar from "../components/NavigationBar";
import {Shade} from "../model/Shade";
import {ImageDecoration} from "../components/ImageDecoration";
import {TextBox} from "../components/containers/TextBox";
import {ImageBox} from "../components/containers/ImageBox";
import {ContentBox} from "../components/containers/ContentBox";
import {TranslatedList} from "../components/TranslatedList";
import React from "react";

// noinspection JSUnusedGlobalSymbols
export default function Cottages() {
    const textBoxWidth = useMediaQuery(MEDIA_QUERY_650_BREAKPOINT) ? '70%' : '100%';

    const amenities = ['private-alleyway', 'heated-pool', 'buildings-and-courtyard', 'private-terraces', 'terrain-description']
    const pearEquipments = ['double-glazing', 'central-heater', 'stove', 'equipped-kitchen', 'covered-terrace'];
    const grapeEquipments = ['double-glazing', 'central-heater', 'stove', 'equipped-kitchen'];
    const lodgeEquipment = ['double-glazing', 'reversible-air-conditionner', 'stove'];

    return (
        <>
            <header>
                <NavigationBar shade={Shade.Dark}/>
            </header>
            <Box sx={{paddingTop: '4vh'}}/>
            <ImageDecoration right/>
            <TextBox titleKey={'pages.cottages.our-cottages-title'}
                     contentKey={'pages.cottages.our-cottages-body'}/>
            <ImageBox src={PICTURES.domain.aerialView1}>
                <ContentBox titleKey={'pages.cottages.amenities-title'} width='100%'>
                    <TranslatedList itemKeys={amenities.map(amenity => 'pages.cottages.' + amenity)}/>
                </ContentBox>
            </ImageBox>
            <ImageBox src={PICTURES.lodge.lodgeFrontView} right>
                <ImageDecoration icon={ICONS.dark.icons.stump} marginTop='50px' vw={30}/>
                <TextBox titleKey={'common.places.the-lodge'}
                         contentKey={'pages.cottages.lodge-description'}
                         marginBottom='0'
                         width={textBoxWidth}/>
                <TranslatedList width={textBoxWidth}
                                itemKeys={lodgeEquipment.map(item => 'common.equipments.' + item)}/>
            </ImageBox>
            <ImageBox src={PICTURES.pear.backside}>
                <ImageDecoration right icon={ICONS.dark.icons.pear}/>
                <TextBox titleKey={'common.places.the-pear'}
                         contentKey={'pages.cottages.pear-description'}
                         marginBottom='0'
                         width={textBoxWidth}/>
                <TranslatedList width={textBoxWidth}
                                itemKeys={pearEquipments.map(item => 'common.equipments.' + item)}/>
            </ImageBox>
            <ImageBox src={PICTURES.grape.house} right>
                <ImageDecoration icon={ICONS.dark.icons.grape} vw={15}/>
                <TextBox titleKey={'common.places.the-grape'}
                         contentKey={'pages.cottages.grape-description'}
                         marginBottom='0'
                         width={textBoxWidth}/>
                <TranslatedList width={textBoxWidth}
                                itemKeys={grapeEquipments.map(item => 'common.equipments.' + item)}/>
            </ImageBox>
        </>
    )
}