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
    new Page("pages.home.label", "/", <Home/>),
    new Page("pages.gallery.label", "/gallery", <Gallery/>),
    new Page("pages.services.label", "/services", <Services/>),
    new Page("pages.prices.label", "/prices", <Prices/>),
    new Page("pages.booking.label", "/booking", <Booking/>),
]

export const PagesMap = new Map(Pages.map(page => [page.key, page]));