import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registering the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ComplaintStatusChart = ({ data }) => {
  const chartData = {
    labels: ['Pending', 'In Progress', 'Resolved', 'Rejected'],
    datasets: [{
      label: 'Number of Complaints',
      data: [data.pending, data.inProgress, data.resolved, data.rejected],
      backgroundColor: ['#FFCE56', '#36A2EB', '#4BC0C0', '#FF6384'],
    }]
  };

  return <div className="w-full lg:w-3/4 lg:mx-auto"><Bar data={chartData} /></div>;
};

// Example Usage
const complaintStatusData = {
  pending: 10,
  inProgress: 5,
  resolved: 20,
  rejected: 2
};

export default ComplaintStatusChart;
