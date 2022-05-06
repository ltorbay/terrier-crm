import DarkLogo from './icons/dark/logo.png';
import DarkDoor from './icons/dark/door.png';
import DarkFlower from './icons/dark/flower.png';
import DarkKeys from './icons/dark/keys.png';
import DarkStump from './icons/dark/stump.png';

import LightLogo from './icons/light/logo.png';
import LightDoor from './icons/light/door.png';
import LightFlower from './icons/light/flower.png';
import LightKeys from './icons/light/keys.png';
import LightStump from './icons/light/stump.png';

import AerialView from './pictures/domain/aerial_view.jpeg';
import AerialView1 from './pictures/domain/aerial_view_1.jpeg';
import Arrival from './pictures/domain/arrival.jpeg';
import Entrance from './pictures/domain/entrance.jpeg';
import FrontTerrace from './pictures/domain/front_terrace.jpeg';
import Terrace from './pictures/domain/terrace.jpeg';
import TerraceView from './pictures/domain/terrace_view.jpeg';
import Well from './pictures/domain/well.jpeg';
import Yard from './pictures/domain/yard.jpeg';

import Backside from './pictures/lodge/backside.jpeg';
import BayView from './pictures/lodge/bay_view.jpeg';
import DinnerTableSunny from './pictures/lodge/dinner_table_sunny.jpeg';
import FirstMezzanine from './pictures/lodge/first_mezzanine.jpeg';
import SecondMezzanine from './pictures/lodge/second_mezzanine.jpeg';
import ViewFromMezzanine from './pictures/lodge/view_from_mezzanine.jpg';
import Lodge from './pictures/lodge/lodge.jpeg';
import Salon from './pictures/lodge/salon.jpeg';
import SalonInside from './pictures/lodge/salon_inside.jpeg';
import ViewedFromTerrace from './pictures/lodge/viewed_from_terrace.jpeg';

import GrapeBackside from './pictures/grape/backside.jpeg';
import Fireplace from './pictures/grape/fireplace.jpeg';
import GrapeBathroom from './pictures/grape/grape_bathroom1.jpeg';
import GrapeHouse from './pictures/grape/grape_house.jpeg';
import GrapeSalon from './pictures/grape/grape_salon.jpeg';
import GrapeSalon2 from './pictures/grape/grape_salon2.jpeg';
import GrapeTallBedroom from './pictures/grape/grape_tall_bedroom.jpeg';
import GrapeTerrace from './pictures/grape/grape_terrace.jpg';
import Grapes from './pictures/grape/grapes.jpg';
import Kitchen from './pictures/grape/kitchen.jpg';
import SmallBedroom from './pictures/grape/small_bedroom.jpeg';

import CoveredTerrace from './pictures/pear/covered_terrace.jpg';
import PearBackside from './pictures/pear/pear_backside.jpeg';
import PearBathroom1 from './pictures/pear/pear_bathroom1.jpeg';
import PearDinnerTable from './pictures/pear/pear_dinner_table.jpeg';
import PearFrontSide from './pictures/pear/pear_front_side.jpeg';
import PearKitchen from './pictures/pear/pear_kitchen.jpeg';
import PearKitchen2 from './pictures/pear/pear_kitchen2.jpeg';
import PearSalon from './pictures/pear/pear_salon.jpeg';
import PearSmallBedroom from './pictures/pear/pear_small_bedroom.jpg';
import PearSmallDoubleBedroom from './pictures/pear/pear_small_double_bedroom.jpg';
import PearTallBedroom from './pictures/pear/pear_tall_bedroom.jpg';
import Pears from './pictures/pear/pears.jpeg';

import Pool from './pictures/pool/pool.jpg';
import PoolLarge from './pictures/pool/pool_large.jpeg';
import PoolTopDown from './pictures/pool/pool_top_down.jpeg';
import PoolView from './pictures/pool/pool_view.jpg';

export const PICTURES = {
    domain: {
        aerialView: AerialView,
        aerialView1: AerialView1,
        arrival: Arrival,
        entrance: Entrance,
        frontTerrace: FrontTerrace,
        terrace: Terrace,
        terraceView: TerraceView,
        well: Well,
        yard: Yard,
    },
    lodge: {
        backside: Backside,
        bayView: BayView,
        dinnerTableSunny: DinnerTableSunny,
        firstMezzanine: FirstMezzanine,
        secondMezzanine: SecondMezzanine,
        viewFromMezzanine: ViewFromMezzanine,
        lodgeFrontView: Lodge,
        salon: Salon,
        salonInside: SalonInside,
        viewedFromTerrace: ViewedFromTerrace
    },
    pear: {
        coveredTerrace: CoveredTerrace,
        backside: PearBackside,
        bathroom: PearBathroom1,
        dinnerTable: PearDinnerTable,
        frontSide: PearFrontSide,
        kitchen: PearKitchen,
        kitchen2: PearKitchen2,
        salon: PearSalon,
        smallBedroom: PearSmallBedroom,
        smallDoubleBedroom: PearSmallDoubleBedroom,
        tallBedroom: PearTallBedroom,
        pears: Pears,
    },
    grape: {
        backside: GrapeBackside,
        fireplace: Fireplace,
        bathroom: GrapeBathroom,
        house: GrapeHouse,
        salon: GrapeSalon,
        salon2: GrapeSalon2,
        tallBedroom: GrapeTallBedroom,
        terrace: GrapeTerrace,
        grapes: Grapes,
        kitchen: Kitchen,
        smallBedroom: SmallBedroom,
    },
    pool: {
        pool: Pool,
        large: PoolLarge,
        topDown: PoolTopDown,
        view: PoolView
    }
}

export const ICONS = {
    dark: {
        logo: DarkLogo,
        icons: {
            door: DarkDoor,
            flower: DarkFlower,
            keys: DarkKeys,
            stump: DarkStump
        }
    },
    light: {
        logo: LightLogo,
        icons: {
            door: LightDoor,
            flower: LightFlower,
            keys: LightKeys,
            stump: LightStump
        }
    }
}
