import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';
import ComplaintIcon from '../assets/danger-sign.png'
import axios from 'axios';
import RedBinIcon from '../assets/hazardous-red-bin.png'
import GreenBinIcon from '../assets/green-dustbin.png'
import BlueBinIcon from '../assets/blue-dustbin.png'
import RecyclingCenterIcon from '../assets/recycling-center.png'
import HazardousWasteIcon from '../assets/hazardous-red-bin.png'
import MedicalWasteIcon from '../assets/hazardous-red-bin.png'
import DustbinIcon from '../assets/dustbin.png'
import CompostingFacilityIcon from '../assets/waste-management.jpg'
import LandfillSiteIcon from '../assets/waste-management.jpg'
import WasteTransferStationIcon from '../assets/waste-management.jpg'
import LocationIcon from '../assets/location.png'

const Map = ({ clickedLatLng, setClickedLatLng, complaints,setSelectedMarker,selectedMarker,refreshMap }) => {
    const [lng, setLng] = useState(86.14712961646475);
    const [lat, setLat] = useState(22.774935429630094);
    const [markers, setMarkers] = useState([]);
     
    const fetchFacilities = async () => {
      try {
        const res = await axios.get('/api/user/facilities');
        const facilitiesData = res.data;
        // setFacilities(facilitiesData);
        const markersData = facilitiesData.map((facility, index) => ({
          geocode: [facility.latitude, facility.longitude],
          popUp: `This is a ${facility.type}`,
          ...facility
        }));
        setMarkers(markersData);
      } catch (error) {
        console.error('Error fetching facilities:', error);
      }
    };
  
    useEffect(()=>{
     fetchFacilities();
    },[refreshMap]);

    console.log("complaints = ",complaints)

    const handleMarkerClick = (marker) => {
        setSelectedMarker(marker);
    };

    console.log(markers)
    const customIcon = new Icon({
        iconUrl: LocationIcon,
        iconSize: [38, 38],
    });

    const getIcon = (type) => {
        switch (type) {
            case 'Red Bin':
                return new Icon({ iconUrl: RedBinIcon, iconSize: [32, 32] });
            case 'Green Bin':
                return new Icon({ iconUrl: GreenBinIcon, iconSize: [32, 32] });
            case 'Blue Bin':
                return new Icon({ iconUrl: BlueBinIcon, iconSize: [32, 32] });
            case 'Recycling Center':
                return new Icon({ iconUrl: RecyclingCenterIcon, iconSize: [36, 36] });
            case 'Composting Facility':
                return new Icon({ iconUrl: CompostingFacilityIcon, iconSize: [36, 36] });
            case 'Hazardous Waste Collection Point':
                return new Icon({ iconUrl: HazardousWasteIcon, iconSize: [32, 32] });
            case 'Medical Waste Disposal Facility':
                return new Icon({ iconUrl: MedicalWasteIcon, iconSize: [32, 32] });
            case 'Waste Transfer Station':
                return new Icon({ iconUrl: WasteTransferStationIcon, iconSize: [36, 36] });
            case 'Landfill Site':
                return new Icon({ iconUrl: LandfillSiteIcon, iconSize: [36, 36] });
            default:
                return new Icon({ iconUrl: DustbinIcon, iconSize: [32, 32] });
        }
    };

    const complaintIcon = new Icon({
        iconUrl: ComplaintIcon,
        iconSize: [32, 32]
    })

    const handleMapClick = (e) => {
        console.log("map clicked",e.latlng)
        if(setSelectedMarker){
            setSelectedMarker(null)
        }
        setClickedLatLng([e.latlng.lat, e.latlng.lng]);
    };

    const HandleMapEvents = () => {
        console.log("map event")
        useMapEvent('click', handleMapClick);
        return null;
    };
    if(selectedMarker){
        console.log("marker selcted",selectedMarker)
    }
console.log(complaints)
    return (
        <div className='flex justify-center p-3 z-30 rounded-lg'>
            <MapContainer center={[lat, lng]} zoom={16} scrollWheelZoom={true} className=' h-[80vh]  w-full md:w-[80vw] rounded-xl'>
                <HandleMapEvents />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {markers?.map((marker, index) => (
                    <Marker
                        key={index}
                        position={marker.geocode}
                        icon={getIcon(marker.type)}
                        eventHandlers={{
                            click: () => handleMarkerClick(marker),
                            // click: ()=> setSelectedMarker(true)
                        }}>
                        <Popup>{marker.popUp}</Popup>
                    </Marker>
                ))}
                {complaints?.map((complaint, index) => (
                    
                    <Marker
                        key={index}
                        position={[complaint.latitude, complaint.longitude]}
                        icon={complaintIcon}>
                        <Popup>{complaint.description}</Popup>
                    </Marker>
                ))}
                {clickedLatLng && (
                    <Marker position={clickedLatLng} icon={customIcon}>
                        <Popup>Latitude: {clickedLatLng[0]}, Longitude: {clickedLatLng[1]}</Popup>
                    </Marker>
                )}
            </MapContainer>
            
        </div>
    );
}

export default Map;
