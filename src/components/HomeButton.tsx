import Button from "@mui/material/Button";
import * as React from "react";
import {Shade} from "../model/Shade";
import {ICONS} from "../../public/assets";
import Link from "next/link";
import Image from "next/image";

const HOME_PATH = '/';
const HOME_KEY = 'pages.home.label'

export function HomeButton({shade, height}: { shade: Shade, height: number }) {
    const color = shade === Shade.Dark ? 'primary.dark' : 'primary.light';
    return (
        <Link href={HOME_PATH}
              key={HOME_KEY}
              style={{textDecoration: 'none', color: color}}>
            <Button key={HOME_KEY}
                    sx={{
                        display: 'inline-block',
                        height: height,
                        width: 2 * height,
                        my: 2,
                        color: color,
                        marginY: '0',
                        paddingY: '0'
                    }}
                    startIcon={
                        <Image src={shade === Shade.Dark ? ICONS.dark.logo : ICONS.light.logo}
                               layout='fill'
                               objectFit='contain'
                               height={height}
                               alt={HOME_KEY}/>
                    }/>
        </Link>
    );
}