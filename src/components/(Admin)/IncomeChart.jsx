import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, CategoryScale);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Income',
      data: [2000, 2500, 2200, 3000, 2800, 4000],
      borderColor: '#00FF99',
      backgroundColor: 'rgba(0,255,153,0.1)',
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

const IncomeChart = () => <Line data={data} options={options} />;

export default IncomeChart; 