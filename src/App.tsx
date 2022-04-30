import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {PAGES} from "./pages/Pages";
import {createTheme, responsiveFontSizes, ThemeProvider} from '@mui/material/styles';
import {Provider} from "react-redux";
import {store} from "./redux/store";

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
    }
}));

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Routes>
                    {PAGES.map((page) => (
                        <Route key={page.key} path={page.path} element={page.element}/>
                    ))}
                </Routes>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
