export class ImageInfo {
    src: string;
    titleKey: string;
    rows: number;
    cols: number;
    smallScreenCols: number;

    constructor(src: string, titleKey: string, rows?: number, cols?: number, smallScreenCols?: number) {
        this.src = src;
        this.titleKey = titleKey;
        this.rows = rows || 1;
        this.cols = cols || 1;
        this.smallScreenCols = smallScreenCols || this.cols;
    }
}