import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import './i18n';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {START_OF_RESERVATION_WEEK} from "./constants/constants";
import {createRoot} from "react-dom/client";

const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);
moment.locale("fr", {
    week: {
        dow: START_OF_RESERVATION_WEEK
    }
});
export default moment;

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);

root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
