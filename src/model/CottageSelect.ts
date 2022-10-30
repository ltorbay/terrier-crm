import {PricingLine, PricingModel} from "./PricingModel";
import {IMAGES} from "../constants/images";

export enum CottageSelect {
    BOTH,
    PEAR,
    GRAPE
}

export function cottageToLabel(select: CottageSelect): string {
    switch (select) {
        case CottageSelect.BOTH:
            return 'common.places.full-cottage';
        case CottageSelect.PEAR:
            return 'common.places.pear';
        case CottageSelect.GRAPE:
            return 'common.places.grape';
    }
}


export function cottageToIcon(select: CottageSelect): string {
    switch (select) {
        case CottageSelect.BOTH:
            return IMAGES.icons.dark.keys;
        case CottageSelect.PEAR:
            return IMAGES.icons.dark.pear;
        case CottageSelect.GRAPE:
            return IMAGES.icons.dark.grape;
    }
}

export function cottageToString(select: CottageSelect): 'BOTH' | 'PEAR' | 'GRAPE' {
    switch (select) {
        case CottageSelect.BOTH:
            return 'BOTH';
        case CottageSelect.PEAR:
            return 'PEAR';
        case CottageSelect.GRAPE:
            return 'GRAPE';
    }
}

export function cottageToPrice(select: CottageSelect, pricing: PricingModel): PricingLine {
    switch (select) {
        case CottageSelect.BOTH:
            return pricing.both;
        case CottageSelect.PEAR:
            return pricing.pear;
        case CottageSelect.GRAPE:
            return pricing.grape;
    }
}
