import {Box, ImageList, ImageListItem} from "@mui/material";
import {Image} from "../model/Image";

export default function Gallery() {
    const galleryImages: Image[] = [
        new Image("assets/pictures/aerial_view.jpeg", "Aerial view"),
        new Image("assets/pictures/pool.jpg", "Pool"),
        new Image("assets/pictures/bay_view.jpeg", "Bay view"),
        new Image("assets/pictures/pool_view.jpeg", "Pool view"),
        new Image("assets/pictures/salon.jpeg", "Salon"),
        new Image("assets/pictures/kitchen.jpg", "First kitchen"),
        new Image("assets/pictures/salon_inside.jpeg", "Inside the salon"),
        new Image("assets/pictures/terrace.jpeg", "Terrace"),
        new Image("assets/pictures/well.jpeg", "Well"),
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