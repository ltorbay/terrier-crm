import Button from "@mui/material/Button";
import * as React from "react";
import {Shade} from "../model/Shade";
import {ICONS} from "../../public/assets";
import {HOME_PAGE} from "../pages/_app";
import Link from "next/link";

export function HomeButton({shade, height}: { shade: Shade, height: string }) {
    const color = shade === Shade.Dark ? 'primary.dark' : 'primary.light';
    return (
        <Link href={HOME_PAGE.path}
              key={HOME_PAGE.key}
              style={{textDecoration: 'none', color: color}}>
            <Button key={HOME_PAGE.key}
                    sx={{display: 'inline-block', my: 2, color: color, marginY: '0', paddingY: '0'}}
                    startIcon={
                        <img src={shade === Shade.Dark ? ICONS.dark.logo : ICONS.light.logo}
                             width="auto"
                             height={height}
                             alt={HOME_PAGE.key}
                             loading="lazy"/>
                    }/>
        </Link>
    );
}