import React, { useState,useEffect } from 'react'
import Map from '../components/Map'
import axios from 'axios'
const OfficerDasboard = () => {

  
  const getComplaints=async()=>{
    const res =await axios.get('/api/officer/getAllComplaints')
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
        <Map complaints={complaints} />
      </div>
    </div>
  )

}

export default OfficerDasboard
