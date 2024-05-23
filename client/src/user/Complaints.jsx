import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Complaints = () => {

  const [complaints,setComplaints]=useState([])

  const getComplaints=async()=>{
    const res =await axios.get('/api/user/getAllComplaints')
    console.log(res.data.complaints)
    setComplaints(res.data.complaints)
  }

  useEffect(()=>{
    getComplaints()
  },[])




  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-300";
      case "In Progress":
        return "bg-blue-300";
      case "Resolved":
        return "bg-green-300";
      case "Rejected":
        return "bg-red-300";
      default:
        return "bg-gray-300";
    }
  };
  
  // _id: '663fa2c3c3c6385d9ccde082',
  //     latitude: 22.773847213612264,
  //     longitude: 86.14348769187927,
  //     address: 
  //       'National Institute of Techonology Jamshedpur, National Institute of Technology, Jamshedpur, Adityapur(Gamharia), Seraikela-Kharsawan District, Jharkhand, 831013, India',
  //     complainerId: '663f8a34085e9d98fbf02718',
  //     description: 'need a bin here',
  //     status: 'Pending',
  //     remark: '',
  return (
    <>
      <div className='text-center font-bold text-2xl'>
        {complaints.length === 0 && <h1>No Complaints to show</h1>}
      </div>
      <div className='w-full px-4 py-8 '>
        {complaints.map(complaint => {
          return (
            <div className='w-full px-4 py-4 '>
              <div class="w-full items-center justify-center flex">
                <div class="w-[80vw] mb-7 rounded bg-white p-6 shadow lg:mb-0 lg:mr-7 lg:w-[80vw]">
                  <div class="flex items-center border-b border-gray-200 pb-6">
                    <div class="flex w-full items-start justify-between">
                      <div class="w-full pl-3">
                        <p class=" text-md sm:text-xl font-medium leading-5 text-gray-800">{`ComplaintId: ${complaint._id}`}</p>
                        <p class="pt-2 text-sm leading-normal text-gray-500">{`Latitude: ${complaint.latitude} Longitude: ${complaint.longitude}`}</p>
                        <p className='pt-2'>{`Address: ${complaint.address}`}</p>
                      </div>
                      
                    </div>
                  </div>
                  <div class="px-2">
                    <p class="py-4 text-sm leading-5 text-gray-600">{complaint.description}</p>

                    <h2 class="">Remark :</h2>
                    <p class="">{complaint.remark}</p>
                    <div className="py-4">
                      <span className={`rounded-xl px-2 py-1 ${getStatusColor(complaint.status)}`}>
                        {complaint.status}
                      </span>
                    </div>
                    <p class="py-2 text-sm text-gray-500">Lodged At: {new Date(complaint.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Complaints
