import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import './i18n';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {START_OF_RESERVATION_WEEK} from "./const/constants";
const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);
// TODO handle locale correctly
moment.locale("fr", {
    week: {
        dow: START_OF_RESERVATION_WEEK
    }
});
export default moment;

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
