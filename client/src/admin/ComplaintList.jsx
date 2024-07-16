import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [assignComplaintId, setAssignComplaintId] = useState(null);
  const [filter, setFilter] = useState('all'); // Initial filter state

  console.log(complaints)
  const getComplaints = async () => {
    const res = await axios.get('/api/admin/getAllComplaints');
    const complaintsWithSelection = res.data.complaints.map(complaint => ({
      ...complaint,
      selectedOfficer: null,
    }));
    setComplaints(complaintsWithSelection);
  };

  const getOfficers = async () => {
    const res = await axios.get('/api/admin/getAllOfficers'); // Make sure this endpoint exists
    setOfficers(res.data.officers);
  };

  useEffect(() => {
    getComplaints();
    getOfficers();
  }, []);

  const handleOfficerChange = (complaintId, officerId) => {
    setComplaints(prevComplaints =>
      prevComplaints.map(complaint =>
        complaint._id === complaintId ? { ...complaint, selectedOfficer: officerId } : complaint
      )
    );
  };

  const handleAssign = async () => {
    if (assignComplaintId) {
      const complaint = complaints.find(complaint => complaint._id === assignComplaintId);
      const selectedOfficer = complaint.selectedOfficer;

      if (selectedOfficer) {
        try {
          await axios.post(`/api/admin/assignComplaint/${assignComplaintId}/`, { officerId: selectedOfficer });
          toast.success('Complaint assigned successfully');
          getComplaints(); // Refresh complaints list
        } catch (err) {
          console.error(err);
          toast.error('Error assigning complaint');
        } finally {
          setAssignComplaintId(null);
        }
      }
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredComplaints = complaints.filter(complaint => {
    if (filter === 'all') return true;
    return complaint.status.toLowerCase() === filter.toLowerCase();
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-200 text-yellow-800';
      case 'In Progress':
        return 'bg-blue-200 text-blue-800';
      case 'Resolved':
        return 'bg-green-200 text-green-800';
      case 'Rejected':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <>
      

       {/* Filter Section */}
       <div className="text-center font-bold text-2xl">
        <h1>Complaints</h1>
      </div>
      <div className="flex justify-center mb-6">
        <label className="mr-2">Filter by Status:</label>
        <select
          className="border border-gray-300 rounded p-2"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="text-center text-gray-600">
        {filteredComplaints.length === 0 && <h1>No Complaints to show</h1>}
      </div>
      
      <div className='w-full px-4 py-8'>
        {filteredComplaints.map(complaint => (
          <div key={complaint._id} className='w-full px-4 py-4'>
            <div className="w-full items-center justify-center flex">
              <div className="w-full lg:w-[80vw] mb-7 rounded bg-white p-6 shadow">
                <div className="flex items-center border-b border-gray-200 pb-6">
                  <div className="flex w-full items-start justify-between">
                    <div className="w-full pl-3">
                      <p className="text-md sm:text-xl font-medium leading-5 text-gray-800">{`ComplaintId: ${complaint._id}`}</p>
                      <p className="pt-2 text-sm leading-normal text-gray-500">{`Latitude: ${complaint.latitude} Longitude: ${complaint.longitude}`}</p>
                      <p className='pt-2'>{`Address: ${complaint.address}`}</p>
                    </div>
                  </div>
                </div>
                <div className="px-2">
                  <p className="py-4 text-sm leading-5 text-gray-600">{complaint.description}</p>

                  <h2 className="">Remark :</h2>
                  <p className="">{complaint.remark}</p>
                  <div className="py-4">
                    <span className={`rounded-xl px-2 py-1 ${getStatusColor(complaint.status)}`}>
                      {complaint.status}
                    </span>
                  </div>
                  <div>Assigned to :</div>
                  <div>
                    {complaint.assignedTo ? (
                      `${complaint.assignedTo.username} ( ${complaint.assignedTo.email} )`
                    ) : (
                      <>
                        <div className="flex flex-col sm:flex-row items-center sm:space-x-4">
                          <select
                            value={complaint.selectedOfficer || ''}
                            onChange={(e) => handleOfficerChange(complaint._id, e.target.value)}
                            className="w-full sm:w-auto border border-gray-300 rounded-md p-2 mb-2 sm:mb-0"
                          >
                            <option value="">Select Officer</option>
                            {officers.map(officer => (
                              <option key={officer._id} value={officer._id}>
                                {officer.name} ({officer.email})
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => setAssignComplaintId(complaint._id)}
                            className="w-full sm:w-auto bg-blue-500 text-white p-2 rounded"
                          >
                            Assign
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  <p className="py-2 text-sm text-gray-500">Lodged At: {new Date(complaint.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {assignComplaintId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-2"> {assignComplaintId}</h2>
            <h2 className="text-lg font-bold mb-4">Assign Complaint to Officer</h2>
            <select
              value={complaints.find(complaint => complaint._id === assignComplaintId)?.selectedOfficer || ''}
              onChange={(e) => handleOfficerChange(assignComplaintId, e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            >
              <option value="">Select Officer</option>
              {officers.map(officer => (
                <option key={officer._id} value={officer._id}>{officer.name} {officer.username} {officer.email}</option>
              ))}
            </select>
            <div className="flex justify-end">
              <button
                onClick={handleAssign}
                className="bg-blue-500 text-white p-2 rounded mr-2"
              >
                Assign
              </button>
              <button
                onClick={() => setAssignComplaintId(null)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ComplaintList;
