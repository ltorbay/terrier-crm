import {ImageLoaderProps} from "next/image";

export default function imageLoader({src, width, quality}: ImageLoaderProps) {
    const queryWidth = width > 3840 ? 3840 : Math.floor(width / 16) * 16
    const imagePath = `img${queryWidth}/${src}?q=${quality || 45}`;

    if (process.env.NEXT_PUBLIC_IMAGE_SOURCE) {
        return process.env.NEXT_PUBLIC_IMAGE_SOURCE + imagePath;
    }
    return imagePath;
}