import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Orders',
      data: [120, 150, 110, 180, 170, 210],
      backgroundColor: '#00FF99',
      borderRadius: 8,
    },
  ],
};

const options = {
  plugins: { legend: { display: false } },
  scales: {
    x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.05)' } },
    y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.05)' } },
  },
};

const OrdersChart = () => <Bar data={data} options={options} />;

export default OrdersChart; 