import React, {useState} from "react";
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import {Container} from "@mui/material";
import {divIcon, LatLng, LeafletMouseEvent, point} from "leaflet";
import {renderToStaticMarkup} from "react-dom/server";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import i18n from "../utils/i18n";
import {POSITION} from "../constants/constants";

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
                        eventHandlers={{click: (event: LeafletMouseEvent) => window.open('https://goo.gl/maps/L8VVYhv4TVCsXbjk7', '_blank', 'noopener,noreferrer')}}
                        icon={divIcon({
                            html: renderToStaticMarkup(<LocationOnIcon sx={{color: "primary.dark"}}/>),
                            iconSize: point(30, 30)
                        })}>
                </Marker>
            </MapContainer>
        </Container>
    )
}