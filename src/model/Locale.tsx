import React, {ReactNode} from "react";
import Flags from "country-flag-icons/react/3x2";

export class Locale {
    key: string;
    languageRegex: RegExp;
    name: string;
    flag: ReactNode;

    constructor(key: string, languageRegex: RegExp, name: string, flag: ReactNode) {
        this.key = key;
        this.languageRegex = languageRegex;
        this.name = name;
        this.flag = flag;
    }
}

export const Locales = [
    new Locale("fr", /^fr\b/, "Français", <Flags.FR title="Français"/>),
    new Locale("en", /^en\b/, "English", <Flags.GB title="English"/>),
]

export const LocalesMap = new Map(Locales.map(locale => [locale.key, locale]));