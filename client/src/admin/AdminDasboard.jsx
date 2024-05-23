import React, { useState,useEffect } from 'react'
import Map from '../components/Map'
import axios from 'axios'
const AdminDasboard = () => {
  const [markers, setMarkers] = useState([
    { geocode: [22.772580915494466, 86.14583730697633], popUp: "This is a marker with id = 1" },
    { geocode: [22.776359713987354, 86.14598751068115], popUp: "This is a marker with id = 2" },
    { geocode: [22.775162881688356, 86.1437237262726], popUp: "This is a marker with id = 3" },
  ])

  // const complaintArray = [
  //   {
  //     complaintId: "609c9998a57e050015653b71",
  //     latitude: 22.7726,
  //     longitude: 86.1459,
  //     complainerId: "609c9998a57e050015653b71",
  //     description: "Broken street lights",
  //     status: "Pending",
  //     remark: "Needs immediate repair",
  //     assignedTo: "609c9998a57e050015653b72"
  //   },
  //   {
  //     complaintId: "609c9998a57e050015653b72",
  //     latitude: 22.7725,
  //     longitude: 86.1457,
  //     complainerId: "609c9998a57e050015653b73",
  //     description: "Potholes on the road",
  //     status: "In Progress",
  //     remark: "Scheduled for maintenance",
  //     assignedTo: null
  //   },
  //   {
  //     complaintId: "609c9998a57e050015653b73",
  //     latitude: 22.7727,
  //     longitude: 86.1456,
  //     complainerId: "609c9998a57e050015653b74",
  //     description: "Traffic congestion",
  //     status: "Resolved",
  //     remark: "Traffic signal installed",
  //     assignedTo: ""
  //   },
  //   {
  //     complaintId: "609c9998a57e050015653b74",
  //     latitude: 22.7728,
  //     longitude: 86.1458,
  //     complainerId: "609c9998a57e050015653b75",
  //     description: "Illegal parking",
  //     status: "Pending",
  //     remark: "Enforcement team notified",
  //     assignedTo: "609c9998a57e050015653b76"
  //   },
  //   {
  //     complaintId: "609c9998a57e050015653b75",
  //     latitude: 22.7724,
  //     longitude: 86.1455,
  //     complainerId: "609c9998a57e050015653b77",
  //     description: "Garbage dumping",
  //     status: "Rejected",
  //     remark: "No evidence found",
  //     assignedTo: null
  //   }
  // ]
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
        <Map markers={markers} complaints={complaints} />
      </div>
    </div>
  )

}

export default AdminDasboard
