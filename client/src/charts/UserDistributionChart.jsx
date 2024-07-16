import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Registering the components
ChartJS.register(ArcElement, Tooltip, Legend);

const UserDistributionChart = ({ data }) => {
  const chartData = {
    labels: ['Admin', 'User'],
    datasets: [{
      data: [data.adminCount, data.userCount],
      backgroundColor: ['#FF6384', '#36A2EB'],
    }],
  };

  return <div className="w-full lg:w-1/2 mx-auto"><Pie data={chartData} /></div>;
};

// Example Usage
const userData = {
  adminCount: 5,
  userCount: 45
};

export default UserDistributionChart;
