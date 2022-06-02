import React, {ReactNode} from 'react';
import reportWebVitals from '../utils/reportWebVitals';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import '../utils/i18n';
import '../styles.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {createTheme, responsiveFontSizes, ThemeProvider} from "@mui/material/styles";
import {MINION, POPPINS} from "../constants/fonts";
import {makeStyles} from "@mui/styles";
import {useTranslation} from "react-i18next";
import {Box, CssBaseline, GlobalStyles, Grid, IconButton, useMediaQuery} from "@mui/material";
import {MEDIA_QUERY_650_BREAKPOINT} from "../constants/constants";
import {store} from "../redux/store";
import {HomeButton} from "../components/HomeButton";
import {Shade} from "../model/Shade";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import Typography from "@mui/material/Typography";
import {Provider} from "react-redux";
import dynamic from "next/dynamic";
const Home = dynamic<any>(
    () => import("../components/pages/Home"),
    {ssr: false}
);
const Cottages = dynamic<any>(
    () => import("../components/pages/Cottages"),
    {ssr: false}
);
const Gallery = dynamic<any>(
    () => import("../components/pages/Gallery"),
    {ssr: false}
);
const Booking = dynamic<any>(
    () => import("../components/pages/Booking"),
    {ssr: false}
);
const Contact = dynamic<any>(
    () => import("../components/pages/Contact"),
    {ssr: false}
);

class Page {
    key: string;
    path: string;
    element: ReactNode;

    constructor(key: string, path: string, element: ReactNode) {
        this.key = key;
        this.path = path;
        this.element = element;
    }
}

export const HOME_PAGE = new Page("pages.home.label", "/", <Home/>)

export const SITE_PAGES = [
    new Page("pages.cottages.label", "/cottages", <Cottages/>),
    new Page("pages.gallery.label", "/gallery", <Gallery/>),
    // new Page("pages.explore.label", "/explore", <Explore/>),
    new Page("pages.booking.label", "/booking", <Booking/>),
    new Page("pages.contact.label", "/contact", <Contact/>),
]

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
                '@font-face': [MINION],
                fallbacks: [
                    {'@font-face': [POPPINS]},
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
    const smallScreen = useMediaQuery(MEDIA_QUERY_650_BREAKPOINT);

    return (
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <GlobalStyles styles={{
                        ':root': {
                            '--color-primary': theme.palette.primary.main,
                            '--color-secondary': theme.palette.secondary.main,
                            '--color-contrast': theme.palette.primary.contrastText,
                            '--color-light': theme.palette.primary.light,
                            '--color-dark': theme.palette.primary.dark
                        },
                    }}/>
                    <Box sx={{backgroundColor: 'primary.light'}}>
                        <Routes>
                            {SITE_PAGES.concat(HOME_PAGE).map((page) => (
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
                                    <NavLink to={HOME_PAGE.path}
                                             key='legal-notice'
                                             style={{textDecoration: 'none'}}>
                                        <Typography variant='body2'
                                                    color='primary.dark'>{t('components.footer.legal-notice')}</Typography>
                                    </NavLink>
                                </Grid>
                                <Grid item xs={smallScreen ? 12 : 4} marginTop='2vh'>
                                    <NavLink to={HOME_PAGE.path}
                                             key='cookies'
                                             style={{textDecoration: 'none'}}>
                                        <Typography variant='body2'
                                                    color='primary.dark'>{t('components.footer.cookies')}</Typography>
                                    </NavLink>
                                </Grid>
                                <Grid item xs={smallScreen ? 12 : 4} marginTop='2vh'>
                                    <NavLink to={HOME_PAGE.path}
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
        </BrowserRouter>
    )
}

export default App

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
