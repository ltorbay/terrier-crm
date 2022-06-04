import React from "react";
import {Box, Grid, useMediaQuery} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {MEDIA_QUERY_650_BREAKPOINT} from "../../constants/constants";
import Image from "next/image";

const useStyles = makeStyles(() => ({
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        overflow: 'hidden',
        position: 'relative',
    },
}));

class Props {
    children: React.ReactNode;

    src: string;
    right?: boolean;

    constructor(children: React.ReactNode, src: string) {
        this.children = children;
        this.src = src;
    }
}

export function ImageBox({children, src, right = false}: Props) {
    const classes = useStyles();
    const smallScreen = useMediaQuery(MEDIA_QUERY_650_BREAKPOINT);
    const imageSize = smallScreen ? '100vw' : '35vw';

    const image = (
        <Grid item
              xs={smallScreen ? 12 : 6}
              className={classes.center}>
            <Box className={classes.container}
                 sx={{height: imageSize, width: imageSize}}>
                <Image src={src}
                       layout='fill'
                       objectFit='cover'
                       loading='lazy'
                       alt=''/>
            </Box>
        </Grid>
    );

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', marginBottom: '4vh', marginTop: '6vh'}}>
            <Grid container width={smallScreen ? '100%' : '80%'}>
                {smallScreen || !right ? image : undefined}
                <Grid item xs={smallScreen ? 12 : 6}>
                    {children}
                </Grid>
                {right && !smallScreen ? image : undefined}
            </Grid>
        </Box>
    );
}