import * as React from 'react';
import NavigationBar from "../NavigationBar";
import {Shade} from "../../model/Shade";

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