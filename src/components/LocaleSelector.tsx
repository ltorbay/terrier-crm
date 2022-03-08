import * as React from "react";
import {FormControl, IconButton, MenuItem, Select, SvgIcon} from "@mui/material";
import {Locale, Locales, LocalesMap} from "../model/Locale";

export class LocaleSelector extends React.Component<{}, { locale: Locale }> {

    constructor(props: {}) {
        super(props);

        let fromStorage = localStorage.getItem('locale');

        if (fromStorage) {
            this.state = {locale: LocalesMap.get(fromStorage) || Locales[0]};
        } else {
            this.state = {locale: Locales.find(value => value.languageRegex.test(navigator.language)) || Locales[0]};
        }
    }

    onLocaleChange(change: { target: { value: string; }; }) {
        let selectedLocale = LocalesMap.get(change.target.value);
        if (selectedLocale) {
            this.setState({locale: selectedLocale});
            localStorage.setItem('locale', selectedLocale.key)
        } else {
            console.error("Unable to select locale" + change)
        }
    }

    render() {
        return <FormControl variant="standard">
            <Select size="small" autoWidth onChange={this.onLocaleChange.bind(this)}
                    value={this.state.locale.key}>
                {Locales.map((locale) => (
                    <MenuItem value={locale.key} key={locale.key}>
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
}