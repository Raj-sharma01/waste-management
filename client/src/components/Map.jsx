import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";

const Map = () => {
    const [lng, setLng] = useState(22.77);
    const [lat, setLat] = useState(86.14);
    console.log("lat = " + lat + " lng=" + lng)

    const getLocation = () => {
        // Check if geolocation is available in the browser
        if ("geolocation" in navigator) {
            // Get the user's current location
            navigator.geolocation.getCurrentPosition(function (position) {
                // The user's latitude and longitude are in position.coords.latitude and position.coords.longitude
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setLat(latitude);
                setLng(longitude);
                console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

            }, function (error) {
                // Handle errors, if any
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        console.error("User denied the request for geolocation.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        console.error("Location information is unavailable.");
                        break;
                    case error.TIMEOUT:
                        console.error("The request to get user location timed out.");
                        break;
                    case error.UNKNOWN_ERROR:
                        console.error("An unknown error occurred.");
                        break;
                }
            });
        } else {
            console.error("Geolocation is not available in this browser.");
        }
    }

    useEffect(() => {
        getLocation();
    }, [])

    return (
        <div className='flex justify-center'>
            <MapContainer center={[lng, lat]} zoom={13} scrollWheelZoom={true} className=' h-[80vh] w-[80vw]'>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker> */}
            </MapContainer>
        </div>
    )
}

export default Map
