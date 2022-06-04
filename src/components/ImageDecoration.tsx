import React from "react";
import {makeStyles} from "@mui/styles";
import {ICONS} from "../../public/assets";
import Image from "next/image";
import {Box} from "@mui/material";

const useStyles = (width: string) => makeStyles(() => ({
    backgroundDecorationLeft: {
        width: width,
        height: 'auto',
        position: 'absolute',
        left: '2%',
        opacity: 0.1,
    },
    backgroundDecorationRight: {
        width: width,
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
                                    width = '20vw',
                                    icon = ICONS.dark.icons.flower
                                }: { right?: boolean, marginTop?: string, width?: string, icon?: string }) {
    const classes = useStyles(width)();

    return (
        <Box className={right ? classes.backgroundDecorationRight : classes.backgroundDecorationLeft}
        width={width} style={{marginTop: marginTop}}>
            <Image src={icon}
                   alt=''/>
        </Box>
    );
}