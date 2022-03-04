export class Image {
    // TODO srcSet with cropped images !
    // TODO vary width and height from image server requests (w&h)
    src: string;
    title: string;

    constructor(src: string, title: string) {
        this.src = src;
        this.title = title;
    }
}