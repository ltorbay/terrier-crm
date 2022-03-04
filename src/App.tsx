import React from 'react';
import './App.css';
import NavigationBar from "./components/NavigationBar";
import {Route, Routes} from "react-router-dom";
import {Pages} from "./pages/Pages";

function App() {
    return (
        <>
            <header>
                <NavigationBar/>
            </header>
            <body>
            <Routes>
                {Pages.map((page) => (
                    <Route key={page.key} path={page.path} element={page.element}/>
                ))}
            </Routes>
            </body>
        </>
    );
}

export default App;
