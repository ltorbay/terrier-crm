import {ICONS} from "../../public/assets";
import {PricingLine, PricingModel} from "./PricingModel";

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
            return ICONS.dark.icons.keys;
        case CottageSelect.PEAR:
            return ICONS.dark.icons.pear;
        case CottageSelect.GRAPE:
            return ICONS.dark.icons.grape;
    }
}

export function cottageToString(select: CottageSelect): string {
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
