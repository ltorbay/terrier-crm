import * as React from 'react';
import {MouseEvent} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {HomeButton} from "./HomeButton";
import {LocaleSelector} from "./LocaleSelector";
import {useTranslation} from "react-i18next";
import {Shade} from "../model/Shade";
import {useMediaQuery} from "@mui/material";
import {MEDIA_QUERY_650_BREAKPOINT} from "../constants/constants";
import Link from "next/link";

class Props {
    shade: Shade;
    displayHomeButton?: boolean;

    constructor(shade: Shade, displayHomeButton: boolean) {
        this.shade = shade;
        this.displayHomeButton = displayHomeButton;
    }
}

export const SITE_PAGES: { key: string, path: string }[] = [
    {key: 'pages.cottages.label', path: '/cottages'},
    {key: 'pages.gallery.label', path: '/gallery'},
    // {key: 'pages.explore.label', path: '/explore'},
    {key: 'pages.booking.label', path: '/booking'},
    {key: 'pages.contact.label', path: '/contact'}
]

const NavigationBar = ({shade, displayHomeButton = true}: Props) => {
    const color = shade === Shade.Light ? 'primary.light' : 'primary.dark';
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const smallScreen = useMediaQuery(MEDIA_QUERY_650_BREAKPOINT);
    const {t} = useTranslation();

    const handleOpenNavMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position='absolute' style={{background: 'transparent', boxShadow: 'none'}}>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    {displayHomeButton ? <HomeButton shade={shade} height={50}/> : <Box height='50px'/>}
                    <Box sx={{justifyContent: 'flex-end', flexGrow: 1, display: smallScreen ? 'flex' : 'none'}}>
                        <IconButton size='large'
                                    aria-label='menu'
                                    aria-controls='menu-appbar'
                                    aria-haspopup='true'
                                    onClick={handleOpenNavMenu}
                                    sx={{color: color}}>
                            <MenuIcon/>
                        </IconButton>
                        <Menu id='menu-appbar'
                              anchorEl={anchorElNav}
                              anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'right',
                              }}
                              keepMounted
                              transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right',
                              }}
                              open={Boolean(anchorElNav)}
                              onClose={handleCloseNavMenu}
                              sx={{
                                  display: {xs: 'block', md: 'none'},
                              }}>
                            {SITE_PAGES.map((page) => (
                                <Link href={page.path}
                                      color='primary.dark'
                                      key={page.key}
                                      style={{textDecoration: 'none', display: 'flex'}}>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a style={{textDecoration: 'none'}}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign='center'>{t(page.key)}</Typography>
                                        </MenuItem>
                                    </a>
                                </Link>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{justifyContent: 'flex-end', flexGrow: 1, display: smallScreen ? 'none' : 'flex'}}>
                        {SITE_PAGES.map((page) => (
                            <Link href={page.path}
                                  key={page.key}
                                  style={{textDecoration: 'none', color: color, display: 'flex'}}>
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a style={{textDecoration: 'none'}}>
                                    <Button onClick={handleCloseNavMenu}
                                            sx={{my: 2, color: color, display: 'block'}}>
                                        <Typography variant='body2'>{t(page.key)}</Typography>
                                    </Button>
                                </a>
                            </Link>
                        ))}
                    </Box>
                    <LocaleSelector/>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavigationBar;