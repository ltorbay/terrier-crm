import Button from "@mui/material/Button";
import * as React from "react";
import {HOME} from "../pages/Pages";
import {DarkLogo, LightLogo} from "../assets/index"
import {Shade} from "../model/Shade";
import {NavLink} from "react-router-dom";

export function HomeButton({shade, height}: { shade: Shade, height: string }) {
    const color = shade === Shade.Dark ? 'primary.dark' : 'primary.light';
    return (
        <NavLink to={HOME.path}
                 key={HOME.key}
                 style={{textDecoration: 'none', color: color}}>
            <Button key={HOME.key}
                    href={HOME.path}
                    sx={{display: 'inline-block', my: 2, color: color, marginY: '0', paddingY: '0'}}
                    startIcon={
                        <img src={shade === Shade.Dark ? DarkLogo : LightLogo}
                             width="auto"
                             height={height}
                             alt={HOME.key}
                             loading="lazy"/>
                    }/>
        </NavLink>
    );
}