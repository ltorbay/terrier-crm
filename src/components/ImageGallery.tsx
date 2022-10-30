import {useTranslation} from "react-i18next";
import {ImageInfo} from "../model/ImageInfo";
import {Box, ImageList, ImageListItem, useMediaQuery} from "@mui/material";
import Image from "next/image";
import imageLoader from "../service/ImageLoader";
import React from "react";
import {MEDIA_QUERY_650_BREAKPOINT} from "../constants/constants";

class Props {
    images: ImageInfo[];
    gap?: number;
    mediaQuery?: string;

    constructor(images: ImageInfo[]) {
        this.images = images;
    }
}

export function ImageGallery(props: Props) {
    const {t} = useTranslation();
    const gap = props.gap || 6;
    const smallScreen = useMediaQuery(props.mediaQuery || MEDIA_QUERY_650_BREAKPOINT);
    return (
        <ImageList sx={{paddingX: gap + 'px'}} variant="quilted" cols={smallScreen ? 2 : 4} gap={gap}>
            {props.images.map((image) => (
                <ImageListItem key={image.src}
                               cols={smallScreen ? image.smallScreenCols : image.cols}
                               rows={image.rows}>
                    <Box position='relative'
                         overflow='hidden'
                         width='100%'
                         height={typeof window === 'undefined' ?
                             image.rows * 40 + (smallScreen ? 'vw' : 'vh')
                             : (image.rows * 40 * ((smallScreen ? window.innerWidth : window.innerHeight) / 100) + (image.rows - 1) * gap) + 'px'}>
                        <Image src={image.src}
                               loader={imageLoader}
                               alt={t('common.images.' + image.titleKey)}
                               layout='fill'
                               objectFit='cover'
                               loading='eager'/>
                    </Box>
                </ImageListItem>
            ))}
        </ImageList>
    )
}