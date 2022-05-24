const Moment = require('moment');
const MomentRange = require('moment-range');

export const START_OF_RESERVATION_WEEK = 6;
export const BACKEND_DATES_FORMAT = "YYYY-MM-DD";
export const POSITION = {lat: 45.139756772239814, lng: 0.9903618727530135, alt: 11};
export const ADDRESS = "86 A La Placette, 24210 Fossemagne";

export const MEDIA_QUERY_650_BREAKPOINT = '(max-width:650px)';
export const MEDIA_QUERY_500_BREAKPOINT = '(max-width:500px)';

const moment = MomentRange.extendMoment(Moment);
moment.locale("fr", {
    week: {
        dow: START_OF_RESERVATION_WEEK
    }
});
export default moment;