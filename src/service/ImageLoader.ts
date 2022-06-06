import {ImageLoaderProps} from "next/image";

export default function imageLoader({src, width}: ImageLoaderProps) {
    return `http://localhost:3000/img${width}/${src}`
}