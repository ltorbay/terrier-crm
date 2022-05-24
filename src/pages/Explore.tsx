import * as React from 'react';
import NavigationBar from "../components/NavigationBar";
import {Shade} from "../model/Shade";

export default function Explore() {
    return (
        <>
            <header>
                <NavigationBar shade={Shade.Dark}/>
            </header>
            Explore page !
        </>
    );
}