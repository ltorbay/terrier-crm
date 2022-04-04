import React, {ReactNode} from "react";
import Flags from "country-flag-icons/react/3x2";

export enum Language {
    FR = "fr",
    EN = "en",
}

export class Locale {
    language: Language;
    languageRegex: RegExp;
    name: string;
    flag: ReactNode;

    constructor(language: Language, languageRegex: RegExp, name: string, flag: ReactNode) {
        this.language = language;
        this.languageRegex = languageRegex;
        this.name = name;
        this.flag = flag;
    }
}

export const Locales = [
    new Locale(Language.FR, /^fr\b/, "Français", <Flags.FR title="Français"/>),
    new Locale(Language.EN, /^en\b/, "English", <Flags.GB title="English"/>),
]

export const LocalesMap = new Map(Locales.map(locale => [locale.language.valueOf(), locale]));