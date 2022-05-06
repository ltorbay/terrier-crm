import {Box, useMediaQuery} from "@mui/material";
import React from "react";
import NavigationBar from "../components/NavigationBar";
import {Shade} from "../model/Shade";
import {ImageBox} from "../components/containers/ImageBox";
import {ICONS, PICTURES} from "../assets";
import {TextBox} from "../components/containers/TextBox";
import {TranslatedList} from "../components/TranslatedList";
import {ContentBox} from "../components/containers/ContentBox";
import {ImageDecoration} from "../components/ImageDecoration";

export default function Cottages() {
    const textBoxWidth = useMediaQuery('(max-width:650px)') ? '70%' : '100%';

    const amenities = ['private-alleyway', 'heated-pool', 'buildings-and-courtyard', 'private-terraces', 'terrain-description']
    const pearEquipments = ['double-glazing', 'central-heater', 'stove', 'equipped-kitchen', 'covered-terrace'];
    const grapeEquipments = ['double-glazing', 'central-heater', 'stove', 'equipped-kitchen'];
    const lodgeEquipment = ['double-glazing', 'reversible-air-conditionner', 'stove'];

    return (
        <Box>
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
                <ImageDecoration icon={ICONS.dark.icons.stump} marginTop='50px' width='30vw'/>
                <TextBox titleKey={'common.places.the-lodge'}
                         contentKey={'pages.cottages.lodge-description'}
                         marginBottom='0'
                         width={textBoxWidth}/>
                <TranslatedList width={textBoxWidth}
                                itemKeys={lodgeEquipment.map(item => 'common.equipments.' + item)}/>
            </ImageBox>
            <ImageBox src={PICTURES.pear.backside}>
                <ImageDecoration right icon={ICONS.dark.icons.darkPear}/>
                <TextBox titleKey={'common.places.the-pear'}
                         contentKey={'pages.cottages.pear-description'}
                         marginBottom='0'
                         width={textBoxWidth}/>
                <TranslatedList width={textBoxWidth}
                                itemKeys={pearEquipments.map(item => 'common.equipments.' + item)}/>
            </ImageBox>
            <ImageBox src={PICTURES.grape.house} right>
                <ImageDecoration icon={ICONS.dark.icons.darkGrapes} width='15vw'/>
                <TextBox titleKey={'common.places.the-grape'}
                         contentKey={'pages.cottages.grape-description'}
                         marginBottom='0'
                         width={textBoxWidth}/>
                <TranslatedList width={textBoxWidth}
                                itemKeys={grapeEquipments.map(item => 'common.equipments.' + item)}/>
            </ImageBox>
        </Box>
    )
}