import {Box, ImageList, ImageListItem, ImageListItemBar, Typography, useMediaQuery} from "@mui/material";
import React from "react";
import {LocalisationMap} from "../components/LocalisationMap";
import {ICONS, PICTURES} from "../assets";
import {makeStyles} from "@mui/styles";
import NavigationBar from "../components/NavigationBar";
import {Shade} from "../model/Shade";
import {useTranslation} from "react-i18next";
import {TextBox} from "../components/containers/TextBox";
import {ImageDecoration} from "../components/ImageDecoration";
import {TranslatedList} from "../components/TranslatedList";
import {MEDIA_QUERY_650_BREAKPOINT} from "../constants/constants";

const useStyles = makeStyles(() => ({
    container: {
        overflow: 'hidden',
        position: 'relative',
        height: '50vw',
        width: '100%',
    },
    imgResponsive: {
        position: 'absolute',
        width: '100%',
        height: 'auto',
        left: '50%',
        top: '50%',
        '-webkit-transform': 'translate(-50%,-50%)',
        '-ms-transform': 'translate(-50%,-50%)',
        transform: 'translate(-50%,-50%)',
    },
    itemBar: {
        background: 'linear-gradient(to top, rgba(33,30,30,0.6) 0%, rgba(33,30,30,0.4) 70%, rgba(33,30,30,0.2) 100%) !important'
    }
}));

export default function Home() {
    const {t} = useTranslation();
    const classes = useStyles();
    const smallScreen = useMediaQuery(MEDIA_QUERY_650_BREAKPOINT);
    const trainStations = ['Niversac', 'Périgueux', 'Thenon', 'Les Versannes'];
    const carAccess = ['perigueux-by-car', 'brive-by-car', 'bordeaux-by-car', 'toulouse-by-car']

    return (
        <>
            <header>
                <NavigationBar shade={Shade.Dark} displayHomeButton={false}/>
            </header>
            <Box sx={{textAlign: 'center', marginBottom: '4vh', marginTop: '8vh'}}>
                <img src={ICONS.dark.logo}
                     width='12%'
                     height='auto'
                     loading='lazy'
                     alt=''/>
                <Typography variant='h2'>
                    LE TERRIER
                </Typography>
                <Typography variant='body1'>
                    {t('common.rural-cottages')}
                </Typography>
            </Box>
            <Box className={classes.container}>
                <img src={PICTURES.pool.pool}
                     alt={'Pool'}
                     className={classes.imgResponsive}
                     loading="lazy"/>
            </Box>
            <ImageDecoration right/>
            <TextBox titleKey={'pages.home.history-title'} contentKey={'pages.home.history-body'}/>
            <ImageList variant="standard" cols={smallScreen ? 1 : 2} gap={8}>
                <ImageListItem key='pear-house'>
                    <img src={PICTURES.pear.backside}
                         alt='pear-house'
                         loading="lazy"/>
                    <ImageListItemBar className={classes.itemBar}
                                      title={t('common.places.pear')}/>
                </ImageListItem>
                <ImageListItem key='grape-house'>
                    <img src={PICTURES.grape.house}
                         alt='grape-house'
                         loading="lazy"/>
                    <ImageListItemBar className={classes.itemBar}
                                      title={t('common.places.grape')}/>
                </ImageListItem>
                <ImageListItem key='lodge'>
                    <img src={PICTURES.lodge.lodgeFrontView}
                         alt='lodge-house'
                         loading="lazy"/>
                    <ImageListItemBar className={classes.itemBar}
                                      title={t('common.places.lodge')}/>
                </ImageListItem>
                <ImageListItem key='pool-view'>
                    <img src={PICTURES.pool.view}
                         alt='pool-view'
                         loading="lazy"/>
                    <ImageListItemBar className={classes.itemBar}
                                      title={t('common.places.pool')}/>
                </ImageListItem>
            </ImageList>
            <ImageDecoration icon={ICONS.dark.icons.keys}/>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Box width='70%'>
                    <TextBox titleKey={'pages.home.join-us-title'} contentKey={'pages.home.join-us-train'}
                             marginBottom='0'
                             width='100%'/>
                    <TranslatedList
                        itemKeys={trainStations.map(station => t('pages.home.train-station-of', {city: station}))}/>
                    <TextBox contentKey={'pages.home.join-us-car'} marginBottom='0' marginTop='0' width='100%'/>
                    <TranslatedList itemKeys={carAccess.map(carFrom => 'pages.home.' + carFrom)}/>
                    <TextBox contentKey={'pages.home.join-us-plane'} marginBottom='0' marginTop='0' width='100%'/>
                    <TranslatedList itemKeys={['pages.home.perigueux-airport']}/>
                    <Box sx={{paddingTop: '4vh'}}/>
                </Box>
            </Box>
            <LocalisationMap/>
            {/*TODO Le terrier en photos (see edito)*/}
        </>
    )
}