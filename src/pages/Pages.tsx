import React, {ReactNode} from "react";
import Home from "./Home";
import Gallery from "./Gallery";
import Cottages from "./Cottages";
import Explore from "./Explore";
import Booking from "./Booking";
import Contact from "./Contact";

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

export const HOME = new Page("pages.home.label", "/", <Home/>)

export const PAGES = [
    new Page("pages.cottages.label", "/cottages", <Cottages/>),
    new Page("pages.gallery.label", "/gallery", <Gallery/>),
    new Page("pages.explore.label", "/explore", <Explore/>),
    new Page("pages.booking.label", "/booking", <Booking/>),
    new Page("pages.contact.label", "/contact", <Contact/>),
]
