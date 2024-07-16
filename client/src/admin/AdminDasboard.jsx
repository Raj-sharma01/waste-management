import React, { useState,useEffect } from 'react'
import Map from '../components/Map'
import axios from 'axios'
const AdminDasboard = () => {

  // const [markers, setMarkers] = useState([]);
     
  // const fetchFacilities = async () => {
  //   try {
  //     const res = await axios.get('/api/user/facilities');
  //     const facilitiesData = res.data;
  //     // setFacilities(facilitiesData);
  //     const markersData = facilitiesData.map((facility, index) => ({
  //       geocode: [facility.latitude, facility.longitude],
  //       popUp: `This is a ${facility.type} facility with id = ${index + 1}`,
  //     }));
  //     setMarkers(markersData);
  //   } catch (error) {
  //     console.error('Error fetching facilities:', error);
  //   }
  // };

  // useEffect(()=>{
  //  fetchFacilities();
  // },[]);

 
  const getComplaints=async()=>{
    const res =await axios.get('/api/admin/getAllComplaints')
    console.log(res.data.complaints)
    //to show only pending complaints
    let complaints = res.data.complaints.filter((complaint)=>complaint.status==="Pending")
    setComplaints(complaints)
  }

  useEffect(()=>{
    getComplaints()
  },[])  

  const [complaints, setComplaints] = useState([])

  // const res = axios.get('/')
  return (
    <div >
      <h1 className='text-center text-4xl'>Dashboard</h1>
      <div className='lg:flex lg:justify-center'>
        {/*  markers={markers} */}
        <Map complaints={complaints} />
      </div>
    </div>
  )

}

export default AdminDasboard
