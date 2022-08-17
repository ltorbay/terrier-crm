import NavigationBar from "../components/NavigationBar";
import {Shade} from "../model/Shade";
import * as React from "react";
import {Box, List, ListItem, Typography} from "@mui/material";
import {ImageDecoration} from "../components/ImageDecoration";
import {TextBox} from "../components/containers/TextBox";
import {ContentBox} from "../components/containers/ContentBox";
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import {StickyBookingButton} from "../components/StickyBookingButton";

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
                    <strong>Nos coordonnées</strong><br/>
                </Typography>
                <Typography display='block' textAlign='justify' variant='body1'>
                    <List>
                        <ListItem key='mail' disablePadding sx={{paddingX: '2em'}}>
                            <EmailOutlinedIcon fontSize='medium'/>
                            <Typography variant='h6'>
                                {'\u00A0\u00A0\u00A0'}leterrier.gites@gmail.com
                            </Typography>
                        </ListItem>
                        <ListItem key='number' disablePadding sx={{paddingX: '2em'}}>
                            <LocalPhoneOutlinedIcon fontSize='medium'/>
                            <Typography variant='h6'>
                                {'\u00A0\u00A0\u00A0'}06 70 70 17 72
                            </Typography>
                        </ListItem>
                    </List>
                </Typography>
            </ContentBox>
            <StickyBookingButton/>
        </>
    );
}