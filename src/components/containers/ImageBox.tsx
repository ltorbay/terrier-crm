import React from "react";
import {Box, Grid, useMediaQuery} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {MEDIA_QUERY_650_BREAKPOINT} from "../../constants/constants";
import Image from "next/image";
import imageLoader from "../../service/ImageLoader";
import Link from "next/link";

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
    id?: string;
    hrefLink?: string;

    src: string;
    right?: boolean;

    constructor(children: React.ReactNode, src: string) {
        this.children = children;
        this.src = src;
    }
}

export function ImageBox({children, id, hrefLink, src, right = false}: Props) {
    const classes = useStyles();
    const smallScreen = useMediaQuery(MEDIA_QUERY_650_BREAKPOINT);
    const imageSize = smallScreen ? '100vw' : '35vw';

    const grid = (
        <Grid item
              id={id}
              xs={smallScreen ? 12 : 6}
              className={classes.center}>
            <Box className={classes.container}
                 sx={{height: imageSize, width: imageSize}}>
                {!hrefLink ?
                    <Image src={src}
                           loader={imageLoader}
                           layout='fill'
                           objectFit='cover'
                           loading='eager'
                           alt=''/>
                    : <Link href={hrefLink}>
                        <Image src={src}
                               style={{cursor: 'pointer'}}
                               loader={imageLoader}
                               layout='fill'
                               objectFit='cover'
                               loading='eager'
                               alt=''/>
                    </Link>
                }
            </Box>
        </Grid>
    );

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', marginBottom: '4vh', marginTop: '6vh'}}>
            <Grid container width={smallScreen ? '100%' : '80%'}>
                {smallScreen || !right ? grid : undefined}
                <Grid item xs={smallScreen ? 12 : 6}>
                    {children}
                </Grid>
                {right && !smallScreen ? grid : undefined}
            </Grid>
        </Box>
    );
}