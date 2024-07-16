import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registering the components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MonthlyComplaintsChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [{
      label: 'Number of Complaints',
      data: data.counts,
      borderColor: '#36A2EB',
      fill: false,
    }]
  };

  return <div className="w-full lg:w-3/4 mx-auto"><Line data={chartData} /></div>;
};

// Example Usage
const monthlyComplaintsData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  counts: [3, 7, 4, 5, 6, 9, 10]
};

export default MonthlyComplaintsChart;
