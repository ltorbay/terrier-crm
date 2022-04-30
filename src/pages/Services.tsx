import {Box} from "@mui/material";
import React from "react";
import NavigationBar from "../components/NavigationBar";
import {Shade} from "../model/Shade";

export default function Services() {
    return (
        <Box>
            <header>
                <NavigationBar shade={Shade.Dark}/>
            </header>
            Services page !
        </Box>
    )
}