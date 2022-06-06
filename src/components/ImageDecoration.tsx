import React from "react";
import {makeStyles} from "@mui/styles";
import {ICONS} from "../constants/constants";
import Image from "next/image";
import {Box} from "@mui/material";
import imageLoader from "../service/ImageLoader";

const useStyles = (width: number) => makeStyles(() => ({
    backgroundDecorationLeft: {
        width: width,
        height: 'auto',
        position: 'absolute',
        left: '2%',
        opacity: 0.1,
    },
    backgroundDecorationRight: {
        width: width + 'vw',
        height: 'auto',
        position: 'absolute',
        right: '2%',
        opacity: 0.1,
        '-webkit-transform': 'scaleX(-1)',
        transform: 'scaleX(-1)',
    }
}));

export function ImageDecoration({
                                    right = false,
                                    marginTop = '100px',
                                    vw = 20,
                                    icon = ICONS.dark.icons.flower
                                }: { right?: boolean, marginTop?: string, vw?: number, icon?: string }) {
    const classes = useStyles(vw)();
    const vwPixel = vw * window.innerWidth / 100;

    return (
        <Box className={right ? classes.backgroundDecorationRight : classes.backgroundDecorationLeft}
             width={vw + 'vw'}
             style={{marginTop: marginTop}}>
            <Image src={icon}
                   loader={imageLoader}
                   width={vwPixel}
                   height={2 * vwPixel}
                   layout='responsive'
                   objectFit='contain'
                   loading='lazy'
                   alt=''/>
        </Box>
    );
}