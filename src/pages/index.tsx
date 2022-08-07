import {Box, ImageList, ImageListItem, ImageListItemBar, Typography, useMediaQuery} from "@mui/material";
import React, {useEffect} from "react";
import moment, {ICONS, MEDIA_QUERY_650_BREAKPOINT, PICTURES} from "../constants/constants";
import NavigationBar from "../components/NavigationBar";
import {Shade} from "../model/Shade";
import {useTranslation} from "react-i18next";
import {TextBox} from "../components/containers/TextBox";
import {ImageDecoration} from "../components/ImageDecoration";
import {TranslatedList} from "../components/TranslatedList";
import dynamic from "next/dynamic";
import Image from "next/image";
import imageLoader from "../service/ImageLoader";
import {useAppDispatch} from "../redux/hooks";
import {fetchPricingConfiguration} from "../redux/slice/PricingSlice";
import {fetchReservedDates} from "../redux/slice/ReservedDatesSlice";
import Link from "next/link";

const LocalisationMap = dynamic<any>(
    () => import("../components/LocalisationMap").then(module => module.LocalisationMap),
    {ssr: false}
);

const classes = {
    container: {
        overflow: 'hidden',
        position: 'relative',
        height: '50vw',
        width: '100%',
    },
    itemBar: {
        background: 'linear-gradient(to top, rgba(33,30,30,0.6) 0%, rgba(33,30,30,0.4) 70%, rgba(33,30,30,0.2) 100%) !important'
    },
    centerContent: {
        textAlign: 'center',
        alignContent: 'center',
        marginBottom: '4vh',
        marginTop: '8vh'
    }
};

export default function Home() {
    const {t} = useTranslation();
    const smallScreen = useMediaQuery(MEDIA_QUERY_650_BREAKPOINT);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchPricingConfiguration({start: moment(), end: moment().add(3, 'year'), dispatch: dispatch}));
        dispatch(fetchReservedDates({start: moment(), end: moment().add(3, 'year'), dispatch: dispatch}));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // const vw = typeof window === 'undefined' ? 3 : window.innerHeight / 100;
    const cottagesImages: { src: string, key: string }[] = [
        {src: PICTURES.pear.backside, key: 'common.places.pear'},
        {src: PICTURES.grape.house, key: 'common.places.grape'},
        {src: PICTURES.lodge.lodgeFrontView, key: 'common.places.lodge'},
        {src: PICTURES.pool.view, key: 'common.places.pool'}
    ]
    const trainStations = ['Niversac', 'Périgueux', 'Thenon', 'Les Versannes'];
    const carAccess = ['perigueux-by-car', 'brive-by-car', 'bordeaux-by-car', 'toulouse-by-car']

    return (
        <>
            <header>
                <NavigationBar shade={Shade.Dark} displayHomeButton={false}/>
            </header>
            <Box sx={classes.centerContent}>
                <Box width='20vw'
                     height='16vw'
                     margin='auto'
                     position='relative'>
                    <Image src={ICONS.dark.logo}
                           loader={imageLoader}
                           layout='fill'
                           objectFit='contain'
                           alt=''/>
                </Box>
                <Typography variant='h2'>
                    LE TERRIER
                </Typography>
                <Typography variant='body1'>
                    {t('common.rural-cottages')}
                </Typography>
            </Box>
            <Box
                sx={classes.container}
            >
                <Image src={PICTURES.pool.pool}
                       loader={imageLoader}
                       layout='fill'
                       objectFit='cover'
                       alt='Pool'
                       loading='eager'/>
            </Box>
            <ImageDecoration right/>
            <TextBox titleKey={'pages.home.concept-title'} contentKey={'pages.home.concept-body'}/>
            <ImageList variant="standard" cols={smallScreen ? 1 : 2} gap={8}>
                {cottagesImages.map(image =>
                    <ImageListItem key={image.src} sx={{cursor: 'pointer'}}>
                        <Box position='relative'
                             overflow='hidden'
                             width='100%'
                             height='40vw'>
                            <Link key={image.key} href={'/cottages#' + image.key}>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a style={{textDecoration: 'none'}}>
                                    <Image src={image.src}
                                           loader={imageLoader}
                                           alt={image.key}
                                           layout='fill'
                                           objectFit='cover'
                                           loading='eager'/>
                                </a>
                            </Link>
                        </Box>
                        <ImageListItemBar sx={classes.itemBar}
                                          title={t(image.key)}/>
                    </ImageListItem>
                )}
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
                    <TranslatedList itemKeys={['pages.home.perigueux-airport', 'pages.home.bergerac-airport']}/>
                    <Box sx={{paddingTop: '4vh'}}/>
                </Box>
            </Box>
            <LocalisationMap/>
        </>
    )
}