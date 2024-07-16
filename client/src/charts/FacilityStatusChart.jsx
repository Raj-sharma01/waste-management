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

const FacilityStatusChart = ({ data }) => {
  const chartData = {
    labels: ['Active', 'Inactive'],
    datasets: [{
      label: 'Number of Facilities',
      data: [data.activeCount, data.inactiveCount],
      backgroundColor: ['#4BC0C0', '#FF6384'],
    }]
  };

  return <div className="w-full lg:w-1/2 mx-auto"><Bar data={chartData} /></div>;
};

// Example Usage
const facilityStatusData = {
  activeCount: 30,
  inactiveCount: 15
};

export default FacilityStatusChart;
