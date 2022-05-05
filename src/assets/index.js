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

import Pool from './pictures/pool/pool.jpg';
import BayView from './pictures/lodge/bay_view.jpeg';
import Salon from './pictures/lodge/salon.jpeg';
import Kitchen from './pictures/grape/kitchen.jpg';
import SalonInside from './pictures/lodge/salon_inside.jpeg';

import Lodge from './pictures/lodge/lodge.jpeg';
import GrapeHouse from './pictures/grape/grape_house.jpeg';
import Pear from './pictures/pear/pear.jpeg';
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
    grape: {
        kitchen: Kitchen,
        grapeHouse: GrapeHouse
    },
    lodge: {
        bayView: BayView,
        salon: Salon,
        salonInside: SalonInside,
        lodgeFrontView: Lodge
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
