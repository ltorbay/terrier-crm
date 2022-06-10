import React, {useState} from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {Container, IconButton} from "@mui/material";
import {divIcon, LatLng, point} from "leaflet";
import {renderToStaticMarkup} from "react-dom/server";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsIcon from '@mui/icons-material/Directions';
import i18n from "../utils/i18n";
import {ADDRESS, POSITION} from "../constants/constants";

export function LocalisationMap() {
    const positionLatLng = new LatLng(POSITION.lat, POSITION.lng, POSITION.alt);
    const [lang, setLang] = useState<string>(i18n.language);
    i18n.on("languageChanged", setLang)

    return (
        <Container sx={{width: "90%", height: "500px", maxWidth: "lg", maxHeight: "lg"}}>
            <MapContainer center={positionLatLng}
                          zoom={positionLatLng.alt}
                          scrollWheelZoom={false}>
                <TileLayer
                    attribution={renderToStaticMarkup(<a href="src/components/LocalisationMap">OpenStreetMap</a>)}
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <Marker position={positionLatLng}
                        icon={divIcon({
                            html: renderToStaticMarkup(<LocationOnIcon sx={{color: "primary.dark"}}/>),
                            iconSize: point(24, 24)
                        })}>
                    <Popup>
                        {ADDRESS}&nbsp;
                        <a target="_blank" rel="noreferrer"
                           href={`https://www.google.com/maps/place/${positionLatLng.lat},${positionLatLng.lng}?hl=${lang}`}>
                            <IconButton aria-label="directions">
                                <DirectionsIcon sx={{color: "primary.dark"}}></DirectionsIcon>
                            </IconButton>
                        </a>
                    </Popup>
                </Marker>
            </MapContainer>
        </Container>
    )
}