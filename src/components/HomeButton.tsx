import Button from "@mui/material/Button";
import * as React from "react";
import {PagesMap} from "../pages/Pages";

export function HomeButton() {
    const home = PagesMap.get("home");
    return home ?
        <Button
            key={home.key}
            href={home.path}
            startIcon={<img src={"assets/Logo.png"}
                            width="25%"
                            height="auto"
                            alt={home.key}
                            loading="lazy"/>}>
        </Button>
        : <img src={"assets/Logo.png"}
               width="25%"
               height="auto"
               alt="Home"
               loading="lazy"/>
}