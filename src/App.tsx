import React from 'react';
import './App.css';
import NavigationBar from "./components/NavigationBar";
import {Route, Routes} from "react-router-dom";
import {Pages} from "./pages/Pages";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {brown, green} from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: brown[200],
            light: brown[100],
            dark: brown[900],
            contrastText: brown.A400
        },
        secondary: {
            main: green[900]
        }
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <header>
                <NavigationBar/>
            </header>
            <Routes>
                {Pages.map((page) => (
                    <Route key={page.key} path={page.path} element={page.element}/>
                ))}
            </Routes>
        </ThemeProvider>
    );
}

export default App;
