import {ImageLoaderProps} from "next/image";

export default function imageLoader({src, width}: ImageLoaderProps) {
    const queryWidth = width > 1920 ? 1920 : Math.floor(width / 16) * 16
    if (process.env.NEXT_PUBLIC_IMAGE_SOURCE) {
        return process.env.NEXT_PUBLIC_IMAGE_SOURCE + `img${queryWidth}/${src}`
    }
    return `img${queryWidth}/${src}`
}