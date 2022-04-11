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
import {Pages} from "../pages/Pages";
import {Link} from "@mui/material";
import {LocaleSelector} from "./LocaleSelector";
import {useTranslation} from "react-i18next";

const NavigationBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const {t} = useTranslation();

    const handleOpenNavMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <HomeButton/>
                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <Menu id="menu-appbar"
                              anchorEl={anchorElNav}
                              anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'left',
                              }}
                              keepMounted
                              transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'left',
                              }}
                              open={Boolean(anchorElNav)}
                              onClose={handleCloseNavMenu}
                              sx={{
                                  display: {xs: 'block', md: 'none'},
                              }}>
                            {Pages.map((page) => (
                                <Link key={page.key} href={page.path}
                                      style={{textDecoration: 'none', color: 'black', display: 'flex'}}>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{t(page.key)}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                        {Pages.map((page) => (
                            <Button
                                key={page.key}
                                href={page.path}
                                onClick={handleCloseNavMenu}
                                sx={{my: 2, color: 'white', display: 'block'}}>
                                {t(page.key)}
                            </Button>
                        ))}
                    </Box>
                    <LocaleSelector/>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavigationBar;