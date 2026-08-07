import React from 'react';
import { BarChart3 } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsView() {
  const barData = {
    labels: ['Vendor MSA', 'Data Processing', 'SLA Addendum', 'IP License', 'NDAs', 'SaaS Subscriptions'],
    datasets: [
      {
        label: 'Low Risk',
        data: [120, 95, 80, 60, 180, 140],
        backgroundColor: '#15803D',
        borderRadius: 6
      },
      {
        label: 'Medium Risk',
        data: [45, 30, 25, 20, 15, 35],
        backgroundColor: '#B45309',
        borderRadius: 6
      },
      {
        label: 'High Risk Exposure',
        data: [15, 12, 8, 14, 2, 8],
        backgroundColor: '#B91C1C',
        borderRadius: 6
      }
    ]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          font: { family: 'Inter', size: 12.5, weight: '600' },
          color: '#64748B'
        }
      },
      tooltip: {
        backgroundColor: '#FFFFFF',
        titleColor: '#0F172A',
        bodyColor: '#64748B',
        borderColor: '#D6D3D1',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6
      }
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { color: '#78716C', font: { family: 'Inter', size: 12 } }
      },
      y: {
        stacked: true,
        grid: { color: '#E7E5E4' },
        ticks: { color: '#78716C', font: { family: 'Inter', size: 12 } }
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }}>
      <div className="signature-accent-bar">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#0E7490', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          <BarChart3 size={16} strokeWidth={2} /> Portfolio Intelligence & Analytics
        </div>
        <h1 className="page-title">
          Contract Exposure Analytics
        </h1>
        <p className="body-text" style={{ marginTop: '4px' }}>
          Risk distribution breakdown by contract category using flat solid legal color palettes.
        </p>
      </div>

      <div className="grid-12">
        <div className="col-12 enterprise-card" style={{ padding: '28px' }}>
          <h2 className="card-title" style={{ marginBottom: '20px' }}>Risk Distribution by Agreement Type</h2>
          <div style={{ height: '380px', width: '100%' }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
