import Button from "@mui/material/Button";
import * as React from "react";
import {PagesMap} from "../pages/Pages";
import {Logo} from "../assets/index"

export function HomeButton() {
    const home = PagesMap.get("home");
    return <Button key={home?.key || "home"}
                   href={home?.path || undefined}
                   startIcon={<img src={Logo}
                                   width="100vw"
                                   height="auto"
                                   alt={home?.key || "home"}
                                   loading="lazy"/>}>
    </Button>;
}