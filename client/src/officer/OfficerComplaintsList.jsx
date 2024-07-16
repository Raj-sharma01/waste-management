import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const OfficerComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [filter, setFilter] = useState('All');

  const getComplaints = async () => {
    const res = await axios.get('/api/officer/getAllComplaints');
    setComplaints(res.data.complaints);
    setFilteredComplaints(res.data.complaints);
  };

  useEffect(() => {
    getComplaints();
  }, []);

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

  const handleInputChange = (index, field, value) => {
    const updatedComplaints = [...complaints];
    updatedComplaints[index][field] = value;
    setComplaints(updatedComplaints);
    setFilteredComplaints(updatedComplaints);
  };

  const handleSave = async (complaint) => {
    try {
      const res = await axios.put(`/api/officer/updateComplaint/${complaint._id}`, {
        status: complaint.status,
        remark: complaint.remark,
      });
      toast.success('Complaint updated successfully');
      getComplaints(); // Refresh the complaints list after update
    } catch (error) {
      console.error('Error updating complaint:', error);
      toast.error('Error updating complaint');
    }
  };

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);

    if (selectedFilter === 'All') {
      setFilteredComplaints(complaints);
    } else {
      setFilteredComplaints(complaints.filter(complaint => complaint.status === selectedFilter));
    }
  };

  return (
    <>
      <div className="text-center font-bold text-2xl">
        <h1>Officer Complaints</h1>
      </div>
      <div className="flex justify-center mb-6">
        <label className="mr-2">Filter by Status:</label>
        <select
          className="border border-gray-300 rounded p-2"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <div className="w-full px-4 py-8">
        {filteredComplaints.length === 0 ? (
          <div className="text-center text-gray-600">No complaints to show</div>
        ) : (
          filteredComplaints.map((complaint, index) => (
            <div key={complaint._id} className="w-full px-4 py-4">
              <div className="w-full items-center justify-center flex">
                <div className="w-[80vw] mb-7 rounded bg-white p-6 shadow lg:mb-0 lg:mr-7 lg:w-[80vw]">
                  <div className="flex items-center border-b border-gray-200 pb-6">
                    <div className="flex w-full items-start justify-between">
                      <div className="w-full pl-3">
                        <p className="text-md sm:text-xl font-medium leading-5 text-gray-800">{`ComplaintId: ${complaint._id}`}</p>
                        <p className="pt-2 text-sm leading-normal text-gray-500">{`Latitude: ${complaint.latitude} Longitude: ${complaint.longitude}`}</p>
                        <p className="pt-2">{`Address: ${complaint.address}`}</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-2">
                    <p className="py-4 text-sm leading-5 text-gray-600">{complaint.description}</p>
                    <h2 className="">Remark :</h2>
                    <textarea
                      className="w-full border border-gray-300 rounded p-2"
                      value={complaint.remark}
                      onChange={(e) => handleInputChange(index, 'remark', e.target.value)}
                    />
                    <div className="py-4">
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <select
                        className={`w-full border border-gray-300 rounded p-2 ${getStatusColor(complaint.status)}`}
                        value={complaint.status}
                        onChange={(e) => handleInputChange(index, 'status', e.target.value)}
                      >
                        <option value="Pending" className='bg-white text-black'>Pending</option>
                        <option value="In Progress" className='bg-white text-black'>In Progress</option>
                        <option value="Resolved" className='bg-white text-black'>Resolved</option>
                        <option value="Rejected" className='bg-white text-black'>Rejected</option>
                      </select>
                    </div>
                    <button
                      className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150"
                      onClick={() => handleSave(complaint)}
                    >
                      Save
                    </button>
                    <p className="py-2 text-sm text-gray-500">Lodged At: {new Date(complaint.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default OfficerComplaintsList;
