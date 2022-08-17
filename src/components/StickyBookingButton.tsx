import * as React from "react";
import {useTranslation} from "react-i18next";
import {Fade, Tooltip, useMediaQuery, useScrollTrigger} from "@mui/material";
import Box from "@mui/material/Box";
import Link from "next/link";
import IconButton from "@mui/material/IconButton";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import {MEDIA_QUERY_650_BREAKPOINT} from "../constants/constants";

export function StickyBookingButton() {
    const {t} = useTranslation();
    const smallScreen = useMediaQuery(MEDIA_QUERY_650_BREAKPOINT);

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    return (
        <Fade in={trigger}>
            <Box role="presentation" sx={{zIndex: '999', position: 'fixed', top: '1vh', right: '1vh'}}>
                <Link href='/booking'
                      key='pages.booking.label'
                      style={{textDecoration: 'none', display: 'flex'}}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a style={{textDecoration: 'none'}}>
                        <Tooltip placement='left' title={t('pages.booking.label')}>
                            <IconButton size={smallScreen ? 'medium': 'large'}
                                        sx={{
                                            border: 'solid 2px',
                                            borderRadius: '100px',
                                            margin: '2vw',
                                            backgroundColor: 'primary.light',
                                            ":hover": {
                                                backgroundColor: 'primary.light'
                                            },
                                        }}
                                        aria-label='booking'>
                                <CalendarMonthOutlinedIcon fontSize={smallScreen ? 'medium': 'large'}/>
                            </IconButton>
                        </Tooltip>
                    </a>
                </Link>
            </Box>
        </Fade>
    );
}