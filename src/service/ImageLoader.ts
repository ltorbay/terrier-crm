import {ImageLoaderProps} from "next/image";

export default function imageLoader({src, width}: ImageLoaderProps) {
    if (process.env.NEXT_PUBLIC_IMAGE_SOURCE) {
        return process.env.NEXT_PUBLIC_IMAGE_SOURCE + `img${width}/${src}`
    }
    return `img${width}/${src}`
}