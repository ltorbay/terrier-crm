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
import {NavLink} from "react-router-dom";
import {Shade} from "../model/Shade";
import {useMediaQuery} from "@mui/material";
import {MEDIA_QUERY_650_BREAKPOINT} from "../constants/constants";
import {SITE_PAGES} from "../pages/_app";

class Props {
    shade: Shade;
    displayHomeButton?: boolean;

    constructor(shade: Shade, displayHomeButton: boolean) {
        this.shade = shade;
        this.displayHomeButton = displayHomeButton;
    }
}

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
                    {displayHomeButton ? <HomeButton shade={shade} height='50px'/> : <Box height='50px'/>}
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
                                <NavLink to={page.path}
                                         color='primary.dark'
                                         key={page.key}
                                         style={{textDecoration: 'none', display: 'flex'}}>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign='center'>{t(page.key)}</Typography>
                                    </MenuItem>
                                </NavLink>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{justifyContent: 'flex-end', flexGrow: 1, display: smallScreen ? 'none' : 'flex'}}>
                        {SITE_PAGES.map((page) => (
                            <NavLink to={page.path}
                                     key={page.key}
                                     style={{textDecoration: 'none', color: color, display: 'flex'}}>
                                <Button onClick={handleCloseNavMenu}
                                        sx={{my: 2, color: color, display: 'block'}}>
                                    <Typography variant='body2'>{t(page.key)}</Typography>
                                </Button>
                            </NavLink>
                        ))}
                    </Box>
                    <LocaleSelector/>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavigationBar;