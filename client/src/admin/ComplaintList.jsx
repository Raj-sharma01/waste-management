import React, { useState, useEffect } from 'react'
import axios from 'axios'

const ComplaintList = () => {

  // const complaintArray = [
  //     {
  //         complaintId: "609c9998a57e050015653b71",
  //         latitude: 22.7726,
  //         longitude: 86.1459,
  //         complainerId: "609c9998a57e050015653b71",
  //         description: "Broken street lights",
  //         status: "Pending",
  //         remark: "Needs immediate repair",
  //         assignedTo: "609c9998a57e050015653b72"
  //     },
  //     {
  //         complaintId: "609c9998a57e050015653b72",
  //         latitude: 22.7725,
  //         longitude: 86.1457,
  //         complainerId: "609c9998a57e050015653b73",
  //         description: "Potholes on the road",
  //         status: "In Progress",
  //         remark: "Scheduled for maintenance",
  //         assignedTo: null
  //     },
  //     {
  //         complaintId: "609c9998a57e050015653b73",
  //         latitude: 22.7727,
  //         longitude: 86.1456,
  //         complainerId: "609c9998a57e050015653b74",
  //         description: "Traffic congestion",
  //         status: "Resolved",
  //         remark: "Traffic signal installed",
  //         assignedTo: ""
  //     },
  //     {
  //         complaintId: "609c9998a57e050015653b74",
  //         latitude: 22.7728,
  //         longitude: 86.1458,
  //         complainerId: "609c9998a57e050015653b75",
  //         description: "Illegal parking",
  //         status: "Pending",
  //         remark: "Enforcement team notified",
  //         assignedTo: "609c9998a57e050015653b76"
  //     },
  //     {
  //         complaintId: "609c9998a57e050015653b75",
  //         latitude: 22.7724,
  //         longitude: 86.1455,
  //         complainerId: "609c9998a57e050015653b77",
  //         description: "Garbage dumping",
  //         status: "Rejected",
  //         remark: "No evidence found",
  //         assignedTo: null
  //     }
  // ]

  const getComplaints = async () => {
    const res = await axios.get('/api/admin/getAllComplaints')
    console.log(res.data.complaints)
    setComplaints(res.data.complaints)
  }

  useEffect(() => {
    getComplaints()
  }, [])

  const [complaints, setComplaints] = useState([])

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

  return (
    <>
      <div className='text-center font-bold text-2xl'>
        {complaints.length === 0 && <h1>No Complaints to show</h1>}
      </div>
      <div className='w-full px-4 py-8 '>
        {complaints.map(complaint => {
          return (
            // <div className='w-full px-4 py-4 '>
            //     <div class="w-full items-center justify-center flex">
            //         <div class="w-[80vw] mb-7 rounded bg-white p-6 shadow lg:mb-0 lg:mr-7 lg:w-[80vw]">
            //             <div class="flex items-center border-b border-gray-200 pb-6">
            //                 <div class="flex w-full items-start justify-between">
            //                     <div class="w-full pl-3">
            //                         <p class="text-l font-medium leading-5 text-gray-800">{`ComplaintId: ${complaint.complaintId}`}</p>
            //                         <p class="pt-2 text-sm leading-normal text-gray-500">{`Latitude:${complaint.latitude} Longitude:${complaint.longitude}`}</p>
            //                     </div>
            //                 </div>
            //             </div>
            //             <div class="px-2">
            //                 <p class="py-4 text-sm leading-5 text-gray-600">{complaint.description}</p>

            //                 <h2 class="">Remark :</h2>
            //                 <p class="">{complaint.remark}</p>
            //                 <div className="py-4">
            //                     <span className={`rounded-xl px-2 py-1 ${getStatusColor(complaint.status)}`}>
            //                         {complaint.status}
            //                     </span>
            //                 </div>
            //                 <div>Assigened to</div>
            //                 <div>{complaint.assignedTo}</div>
            //             </div>

            //         </div>
            //     </div>
            // </div>
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
                    <div>Assigened to :</div>
                    <div>{complaint.assignedTo}</div>
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

export default ComplaintList
