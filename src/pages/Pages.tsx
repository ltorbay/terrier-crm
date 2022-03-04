import React, {ReactNode} from "react";
import Home from "./Home";
import Gallery from "./Gallery";
import Services from "./Services";
import Prices from "./Prices";
import Booking from "./Booking";

class Page {
    key: string;
    path: string;
    element: ReactNode;

    constructor(key: string, path: string, element: ReactNode) {
        this.key = key;
        this.path = path;
        this.element = element;
    }
}

export const Pages = [
    new Page("home", "/", <Home/>),
    new Page("gallery", "/gallery", <Gallery/>),
    new Page("services", "/services", <Services/>),
    new Page("prices", "/prices", <Prices/>),
    new Page("booking", "/booking", <Booking/>),
]

export const PagesMap = new Map(Pages.map(page => [page.key, page]));