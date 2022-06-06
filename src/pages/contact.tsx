import NavigationBar from "../components/NavigationBar";
import {Shade} from "../model/Shade";
import * as React from "react";

// noinspection JSUnusedGlobalSymbols
export default function Contact() {
    return (
        <>
            <header>
                <NavigationBar shade={Shade.Dark}/>
            </header>
            Contact page !
        </>
    );
}