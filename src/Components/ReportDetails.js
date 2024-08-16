// ./ReportDetails.js
import React from 'react';
import { Bar } from 'react-chartjs-2'; // Import the Bar component from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components for bar chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ReportChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Report Details',
      data: [34, 78, 46, 50, 22, 59, 14, 80, 64, 90, 43, 22],
      backgroundColor: ' #93acea', // Bar color
      borderColor: '#93acea', // Bar border color
      borderWidth: 1, // Width of the bar border
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Position of the legend
      },
      title: {
        display: true,
        text: 'Monthly Report', // Title of the chart
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Month', // Label for the x-axis
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Value', // Label for the y-axis
        }
      }
    }
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};
