import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, CategoryScale);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Users',
      data: [500, 800, 1200, 1800, 2500, 3400],
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99,102,241,0.1)',
      tension: 0.4,
      fill: true,
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

const UsersChart = () => <Line data={data} options={options} />;

export default UsersChart; 