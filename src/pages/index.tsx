import {Box, ImageList, ImageListItem, ImageListItemBar, Typography, useMediaQuery} from "@mui/material";
import React, {useEffect} from "react";
import moment, {MEDIA_QUERY_650_BREAKPOINT} from "../constants/constants";
import NavigationBar from "../components/NavigationBar";
import {Shade} from "../model/Shade";
import {Trans, useTranslation} from "react-i18next";
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
import {StickyBookingButton} from "../components/StickyBookingButton";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import {IMAGES} from "../constants/images";

const LocalisationMap = dynamic<any>(
    () => import("../components/LocalisationMap").then(module => module.LocalisationMap),
    {ssr: false}
);

const classes = {
    container: {
        overflow: 'hidden',
        position: 'relative',
        height: '60vw',
        width: '100%',
    },
    topBar: {
        background: 'linear-gradient(to bottom, rgb(246,245,245) 30%, rgba(246,245,245,0.4) 70%, rgba(246,245,245,0.1) 90%) !important'
    },
    itemBar: {
        background: 'linear-gradient(to top, rgba(33,30,30,0.3) 30%, rgba(33,30,30,0.4) 70%, rgba(33,30,30,0.2) 100%) !important'
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
    const cottagesImages: { src: string, key: string, altKey: string }[] = [
        {src: IMAGES.home.lodge, key: 'common.places.lodge', altKey: 'lodge.lodgeFrontView'},
        {src: IMAGES.home.pool, key: 'common.places.pool', altKey: 'pool.view'},
        {src: IMAGES.home.pear, key: 'common.places.pear', altKey: 'pear.backside'},
        {src: IMAGES.home.grapes, key: 'common.places.grape', altKey: 'grape.house'}
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
                    <Image src={IMAGES.icons.dark.logo}
                           loader={imageLoader}
                           layout='fill'
                           objectFit='contain'
                           alt={t('common.images.domain.logo')}/>
                </Box>
                <Typography variant='h2'>
                    LE TERRIER
                </Typography>
                <Typography variant='body1'>
                    {t('common.rural-cottages')}
                </Typography>
            </Box>
            <Box sx={classes.container}>
                <Image src={IMAGES.home.main}
                       loader={imageLoader}
                       layout='fill'
                       objectFit='cover'
                       alt={t('Drone 2022-10 9')}
                       loading='eager'/>
                <ImageListItemBar sx={classes.topBar} position='top' />
            </Box>
            <ImageDecoration right/>
            <TextBox titleKey={'pages.home.concept-title'} contentKey={'pages.home.concept-body'}/>
            <ImageList sx={{paddingX: '6px'}} variant="standard" cols={smallScreen ? 1 : 2} gap={8}>
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
                                           alt={t('common.images.' + image.altKey)}
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
            <ImageDecoration icon={IMAGES.icons.dark.keys}/>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Box width='80%'>
                    <Typography paddingBottom='2rem' display='block' textAlign='center' variant='h4'>
                        <Trans i18nKey='pages.home.join-us-title'/>
                    </Typography>
                    <Typography display='flex' variant='h6' justifyContent='center'>
                        <HomeOutlined fontSize='large'/>
                        {'\u00A0\u00A0\u00A0'}
                        <Trans i18nKey='common.address'/>
                    </Typography>
                    <br/><br/><br/>
                    <TextBox contentKey={'pages.home.join-us-train'} marginBottom='0' marginTop='0' width='100%'/>
                    <TranslatedList
                        itemKeys={trainStations.map(station => t('pages.home.train-station-of', {city: station}))}/>
                    <TextBox contentKey={'pages.home.join-us-car'} marginBottom='0' marginTop='0' width='100%'/>
                    <TranslatedList itemKeys={carAccess.map(carFrom => 'pages.home.' + carFrom)}/>
                    <TextBox contentKey={'pages.home.join-us-plane'} marginBottom='0' marginTop='0' width='100%'/>
                    <TranslatedList itemKeys={['pages.home.perigueux-airport', 'pages.home.bergerac-airport']}/>
                    <Box sx={{paddingTop: '4vh'}}/>
                    <Box sx={{paddingTop: '2vh'}}/>
                </Box>
            </Box>
            <LocalisationMap/>
            <StickyBookingButton/>
        </>
    )
}