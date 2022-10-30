const Moment = require('moment');
const MomentRange = require('moment-range');

export const START_OF_RESERVATION_WEEK = 6;
export const BACKEND_DATES_FORMAT = "YYYY-MM-DD";
export const POSITION = {lat: 45.139756772239814, lng: 0.9903618727530135, alt: 11};

export const MEDIA_QUERY_1000_BREAKPOINT = '(max-width:1000px)';
export const MEDIA_QUERY_650_BREAKPOINT = '(max-width:650px)';
export const MEDIA_QUERY_550_BREAKPOINT = '(max-width:550px)';
export const MEDIA_QUERY_450_BREAKPOINT = '(max-width:450px)';

const moment = MomentRange.extendMoment(Moment);
moment.locale("fr", {
    week: {
        dow: START_OF_RESERVATION_WEEK
    }
});
export default moment;

export const PICTURES = {
    domain: {
        aerialView: 'pictures/domain/aerial_view.jpeg',
        aerialView1: 'pictures/domain/aerial_view_1.jpeg',
        arrival: 'pictures/domain/arrival.jpeg',
        entrance: 'pictures/domain/entrance.jpeg',
        frontTerrace: 'pictures/domain/front_terrace.jpeg',
        terrace: 'pictures/domain/terrace.jpeg',
        terraceView: 'pictures/domain/terrace_view.jpeg',
        well: 'pictures/domain/well.jpeg',
        yard: 'pictures/domain/yard.jpeg',
    },
    lodge: {
        backside: 'pictures/lodge/backside.jpeg',
        bayView: 'pictures/lodge/bay_view.jpeg',
        dinnerTableSunny: 'pictures/lodge/dinner_table_sunny.jpeg',
        firstMezzanine: 'pictures/lodge/first_mezzanine.jpeg',
        secondMezzanine: 'pictures/lodge/second_mezzanine.jpeg',
        viewFromMezzanine: 'pictures/lodge/view_from_mezzanine.jpg',
        lodgeFrontView: 'pictures/lodge/lodge.jpeg',
        salon: 'pictures/lodge/salon.jpeg',
        salonInside: 'pictures/lodge/salon_inside.jpeg',
        viewedFromTerrace: 'pictures/lodge/viewed_from_terrace.jpeg',
    },
    pear: {
        coveredTerrace: 'pictures/pear/covered_terrace.jpg',
        backside: 'pictures/pear/pear_backside.jpeg',
        bathroom: 'pictures/pear/pear_bathroom1.jpeg',
        dinnerTable: 'pictures/pear/pear_dinner_table.jpeg',
        frontSide: 'pictures/pear/pear_front_side.jpeg',
        kitchen: 'pictures/pear/pear_kitchen.jpeg',
        kitchen2: 'pictures/pear/pear_kitchen2.jpeg',
        salon: 'pictures/pear/pear_salon.jpeg',
        smallBedroom: 'pictures/pear/pear_small_bedroom.jpg',
        smallDoubleBedroom: 'pictures/pear/pear_small_double_bedroom.jpg',
        tallBedroom: 'pictures/pear/pear_tall_bedroom.jpg',
        pears: 'pictures/pear/pears.jpeg',
    },
    grape: {
        backside: 'pictures/grape/backside.jpeg',
        fireplace: 'pictures/grape/fireplace.jpeg',
        bathroom: 'pictures/grape/grape_bathroom1.jpeg',
        house: 'pictures/grape/grape_house.jpeg',
        salon: 'pictures/grape/grape_salon.jpeg',
        salon2: 'pictures/grape/grape_salon2.jpeg',
        tallBedroom: 'pictures/grape/grape_tall_bedroom.jpeg',
        terrace: 'pictures/grape/grape_terrace.jpg',
        grape: 'pictures/grape/grapes.jpg',
        kitchen: 'pictures/grape/kitchen.jpg',
        smallBedroom: 'pictures/grape/small_bedroom.jpeg',
    },
    pool: {
        pool: 'pictures/pool/pool.jpg',
        large: 'pictures/pool/pool_large.jpeg',
        pool_square: 'pictures/pool/pool_square.jpeg',
        topDown: 'pictures/pool/pool_top_down.jpeg',
        view: 'pictures/pool/pool_view.jpg'
    }
}
