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
import DinnerTable from './pictures/lodge/dinner_table.jpeg';
import DinnerTableSunny from './pictures/lodge/dinner_table_sunny.jpeg';
import FirstMezzanine from './pictures/lodge/first_mezzanine.jpeg';
import SecondMezzanine from './pictures/lodge/second_mezzanine.jpeg';
import ViewFromMezzanine from './pictures/lodge/view_from_mezzanine.jpg';
import Lodge from './pictures/lodge/lodge.jpeg';
import Salon from './pictures/lodge/salon.jpeg';
import SalonFront from './pictures/lodge/salon_front.jpeg';
import SalonInside from './pictures/lodge/salon_inside.jpeg';
import ViewedFromTerrace from './pictures/lodge/viewed_from_terrace.jpeg';

import Kitchen from './pictures/grape/kitchen.jpg';
import GrapeHouse from './pictures/grape/grape_house.jpeg';

import Pear from './pictures/pear/pear.jpeg';

import Pool from './pictures/pool/pool.jpg';
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
        // FIXME remove unused ones
        // dinnerTable: DinnerTable,
        dinnerTableSunny: DinnerTableSunny,
        firstMezzanine: FirstMezzanine,
        secondMezzanine: SecondMezzanine,
        viewFromMezzanine: ViewFromMezzanine,
        lodgeFrontView: Lodge,
        salon: Salon,
        // salonFront: SalonFront,
        salonInside: SalonInside,
        viewedFromTerrace: ViewedFromTerrace
    },
    grape: {
        kitchen: Kitchen,
        grapeHouse: GrapeHouse
    },
    pear: {
        pearHouseTerrace: Pear
    },
    pool: {
        pool: Pool,
        poolView: PoolView
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
