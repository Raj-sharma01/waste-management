import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserDistributionChart from '../charts/UserDistributionChart';
import FacilityDistributionChart from '../charts/FacilityDistributionChart';
import FacilityStatusChart from '../charts/FacilityStatusChart';
import ComplaintStatusChart from '../charts/ComplaintStatusChart';
import MonthlyComplaintsChart from '../charts/MonthlyComplaintsChart';
import EventsOverTimeChart from '../charts/EventsOverTimeChart';

const Info = () => {
  const [userDistributionData, setUserDistributionData] = useState({ adminCount: 0, userCount: 0 });
  const [facilityDistributionData, setFacilityDistributionData] = useState({ types: [], counts: [] });
  const [facilityStatusData, setFacilityStatusData] = useState({ activeCount: 0, inactiveCount: 0 });
  const [complaintStatusData, setComplaintStatusData] = useState({ pending: 0, inProgress: 0, resolved: 0, rejected: 0 });
  const [monthlyComplaintsData, setMonthlyComplaintsData] = useState({ labels: [], counts: [] });
  const [eventsOverTimeData, setEventsOverTimeData] = useState({ labels: [], counts: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('/api/admin/users/stats');
        const facilitiesResponse = await axios.get('/api/admin/facilities/stats');
        const complaintsResponse = await axios.get('/api/admin/complaints/stats');
        const eventsResponse = await axios.get('/api/admin/events/stats');

        setUserDistributionData(usersResponse.data.userDistribution);
        setFacilityDistributionData(facilitiesResponse.data.facilityDistribution);
        console.log("facilities data",facilitiesResponse.data)
        setFacilityStatusData(facilitiesResponse.data.facilityStatus);
        setComplaintStatusData(complaintsResponse.data.complaintStatus);
        setMonthlyComplaintsData(complaintsResponse.data.monthlyComplaints);
        console.log("complaints data",complaintsResponse.data)
        setEventsOverTimeData(eventsResponse.data.eventsOverTime);
        console.log("event data",eventsResponse.data.eventsOverTime)
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-dashboard p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      
      <div className="chart-container bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">User Distribution by Role</h2>
        <UserDistributionChart data={userDistributionData} />
      </div>
      
      <div className="chart-container bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Monthly Complaints</h2>
        <MonthlyComplaintsChart data={monthlyComplaintsData} />
      </div>

      <div className="chart-container bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Facility Status</h2>
        <FacilityStatusChart data={facilityStatusData} />
      </div>

      <div className="chart-container bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Facility Distribution</h2>
        <FacilityDistributionChart data={facilityDistributionData} />
      </div>

      <div className="chart-container bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Events Over Time</h2>
        <EventsOverTimeChart data={eventsOverTimeData} />
      </div>

      <div className="chart-container bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Complaint Status</h2>
        <ComplaintStatusChart data={complaintStatusData} />
      </div>
    </div>
  );
};

export default Info;
