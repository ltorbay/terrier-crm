import NavigationBar from "../components/NavigationBar";
import {Shade} from "../model/Shade";
import * as React from "react";
import {Box, List, ListItem, Typography} from "@mui/material";
import {ImageDecoration} from "../components/ImageDecoration";
import {TextBox} from "../components/containers/TextBox";
import {ContentBox} from "../components/containers/ContentBox";
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

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
                            <ListItem key='mail' disablePadding sx={{paddingX:'2em'}}>
                                <EmailOutlinedIcon fontSize='small'/>
                                <Typography>
                                    {'\u00A0\u00A0\u00A0'}leterrier.gites@gmail.com
                                </Typography>
                            </ListItem>
                            <ListItem key='number' disablePadding sx={{paddingX:'2em'}}>
                                <LocalPhoneOutlinedIcon fontSize='small'/>
                                <Typography>
                                    {'\u00A0\u00A0\u00A0'}06 70 70 17 72
                                </Typography>
                            </ListItem>
                    </List>
                </Typography>
            </ContentBox>
        </>
    );
}