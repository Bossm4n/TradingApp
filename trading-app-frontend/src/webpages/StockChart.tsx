import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend } from 'chart.js';
import { ChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

interface StockData {
  date: string; // ISO string date
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
}

interface StockChartProps {
  data: StockData[];
}

const StockChart: React.FC<StockChartProps> = ({ data }) => {
  // Extract dates and prices
  const labels = data.map(d => d.date);
  const prices = data.map(d => d.close);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Stock Price',
        data: prices,
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderWidth: 1,
        fill: true,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'll', // Format for the tooltip
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price',
        },
        beginAtZero: false, // Adjust according to your needs
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top', // Adjust position
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `Price: ${context.parsed.y}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2>Stock Prices Over Time</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default StockChart;
