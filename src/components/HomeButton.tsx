import Button from "@mui/material/Button";
import * as React from "react";
import {HOME} from "../pages/Pages";
import {DarkLogo, LightLogo} from "../assets/index"
import {Shade} from "../model/Shade";

export function HomeButton({logo, height}: { logo: Shade, height: string }) {
    let startIcon;
    switch (logo) {
        case Shade.Dark: {
            startIcon = <img src={DarkLogo}
                             width="auto"
                             height={height}
                             alt={HOME.key}
                             loading="lazy"/>;
            break;
        }
        case Shade.Light: {
            startIcon = <img src={LightLogo}
                             width="auto"
                             height={height}
                             alt={HOME.key}
                             loading="lazy"/>
            break;
        }
    }

    return <Button key={HOME.key}
                   href={HOME.path}
                   startIcon={startIcon}>
    </Button>;
}