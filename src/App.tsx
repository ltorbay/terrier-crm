import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {HOME, PAGES} from "./pages/Pages";
import {Provider} from "react-redux";
import {store} from "./redux/store";
import Poppins from './fonts/Poppins-Regular.woff2';
import Minion from './fonts/MinionPro-Regular.woff2';
import {createTheme, responsiveFontSizes, ThemeProvider} from "@mui/material/styles";
import {Box, CssBaseline} from "@mui/material";

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

function App() {
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
                </Box>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
