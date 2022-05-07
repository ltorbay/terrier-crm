import {ICONS} from "../assets";

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
            return ICONS.dark.icons.grapes;
    }
}
