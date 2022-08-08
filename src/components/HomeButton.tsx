import Button from "@mui/material/Button";
import * as React from "react";
import {Shade} from "../model/Shade";
import Link from "next/link";
import Image from "next/image";
import imageLoader from "../service/ImageLoader";
import {ICONS} from "../constants/constants";
import {useTranslation} from "react-i18next";

const HOME_PATH = '/';
const HOME_KEY = 'pages.home.label'

export function HomeButton({shade, height}: { shade: Shade, height: number }) {
    const {t} = useTranslation();
    const color = shade === Shade.Dark ? 'primary.dark' : 'primary.light';
    return (
        <Link href={HOME_PATH}
              key={HOME_KEY}
              style={{textDecoration: 'none', color: color}}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a style={{textDecoration: 'none'}}>
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
                                   loader={imageLoader}
                                   layout='fill'
                                   objectFit='contain'
                                   height={height}
                                   alt={t('common.images.domain.logo')}/>
                        }/>
            </a>
        </Link>
    );
}