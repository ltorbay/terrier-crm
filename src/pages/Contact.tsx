import * as React from 'react';
import {Box,} from "@mui/material";
import NavigationBar from "../components/NavigationBar";
import {Shade} from "../model/Shade";

export default function Contact() {
    return (
        <Box>
            <header>
                <NavigationBar shade={Shade.Dark}/>
            </header>
            Contact page !
        </Box>
    );
}