import {Box, Typography} from "@mui/material";
import React from "react";
import {LocalisationMap} from "../components/localisation-map/LocalisationMap";
import {Image} from "../model/Image";
import * as images from "../assets";
import {makeStyles} from "@mui/styles";
import NavigationBar from "../components/NavigationBar";
import {Shade} from "../model/Shade";
import {LightLogo} from "../assets";
import {HOME} from "./Pages";

const useStyles = makeStyles(() => ({
    container: {
        overflow: 'hidden',
        position: 'relative',
        height: '40vw',
        width: '100%',
    },
    imgResponsive: {
        position: 'absolute',
        width: '100%',
        height: 'auto',
        filter: 'brightness(70%)',
        left: '50%',
        top: '50%',
        '-webkit-transform': 'translate(-50%,-50%)',
        '-ms-transform': 'translate(-50%,-50%)',
        transform: 'translate(-50%,-50%)',
    },
    overlayArea: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        textAlign: 'center',
        width: '50%',
        transform: 'translate(-50%, -50%)',
    }
}));

export default function Home() {
    const image = new Image(images.Pool, "Pool");
    const imgClasses = useStyles();

    return (
        <Box>
            <header>
                <NavigationBar shade={Shade.Light} displayHomeButton={false}/>
            </header>
            <Box className={imgClasses.container}>
                <img src={image.src}
                     alt={image.title}
                     className={imgClasses.imgResponsive}
                     loading="lazy"/>
                <Box className={imgClasses.overlayArea}>
                    <img src={LightLogo}
                         width='25%'
                         height='auto'
                         loading='lazy'
                         alt=''/>
                    <Typography variant='h2' color='primary.light'>
                        Le Terrier
                    </Typography>
                    <Typography variant='h6' color='primary.light'>
                        Gîtes ruraux
                    </Typography>
                </Box>
            </Box>
            Home page !
            <LocalisationMap/>
        </Box>
    )
}