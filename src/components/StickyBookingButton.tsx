import {MouseEventHandler} from "react";
import {useTranslation} from "react-i18next";
import {Fade, Tooltip, useScrollTrigger} from "@mui/material";
import Box from "@mui/material/Box";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import * as React from "react";

export function StickyBookingButton() {
    const {t} = useTranslation();
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    return (
        <Fade in={trigger}>
            <Box role="presentation" sx={{position: 'fixed', top: '1vh', right: '1vh'}}>
                <Link href='/booking'
                      key='pages.booking.label'
                      style={{textDecoration: 'none', display: 'flex'}}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a style={{textDecoration: 'none'}}>
                        <Tooltip placement='left' title={t('pages.booking.label')}>
                            <IconButton size='large'
                                        // onClick={onClick}
                                        sx={{
                                            boxShadow: '-2px 2px 3px ',
                                            outline: 'solid 2px',
                                            margin: '2vw',
                                            backgroundColor: 'primary.light',
                                            ":hover": {
                                                backgroundColor: 'primary.light'
                                            },
                                        }}
                                        aria-label='booking'>
                                <CalendarMonthOutlinedIcon fontSize='large'/>
                            </IconButton>
                        </Tooltip>
                    </a>
                </Link>
            </Box>
        </Fade>
    );
}