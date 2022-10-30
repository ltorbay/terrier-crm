import React, {useEffect, useState} from "react";
import Image from "next/image";
import {Box} from "@mui/material";
import imageLoader from "../service/ImageLoader";
import {IMAGES} from "../constants/images";

const classes = {
    backgroundDecorationLeft: {
        height: 'auto',
        position: 'absolute',
        left: '2%',
        opacity: 0.1,
    },
    backgroundDecorationRight: {
        height: 'auto',
        position: 'absolute',
        right: '2%',
        opacity: 0.1,
        '-webkit-transform': 'scaleX(-1)',
        transform: 'scaleX(-1)',
    }
};

export function ImageDecoration({
                                    right = false,
                                    marginTop = '100px',
                                    vw = 20,
                                    icon = IMAGES.icons.dark.flower
                                }: { right?: boolean, marginTop?: string, vw?: number, icon?: string }) {
    const [showing, setShowing] = useState(false);

    useEffect(() => {
        setShowing(true);
    }, []);

    if (!showing) {
        return null;
    }
    
    if (typeof window === 'undefined') {
        return <></>; // Avoiding rendering decorations during SSG
    }
    const vwPixel = vw * window.innerWidth / 100;

    return (
        <Box sx={right ? classes.backgroundDecorationRight : classes.backgroundDecorationLeft}
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