import React from 'react';
import reportWebVitals from '../utils/reportWebVitals';
import '../utils/i18n';
import {createTheme, responsiveFontSizes, ThemeProvider} from "@mui/material/styles";
import {MINION, POPPINS} from "../constants/fonts";
import {useTranslation} from "react-i18next";
import {Box, CssBaseline, GlobalStyles, Grid, IconButton, useMediaQuery} from "@mui/material";
import {MEDIA_QUERY_890_BREAKPOINT} from "../constants/constants";
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

import '../../public/styles.css';
import 'leaflet/dist/leaflet.css';
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css';
import {MySnackBar} from "../components/MySnackBar";
import Head from "next/head";

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

const classes = {
    footer: {
        textAlign: 'center',
        paddingBottom: '4vh',
        paddingTop: '4vh',
        marginTop: '4vh',
        backgroundColor: 'primary.contrastText'
    }
};

function App({Component, pageProps}: { Component: React.Component, pageProps: AppProps }) {
    const {t} = useTranslation();
    const smallScreen = useMediaQuery(MEDIA_QUERY_890_BREAKPOINT);

    return (
        <Provider store={store}>
            <Head>
                <title>Le Terrier</title>
                <link rel="stylesheet" href="styles.css"/>
                <meta property="og:title" content="Le Terrier - Gîte en Dordogne"/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://www.leterrier-gites.fr/"/>

                <meta property="og:image" content="https://leterrier-gites.fr/img1200/pictures/pool/pool.jpg"/>
                <meta property="og:image:secure_url"
                      content="https://leterrier-gites.fr/img1200/pictures/pool/pool.jpg"/>
                <meta property="og:image:width" content="1200"/>
                <meta property="og:image:height" content="799"/>

                <meta property="og:image" content="https://leterrier-gites.fr/img1200/pictures/pool/pool.jpg"/>
                <meta property="og:image:secure_url"
                      content="https://leterrier-gites.fr/img400/pictures/pool/pool_square.jpg"/>
                <meta property="og:image:width" content="400"/>
                <meta property="og:image:height" content="400"/>

                <meta property="og:description"
                      content="Bienvenue chez nous ! Notre gîte pouvant accueillir 11 à 15 personnes vous accueille dans le Périgord noir pour des vacances uniques au coeur de la nature."/>
                <meta property="og:locale" content="fr_FR"/>
                <meta property="og:locale:alternate" content="en_GB"/>
                <meta property="description"
                      content="Bienvenue chez nous ! Notre gîte pouvant accueillir 11 à 15 personnes vous accueille dans le Périgord noir pour des vacances uniques au coeur de la nature."/>
                <meta property="robots" content="index,follow"/>
            </Head>
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
                    <Box sx={classes.footer}>
                        <Grid container textAlign='center'>
                            <Grid item xs={12}>
                                <HomeButton shade={Shade.Dark} height={55}/>
                            </Grid>
                            <Grid item xs={12}>
                                <a target="_blank" rel="noreferrer noopener"
                                   href={`https://instagram.com/leterrier.gite`}>
                                    <IconButton sx={{border: 'solid 1px', borderRadius: '100px', margin: '2vw'}}
                                                aria-label='instagram'>
                                        <InstagramIcon fontSize='small'/>
                                    </IconButton>
                                </a>
                                <a target="_blank" rel="noreferrer noopener"
                                   href={`https://www.facebook.com/leterrier.gite`}>
                                    <IconButton sx={{border: 'solid 1px', borderRadius: '100px', margin: '2vw'}} aria-label='facebook'>
                                        <FacebookIcon fontSize='small'/>
                                    </IconButton>
                                </a>
                                <a target="_blank" rel="noreferrer noopener"
                                   href={`https://pinterest.fr/leterriergites/`}>
                                    <IconButton sx={{border: 'solid 1px', borderRadius: '100px', margin: '2vw'}} aria-label='pinterest'>
                                        <PinterestIcon fontSize='small'/>
                                    </IconButton>
                                </a>
                            </Grid>
                            <Grid item xs={smallScreen ? 12 : 3} marginTop='2vh'>
                                <Link href='/termsAndConditions'
                                      key='terms-and-conditions'
                                      style={{textDecoration: 'none'}}>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a style={{textDecoration: 'none'}}>
                                        <Typography sx={{cursor: 'pointer'}}
                                                    variant='body2'
                                                    color='primary.dark'>{t('components.footer.terms-and-conditions')}</Typography>
                                    </a>
                                </Link>
                            </Grid>
                            <Grid item xs={smallScreen ? 12 : 3} marginTop='2vh'>
                                <Link href='/privacyPolicy'
                                      key='privacy-policy'
                                      style={{textDecoration: 'none'}}>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a style={{textDecoration: 'none'}}>
                                        <Typography sx={{cursor: 'pointer'}}
                                                    variant='body2'
                                                    color='primary.dark'>{t('components.footer.privacy-policy')}</Typography>
                                    </a>
                                </Link>
                            </Grid>
                            <Grid item xs={smallScreen ? 12 : 3} marginTop='2vh'>
                                <Link href='https://www.hbz-production.com/'
                                      key='photo-credit'
                                      style={{textDecoration: 'none'}}>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a style={{textDecoration: 'none'}}>
                                        <Typography variant='body2'
                                                    color='primary.dark'>{t('components.footer.photos-credit')}</Typography>
                                    </a>
                                </Link>
                            </Grid>
                            <Grid item xs={smallScreen ? 12 : 3} marginTop='2vh'>
                                <Link href='/'
                                      key='copyright'
                                      style={{textDecoration: 'none'}}>
                                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                    <a style={{textDecoration: 'none'}}>
                                        <Typography variant='body2'
                                                    color='primary.dark'>{t('components.footer.copyright')}</Typography>
                                    </a>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </ThemeProvider>
        </Provider>
    )
}

export async function getStaticProps(context: any) {
    return {
        props: {}, // will be passed to the page component as props
    }
}

export default App;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
