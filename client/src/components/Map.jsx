import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';
import DustbinIcon from '../assets/dustbin.png';
import ComplaintIcon from '../assets/danger-sign.png'
const Map = ({ clickedLatLng, setClickedLatLng, markers, complaints }) => {
    const [lng, setLng] = useState(86.14481091493873);
    const [lat, setLat] = useState(22.773066457255503);
    // const [clickedLatLng, setClickedLatLng] = useState(null);
    console.log(complaints)
    const getLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                setLat(latitude);
                setLng(longitude);
                const res = await fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=6619f83957280357978706jdvad90bc`)
                const data = await res.json();
                console.log(data.display_name)
            }, function (error) {
                console.error("Error getting user's location:", error);

            },
                {
                    enableHighAccuracy: true,
                    timeout: 50000, // Increase timeout to give the device more time to get an accurate position
                    maximumAge: 0
                }
            );
        } else {
            console.error("Geolocation is not available in this browser.");
        }
    }

    useEffect(() => {
        getLocation();
    }, []);


    // const markers = [
    //     { geocode: [22.772580915494466, 86.14583730697633], popUp: "This is a marker with id = 1" },
    //     { geocode: [22.776359713987354, 86.14598751068115], popUp: "This is a marker with id = 2" },
    //     { geocode: [22.775162881688356, 86.1437237262726], popUp: "This is a marker with id = 3" },
    // ];

    const customIcon = new Icon({
        iconUrl: DustbinIcon,
        iconSize: [38, 38],
    });

    const complaintIcon = new Icon({
        iconUrl: ComplaintIcon,
        iconSize: [38, 38]
    })

    const handleMapClick = (e) => {
        setClickedLatLng([e.latlng.lat, e.latlng.lng]);
    };

    const HandleMapEvents = () => {
        useMapEvent('click', handleMapClick);
        return null;
    };

    return (
        <div className='flex justify-center p-3 z-30'>
            <MapContainer center={[lat, lng]} zoom={15} scrollWheelZoom={true} className=' h-[80vh]  w-full md:w-[80vw]'>
                <HandleMapEvents />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers?.map((marker, index) => (
                    <Marker key={index} position={marker.geocode} icon={customIcon}>
                        <Popup>{marker.popUp}</Popup>
                    </Marker>
                ))}
                {complaints?.map((complaint, index) => (
                    <Marker key={index} position={[complaint.latitude, complaint.longitude]} icon={complaintIcon}>
                        <Popup>{complaint._id} <br /> {complaint.description}</Popup>
                    </Marker>
                ))}
                {clickedLatLng && (
                    <Marker position={clickedLatLng}>
                        <Popup>Latitude: {clickedLatLng[0]}, Longitude: {clickedLatLng[1]}</Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
}

export default Map;
