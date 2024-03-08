import NavigationBar from "../components/NavigationBar";
import {Shade} from "../model/Shade";
import * as React from "react";
import {Box, List, ListItem, Typography} from "@mui/material";
import {ImageDecoration} from "../components/ImageDecoration";
import {TextBox} from "../components/containers/TextBox";
import {ContentBox} from "../components/containers/ContentBox";
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import {StickyBookingButton} from "../components/StickyBookingButton";
import {Trans} from "react-i18next";
import {ImageGallery} from "../components/ImageGallery";
import {ImageInfo} from "../model/ImageInfo";
import {IMAGES} from "../constants/images";
import {MEDIA_QUERY_1000_BREAKPOINT} from "../constants/constants";
// @ts-ignore
import Obfuscate from 'react-obfuscate';

const teamImages: ImageInfo[] = [
    new ImageInfo(IMAGES.contact.louis, 'louis', 1, 1),
    new ImageInfo(IMAGES.contact.christelle, 'christelle', 1, 1),
    new ImageInfo(IMAGES.contact.mathieu, 'mathieu', 1, 1),
    new ImageInfo(IMAGES.contact.cecile, 'cecile', 1, 1),
    new ImageInfo(IMAGES.contact.crozi, 'crozi', 1, 2),
    new ImageInfo(IMAGES.contact.chipo, 'chipo', 1, 2)
]

// noinspection JSUnusedGlobalSymbols
export default function Contact() {
    return (
        <>
            <header>
                <NavigationBar shade={Shade.Dark}/>
            </header>
            <Box sx={{paddingTop: '7vh'}}/>
            <ImageDecoration right/>
            <ContentBox titleKey={'pages.contact.title'}>
                <Typography display='block' textAlign='justify' variant='h6'>
                    <strong><Trans i18nKey='pages.contact.our-coordinates'/></strong><br/>
                </Typography>
                <Typography display='block' textAlign='justify' variant='body1'>
                    <List>
                        <ListItem key='address' disablePadding sx={{paddingX: '2em'}}>
                            <HomeOutlined fontSize='medium'/>
                            <Typography variant='h6'>
                                {'\u00A0\u00A0\u00A0'}<Trans i18nKey='common.address'/>
                            </Typography>
                        </ListItem>
                        <ListItem key='mail' disablePadding sx={{paddingX: '2em'}}>
                            <EmailOutlinedIcon fontSize='medium'/>
                            <Typography variant='h6'>
                                {'\u00A0\u00A0\u00A0'}<Obfuscate element='span' email='leterrier.gites@gmail.com'/>
                            </Typography>
                        </ListItem>
                        <ListItem key='number' disablePadding sx={{paddingX: '2em'}}>
                            <LocalPhoneOutlinedIcon fontSize='medium'/>
                            <Typography variant='h6'>
                                {'\u00A0\u00A0\u00A0'}<Obfuscate element='span' tel='07 63 77 49 33'/>
                            </Typography>
                        </ListItem>
                    </List>
                </Typography>
            </ContentBox>
            <ContentBox>
                <Typography display='block' textAlign='justify' variant='h6'>
                    <strong><Trans i18nKey='pages.contact.our-project'/></strong><br/>
                </Typography>
                <Typography display='block' textAlign='justify' variant='body1'>
                    <Trans i18nKey={'pages.contact.our-story'}/>
                </Typography>
            </ContentBox>
            <ContentBox>
                <Typography display='block' textAlign='justify' variant='h6'>
                    <strong><Trans i18nKey='pages.contact.events'/></strong><br/>
                </Typography>
                <Typography display='block' textAlign='justify' variant='body1'>
                    <Trans i18nKey={'pages.contact.contact-us-body'}/>
                </Typography>
            </ContentBox>
            <ContentBox>
                <ImageGallery images={teamImages} mediaQuery={MEDIA_QUERY_1000_BREAKPOINT}/>
            </ContentBox>
            <StickyBookingButton/>
        </>
    );
}