import {Box} from "@mui/material";
import React from "react";
import NavigationBar from "../components/NavigationBar";
import {Shade} from "../model/Shade";
import {ImageBox} from "../components/containers/ImageBox";
import {PICTURES} from "../assets";
import {TextBox} from "../components/containers/TextBox";
import {TranslatedList} from "../components/TranslatedList";
import {ContentBox} from "../components/containers/ContentBox";
import {ImageDecoration} from "../components/ImageDecoration";

export default function Cottages() {
    const amenities = ['private-alleyway', 'heated-pool', 'buildings-and-courtyard', 'private-terraces', 'terrain-description']
    const pearEquipments = ['double-glazing', 'central-heater-stove', 'equipped-kitchen', 'covered-terrace'];
    const grapeEquipments = ['double-glazing', 'central-heater-stove', 'equipped-kitchen'];
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
                <ImageDecoration/>
            <ImageBox src={PICTURES.lodge.lodgeFrontView} right>
                <TextBox titleKey={'common.places.the-lodge'}
                         contentKey={'pages.cottages.lodge-description'}
                         marginBottom='0'
                         width='100%'/>
                <TranslatedList itemKeys={lodgeEquipment.map(item => 'common.equipments.' + item)}/>
            </ImageBox>
            <ImageBox src={PICTURES.pear.pearHouseTerrace}>
                <TextBox titleKey={'common.places.the-pear'}
                         contentKey={'pages.cottages.pear-description'}
                         marginBottom='0'
                         width='100%'/>
                <TranslatedList itemKeys={pearEquipments.map(item => 'common.equipments.' + item)}/>
            </ImageBox>
            <ImageDecoration/>
            <ImageBox src={PICTURES.grape.grapeHouse} right>
                <TextBox titleKey={'common.places.the-grape'}
                         contentKey={'pages.cottages.grape-description'}
                         marginBottom='0'
                         width='100%'/>
                <TranslatedList itemKeys={grapeEquipments.map(item => 'common.equipments.' + item)}/>
            </ImageBox>
        </Box>
    )
}