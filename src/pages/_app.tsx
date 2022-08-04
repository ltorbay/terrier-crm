import React, {ReactElement, useEffect, useState} from 'react';
import reportWebVitals from '../utils/reportWebVitals';
import '../utils/i18n';
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
import {AppProps} from "next/dist/pages/_app";
import Link from "next/link";

import '../styles.css';
import 'leaflet/dist/leaflet.css';
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css';
import {MySnackBar} from "../components/MySnackBar";
import DirectionsIcon from "@mui/icons-material/Directions";

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

function SafeHydrate({children}: { children: ReactElement }) {
    const [showing, setShowing] = useState(false);

    useEffect(() => {
        setShowing(true);
    }, []);

    if (!showing) {
        return null;
    }

    if (typeof window === 'undefined') {
        return <></>;
    } else {
        return (
            children
        );
    }
}

export default function App({Component, pageProps}: { Component: React.Component, pageProps: AppProps }) {
    const classes = useStyles();
    const {t} = useTranslation();
    const smallScreen = useMediaQuery(MEDIA_QUERY_650_BREAKPOINT);

    return (
        <SafeHydrate>
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
                    <Box sx={{backgroundColor: 'primary.light', width: '100vw'}}>
                        {/*@ts-ignore*/}
                        <Component {...pageProps} />
                        <MySnackBar/>
                        <Box sx={{backgroundColor: 'primary.contrastText'}} className={classes.footer}>
                            <Grid container textAlign='center'>
                                <Grid item xs={12}>
                                    <HomeButton shade={Shade.Dark} height={55}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <a target="_blank" rel="noreferrer"
                                       href={`https://instagram.com/leterrier.gites`}>
                                        <IconButton sx={{outline: 'solid 1px', margin: '2vw'}} aria-label='instagram'>
                                            <InstagramIcon fontSize='small'/>
                                        </IconButton>
                                    </a>
                                    <a target="_blank" rel="noreferrer"
                                       href={`https://www.facebook.com/leterrier.gites`}>
                                        <IconButton sx={{outline: 'solid 1px', margin: '2vw'}} aria-label='facebook'>
                                            <FacebookIcon fontSize='small'/>
                                        </IconButton>
                                    </a>
                                    <a target="_blank" rel="noreferrer"
                                       href={`https://pinterest.fr/leterriergites/`}>
                                        <IconButton sx={{outline: 'solid 1px', margin: '2vw'}} aria-label='pinterest'>
                                            <PinterestIcon fontSize='small'/>
                                        </IconButton>
                                    </a>
                                </Grid>
                                <Grid item xs={smallScreen ? 12 : 4} marginTop='2vh'>
                                    <Link href='/termsAndConditions'
                                          key='terms-and-conditions'
                                          style={{textDecoration: 'none'}}>
                                        <Typography sx={{cursor: 'pointer'}}
                                                    variant='body2'
                                                    color='primary.dark'>{t('components.footer.terms-and-conditions')}</Typography>
                                    </Link>
                                </Grid>
                                <Grid item xs={smallScreen ? 12 : 4} marginTop='2vh'>
                                    <Link href='/privacyPolicy'
                                          key='privacy-policy'
                                          style={{textDecoration: 'none'}}>
                                        <Typography sx={{cursor: 'pointer'}}
                                                    variant='body2'
                                                    color='primary.dark'>{t('components.footer.privacy-policy')}</Typography>
                                    </Link>
                                </Grid>
                                <Grid item xs={smallScreen ? 12 : 4} marginTop='2vh'>
                                    <Link href='/'
                                          key='copyright'
                                          style={{textDecoration: 'none'}}>
                                        <Typography variant='body2'
                                                    color='primary.dark'>{t('components.footer.copyright')}</Typography>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </ThemeProvider>
            </Provider>
        </SafeHydrate>
    )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
