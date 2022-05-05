import React from "react";
import {makeStyles} from "@mui/styles";
import {ICONS} from "../assets";

const useStyles = makeStyles(() => ({
    backgroundDecorationLeft: {
        width: '20vw',
        height: 'auto',
        position: 'absolute',
        left: '2%',
        opacity: 0.1,
    },
    backgroundDecorationRight: {
        width: '20vw',
        height: 'auto',
        position: 'absolute',
        right: '2%',
        opacity: 0.1,
        '-webkit-transform': 'scaleX(-1)',
        transform: 'scaleX(-1)',
    }
}));

export function ImageDecoration({right = false, marginTop = '100px'}: { right?: boolean, marginTop?: string }) {
    const classes = useStyles();

    return (
        <img src={ICONS.dark.icons.flower}
             style={{marginTop: marginTop}}
             className={right ? classes.backgroundDecorationRight : classes.backgroundDecorationLeft}
             alt=''/>
    );
}