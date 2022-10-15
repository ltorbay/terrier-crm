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

// noinspection JSUnusedGlobalSymbols
export default function Contact() {
    return (
        <>
            <header>
                <NavigationBar shade={Shade.Dark}/>
            </header>
            <Box sx={{paddingTop: '7vh'}}/>
            <ImageDecoration right/>
            <TextBox titleKey={'pages.contact.title'}
                     contentKey={'pages.contact.contact-us-body'}/>
            <ContentBox>
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
                                {'\u00A0\u00A0\u00A0'}leterrier.gites@gmail.com
                            </Typography>
                        </ListItem>
                        <ListItem key='number' disablePadding sx={{paddingX: '2em'}}>
                            <LocalPhoneOutlinedIcon fontSize='medium'/>
                            <Typography variant='h6'>
                                {'\u00A0\u00A0\u00A0'}07 63 77 49 33
                            </Typography>
                        </ListItem>
                    </List>
                </Typography>
            </ContentBox>
            <StickyBookingButton/>
        </>
    );
}