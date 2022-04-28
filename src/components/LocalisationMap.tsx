import React, {useState} from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {Container, IconButton} from "@mui/material";
import {makeStyles} from "@mui/styles";
import 'leaflet/dist/leaflet.css';
import "./LocalisationMap.css";
import {divIcon, LatLng, point} from "leaflet";
import {renderToStaticMarkup} from "react-dom/server";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {SimplePaletteColorOptions} from "@mui/material/styles/createPalette";
import DirectionsIcon from '@mui/icons-material/Directions';
import i18n from "../i18n";
import {ADDRESS, POSITION} from "../const/constants";

const useStyles = makeStyles((theme: { palette: { primary: SimplePaletteColorOptions } }) => ({
    root: {
        color: theme.palette.primary.dark
    }
}));

export function LocalisationMap() {
    const [lang, setLang] = useState<string>(i18n.language);
    i18n.on("languageChanged", setLang)
    
    const classes = useStyles();
    return (
        <Container sx={{width: "90%", height: "500px", maxWidth: "lg", maxHeight: "lg"}}>
            <MapContainer center={POSITION}
                          zoom={POSITION.alt}
                          scrollWheelZoom={true}>
                <TileLayer
                    attribution={renderToStaticMarkup(<a href="https://www.openstreetmap.org/">OpenStreetMap</a>)}
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <Marker position={POSITION}
                        icon={divIcon({
                            html: renderToStaticMarkup(<LocationOnIcon className={classes.root}/>),
                            iconSize: point(24, 24)
                        })}>
                    <Popup>
                        {ADDRESS}&nbsp;
                        <a target="_blank" rel="noreferrer" href={`https://www.google.com/maps/place/${POSITION.lat},${POSITION.lng}?hl=${lang}`}>
                            <IconButton aria-label="directions" color="secondary">
                                <DirectionsIcon></DirectionsIcon>
                            </IconButton>
                        </a>
                    </Popup>
                </Marker>
            </MapContainer>
        </Container>
    )
}