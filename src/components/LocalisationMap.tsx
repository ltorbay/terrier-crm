import React, {useState} from "react";
import {Container, IconButton} from "@mui/material";
import 'leaflet/dist/leaflet.css';
import {renderToStaticMarkup} from "react-dom/server";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsIcon from '@mui/icons-material/Directions';
import i18n from "../i18n";
import {ADDRESS, POSITION} from "../constants/constants";
import dynamic from "next/dynamic";

const MapContainer = dynamic<any>(
    () => import("react-leaflet").then(module => module.MapContainer),
    {ssr: false}
);
const Marker = dynamic<any>(
    () => import("react-leaflet").then(module => module.Marker),
    {ssr: false}
);
const Popup = dynamic<any>(
    () => import("react-leaflet").then(module => module.Popup),
    {ssr: false}
);
const TileLayer = dynamic<any>(
    () => import("react-leaflet").then(module => module.TileLayer),
    {ssr: false}
);
const divIcon = dynamic<any>(
    () => import("leaflet").then(module => module.divIcon),
    {ssr: false}
);
const LatLng = dynamic(
// @ts-ignore
    () => import("leaflet").then(module => module.LatLng),
    {ssr: false}
);
const point = dynamic(
// @ts-ignore
    () => import("leaflet").then(module => module.point),
    {ssr: false}
);


export function LocalisationMap() {
    const positionLatLng = POSITION as LatLng;
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