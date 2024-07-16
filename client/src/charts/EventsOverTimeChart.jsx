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

const EventsOverTimeChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [{
      label: 'Number of Events',
      data: data.counts,
      borderColor: '#FF6384',
      fill: false,
    }]
  };

  return <div className="w-full lg:w-3/4 mx-auto"><Line data={chartData} /></div>;
};

// Example Usage
const eventsOverTimeData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  counts: [1, 2, 3, 4, 2, 1, 3]
};

export default EventsOverTimeChart;
