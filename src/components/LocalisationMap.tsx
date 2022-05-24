import React, {useState} from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {Container, IconButton} from "@mui/material";
import 'leaflet/dist/leaflet.css';
import {divIcon, point} from "leaflet";
import {renderToStaticMarkup} from "react-dom/server";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsIcon from '@mui/icons-material/Directions';
import i18n from "../i18n";
import {ADDRESS, POSITION} from "../constants/constants";

export function LocalisationMap() {
    const [lang, setLang] = useState<string>(i18n.language);
    i18n.on("languageChanged", setLang)
    
    return (
        <Container sx={{width: "90%", height: "500px", maxWidth: "lg", maxHeight: "lg"}}>
            <MapContainer center={POSITION}
                          zoom={POSITION.alt}
                          scrollWheelZoom={false}>
                <TileLayer
                    attribution={renderToStaticMarkup(<a href="src/components/LocalisationMap">OpenStreetMap</a>)}
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <Marker position={POSITION}
                        icon={divIcon({
                            html: renderToStaticMarkup(<LocationOnIcon sx={{color: "primary.dark"}}/>),
                            iconSize: point(24, 24)
                        })}>
                    <Popup>
                        {ADDRESS}&nbsp;
                        <a target="_blank" rel="noreferrer" href={`https://www.google.com/maps/place/${POSITION.lat},${POSITION.lng}?hl=${lang}`}>
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