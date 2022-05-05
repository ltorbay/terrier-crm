import React from 'react';
import './App.css';
import {NavLink, Route, Routes} from "react-router-dom";
import {HOME, PAGES} from "./pages/Pages";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import Poppins from './fonts/Poppins-Regular.woff2';
import Minion from './fonts/MinionPro-Regular.woff2';
import {createTheme, responsiveFontSizes, ThemeProvider} from "@mui/material/styles";
import {Box, CssBaseline, Grid, IconButton, useMediaQuery} from "@mui/material";
import {makeStyles} from "@mui/styles";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import {HomeButton} from "./components/HomeButton";
import {Shade} from "./model/Shade";

const minion = {
    fontFamily: 'MinionPro',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF UTF-8",
    src: `
        local('MinionPro'),
        local('MinionPro-Regular'),
        url(${Minion}) format('woff2')
    `,
};

const poppins = {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF UTF-8",
    src: `
        local('Poppins'),
        local('Poppins-Regular'),
        url(${Poppins}) format('woff2')
    `,
};

const theme = responsiveFontSizes(createTheme({
    palette: {
        primary: {
            main: "#F1EDE6",
            light: "#F6F5F5",
            dark: "#211E1E",
            contrastText: "#DBCDB5"
        },
        secondary: {
            main: "#E4DBD2"
        }
    },
    typography: {
        fontFamily: [
            'Poppins',
            'MinionPro'
        ].join(','),
    },
    components: {
        MuiTypography: {
            defaultProps: {
                color: 'primary.dark'
            },
            styleOverrides: {
                h1: {
                    fontFamily: 'MinionPro'
                },
                h2: {
                    fontFamily: 'MinionPro'
                },
                h3: {
                    fontFamily: 'MinionPro'
                },
                h4: {
                    fontFamily: 'MinionPro'
                },
                subtitle2: {
                    fontFamily: 'MinionPro'
                },
                overline: {
                    fontFamily: 'MinionPro'
                }
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                '@font-face': [minion],
                fallbacks: [
                    {'@font-face': [poppins]},
                ],
            },
        },
    },
}));

const useStyles = makeStyles(() => ({
    footer: {
        textAlign: 'center',
        paddingBottom: '4vh',
        paddingTop: '4vh',
        marginTop: '4vh'
    }
}));

function App() {
    const classes = useStyles();
    const {t} = useTranslation();
    const smallScreen = useMediaQuery('(max-width:650px)');
    
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Box sx={{backgroundColor: 'primary.light'}}>
                    <Routes>
                        {PAGES.concat(HOME).map((page) => (
                            <Route key={page.key} path={page.path} element={page.element}/>
                        ))}
                    </Routes>
                    <Box sx={{backgroundColor: 'primary.contrastText'}} className={classes.footer}>
                        <Grid container textAlign='center'>
                            <Grid item xs={12}>
                                <HomeButton shade={Shade.Dark} height='55px'/>
                            </Grid>
                            <Grid item xs={12}>
                                <IconButton sx={{outline: 'solid 1px', margin: '2vw'}} aria-label='instagram'>
                                    <InstagramIcon fontSize='small'/>
                                </IconButton>
                                <IconButton sx={{outline: 'solid 1px', margin: '2vw'}} aria-label='facebook'>
                                    <FacebookIcon fontSize='small'/>
                                </IconButton>
                                <IconButton sx={{outline: 'solid 1px', margin: '2vw'}} aria-label='pinterest'>
                                    <PinterestIcon fontSize='small'/>
                                </IconButton>
                            </Grid>
                            <Grid item xs={smallScreen ? 12 : 4} marginTop='2vh'>
                                <NavLink to={HOME.path}
                                         key='legal-notice'
                                         style={{textDecoration: 'none'}}>
                                    <Typography variant='body2'
                                                color='primary.dark'>{t('components.footer.legal-notice')}</Typography>
                                </NavLink>
                            </Grid>
                            <Grid item xs={smallScreen ? 12 : 4} marginTop='2vh'>
                                <NavLink to={HOME.path}
                                         key='cookies'
                                         style={{textDecoration: 'none'}}>
                                    <Typography variant='body2'
                                                color='primary.dark'>{t('components.footer.cookies')}</Typography>
                                </NavLink>
                            </Grid>
                            <Grid item xs={smallScreen ? 12 : 4} marginTop='2vh'>
                                <NavLink to={HOME.path}
                                         key='copyright'
                                         style={{textDecoration: 'none'}}>
                                    <Typography variant='body2'
                                                color='primary.dark'>{t('components.footer.copyright')}</Typography>
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
