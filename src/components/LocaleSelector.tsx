import * as React from "react";
import {useState} from "react";
import {FormControl, IconButton, MenuItem, Select, SelectChangeEvent, SvgIcon} from "@mui/material";
import {Locales} from "../model/Locale";
import i18n from "../i18n";

export function LocaleSelector() {
    let mappedLanguage = (Locales.find((language) => language.languageRegex.test(i18n.language)) || Locales[0]).language.valueOf();
    if (mappedLanguage !== i18n.language) {
        i18n.changeLanguage(mappedLanguage).then();
    }

    const [lang, setLang] = useState<string>(mappedLanguage);
    return <FormControl variant="standard">
        <Select size="small"
                disableUnderline={true}
                autoWidth
                sx={{opacity: '0.5'}}
                onChange={(event: SelectChangeEvent) => {
                    let newLanguage = event.target.value;
                    i18n.changeLanguage(newLanguage)
                        .then(() => setLang(newLanguage));
                }}
                value={lang}>
            {Locales.map((locale) => (
                <MenuItem value={locale.language.valueOf()} key={locale.language}>
                    <IconButton size="small"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit">
                        <SvgIcon>
                            {locale.flag}
                        </SvgIcon>
                    </IconButton>
                </MenuItem>
            ))}
        </Select>
    </FormControl>;
}