import {Box} from "@mui/material";
import React from "react";
import NavigationBar from "../components/NavigationBar";
import {Shade} from "../model/Shade";

export default function Cottages() {
    return (
        <Box>
            <header>
                <NavigationBar shade={Shade.Dark}/>
            </header>
            Cottages page !
        </Box>
    )
}