import {Box, ImageList, ImageListItem} from "@mui/material";
import {Image} from "../model/Image";
import * as images from "../assets/index";
import React from "react";

export default function Gallery() {
    const galleryImages: Image[] = [
        new Image(images.AerialView, "Aerial view"),
        new Image(images.Pool, "Pool"),
        new Image(images.BayView, "Bay view"),
        new Image(images.PoolView, "Pool view"),
        new Image(images.Salon, "Salon"),
        new Image(images.Kitchen, "First kitchen"),
        new Image(images.SalonInside, "Inside the salon"),
        new Image(images.Terrace, "Terrace"),
        new Image(images.Well, "Well"),
    ]

    return (
        <Box>
            <ImageList variant="woven" cols={3} gap={8}>
                {galleryImages.map((image) => (
                    <ImageListItem key={image.src}>
                        <img src={image.src}
                             alt={image.title}
                             loading="lazy"/>
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    )
}