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

const FacilityDistributionChart = ({ data }) => {
  const chartData = {
    labels: data.types,
    datasets: [{
      data: data.counts,
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
    }]
  };

  return <div className="w-full lg:w-1/2 mx-auto"><Pie data={chartData} /></div>;
};

// Example Usage
const facilityDistributionData = {
  types: ['Red Bin', 'Green Bin', 'Blue Bin', 'Recycling Center', 'Composting Facility', 'Hazardous Waste Collection Point'],
  counts: [12, 19, 3, 5, 2, 3]
};

export default FacilityDistributionChart;
