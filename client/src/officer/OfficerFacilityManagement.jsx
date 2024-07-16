import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../components/Map';
import FacilityForm from '../components/FacilityForm'; // Import the FacilityForm component

const OfficerFacilityManagement = () => {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [clickedLatLng, setClickedLatLng] = useState([0,0]);
  const [formData, setFormData] = useState({
    type: '',
    latitude: 0,
    longitude: 0,
    address: '',
    capacity: 0,
    status: 'Active',
  });
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [refreshMap, setRefreshMap] = useState(false); // New state for triggering map refresh


  const handleFacilityClick = (facility) => {
    setSelectedFacility(facility);
  };
  console.log("form data ===> ",formData)
  const handleCreateFacility = async (formData) => {
    try {
      console.log(formData)
      await axios.post('/api/officer/facilities', formData); // Replace with actual API endpoint
      setRefreshMap(prev => !prev); // Trigger map refresh
      resetFormData(); // Reset form after submission
      setClickedLatLng([0, 0]); // Clear clicked lat/lng
    } catch (error) {
      console.error('Error creating facility:', error);
    }
  };

  const handleUpdateFacility = async (facilityId) => {
    try {
      await axios.put(`/api/officer/facilities/${facilityId}`, formData); // Replace with actual API endpoint
      // fetchFacilities(); // Refresh facilities after update
    } catch (error) {
      console.error('Error updating facility:', error);
    }
  };

  const handleDeleteFacility = async (facilityId) => {
    try {
      await axios.delete(`/api/officer/facilities/${facilityId}`); // Replace with actual API endpoint
      // fetchFacilities(); // Refresh facilities after deletion
    } catch (error) {
      console.error('Error deleting facility:', error);
    }
  };

  const resetFormData = () => {
    setFormData({
      type: '',
      latitude: 0,
      longitude: 0,
      address: '',
      capacity: 0,
      status: 'Active',
    });
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value, latitude: clickedLatLng[0], longitude: clickedLatLng[1] });
  };
 console.log(selectedMarker)

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2">
        <Map
          clickedLatLng={clickedLatLng}
          setClickedLatLng={setClickedLatLng}
          onFacilityClick={handleFacilityClick}
          selectedMarker={selectedMarker}
          setSelectedMarker={setSelectedMarker}
          refreshMap={refreshMap} // Pass refreshMap state to Map component
        />
      </div>
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-xl font-bold mb-4">Manage Facilities</h2>
        <FacilityForm onSubmit={handleCreateFacility} formData={formData} handleChange={handleChange} clickedLatLng={clickedLatLng} setClickedLatLng={setClickedLatLng} setFormData={setFormData}  selectedMarker={selectedMarker} />
        {selectedFacility && (
          <div>
            <h2>Edit Facility</h2>
            <form onSubmit={() => handleUpdateFacility(selectedFacility._id)} className="mb-4">
              {/* Render inputs with selectedFacility data for editing */}
            </form>
            <button onClick={() => handleDeleteFacility(selectedFacility._id)} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfficerFacilityManagement;
