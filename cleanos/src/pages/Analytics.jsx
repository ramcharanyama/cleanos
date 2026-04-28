import { useState } from 'react';
import { Bot } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area, Legend
} from 'recharts';
import { REVENUE_DATA, GARMENT_VOLUME, SERVICE_BREAKDOWN, MONTHLY_REVENUE, AI_INSIGHTS } from '../data/mockData';
import { useApp } from '../context/AppContext';

const PERIODS = ['Day', 'Week', 'Month', 'Year'];

const DarkTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1A1A2E', color: '#fff', borderRadius: 10, padding: '10px 14px', fontSize: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
      <div style={{ opacity: 0.6, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => <div key={i} style={{ fontWeight: 700 }}>{p.name === 'revenue' ? '₹' : ''}{p.value?.toLocaleString('en-IN')}</div>)}
    </div>
  );
};

const RADIAN = Math.PI / 180;
const PieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.06) return null;
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  return (
    <text x={cx + r * Math.cos(-midAngle * RADIAN)} y={cy + r * Math.sin(-midAngle * RADIAN)}
      fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Analytics() {
  const { staff } = useApp();
  const [period, setPeriod] = useState('Week');
  const [aiInsight] = useState(() => AI_INSIGHTS[Math.floor(Math.random() * AI_INSIGHTS.length)]);
  const revenueData = period === 'Month' ? MONTHLY_REVENUE.map(d => ({ day: d.month, revenue: d.revenue })) : REVENUE_DATA;

  return (
    <div style={{ padding: 24, overflowY: 'auto', height: 'calc(100vh - 60px)', animation: 'fadeUp 0.35s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 className="section-title" style={{ fontSize: 22 }}>Analytics & Reports</h1>
          <p className="section-subtitle">Business intelligence at a glance</p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ display: 'flex', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 3 }}>
            {PERIODS.map(p => (
              <button key={p} onClick={() => setPeriod(p)} style={{
                padding: '6px 14px', borderRadius: 7, fontSize: 12, fontWeight: 600,
                background: period === p ? 'var(--primary)' : 'transparent',
                color: period === p ? '#fff' : 'var(--text-muted)',
                border: 'none', cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'inherit',
              }}>{p}</button>
            ))}
          </div>
          <button className="btn-secondary" style={{ fontSize: 12 }}>📥 PDF</button>
          <button className="btn-secondary" style={{ fontSize: 12 }}>📊 CSV</button>
        </div>
      </div>

      {/* AI Insight */}
      <div className="ai-banner" style={{ marginBottom: 24 }}>
        <div style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--bg-green-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Bot size={18} style={{ color: 'var(--primary)' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 700, marginBottom: 2 }}>🤖 AI ANALYSIS</div>
          <div style={{ fontSize: 13, color: 'var(--text-body)' }}>{aiInsight}</div>
        </div>
      </div>

      {/* Revenue */}
      <div className="card" style={{ padding: 22, marginBottom: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-h)', marginBottom: 18 }}>Revenue Trend ({period})</div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#1A7A4A" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#1A7A4A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="day" tick={{ fill: '#9CA3AF', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#9CA3AF', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<DarkTip />} />
            <Area dataKey="revenue" stroke="#1A7A4A" fill="url(#revGrad)" strokeWidth={2.5} dot={false} name="revenue" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Donut + Pie */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-h)', marginBottom: 18 }}>Top Garments by Volume</div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <PieChart width={170} height={170}>
              <Pie data={GARMENT_VOLUME} cx="50%" cy="50%" innerRadius={50} outerRadius={78} paddingAngle={3} dataKey="value" label={PieLabel} labelLine={false}>
                {GARMENT_VOLUME.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v, n) => [v, n]} contentStyle={{ background: '#1A1A2E', border: 'none', borderRadius: 8, color: 'white', fontSize: 12 }} />
            </PieChart>
            <div style={{ flex: 1 }}>
              {GARMENT_VOLUME.map(g => (
                <div key={g.name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: g.color }} />
                    <span style={{ fontSize: 12 }}>{g.name}</span>
                  </div>
                  <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 12, fontWeight: 700, color: g.color }}>{g.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-h)', marginBottom: 18 }}>Service Breakdown</div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <PieChart width={170} height={170}>
              <Pie data={SERVICE_BREAKDOWN} cx="50%" cy="50%" innerRadius={0} outerRadius={78} paddingAngle={3} dataKey="value" label={PieLabel} labelLine={false}>
                {SERVICE_BREAKDOWN.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`]} contentStyle={{ background: '#1A1A2E', border: 'none', borderRadius: 8, color: 'white', fontSize: 12 }} />
            </PieChart>
            <div style={{ flex: 1 }}>
              {SERVICE_BREAKDOWN.map(s => (
                <div key={s.name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: s.color }} />
                    <span style={{ fontSize: 12 }}>{s.name}</span>
                  </div>
                  <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 12, fontWeight: 700, color: s.color }}>{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Staff table */}
      <div className="card" style={{ padding: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-h)', marginBottom: 16 }}>Staff Performance</div>
        <table className="data-table">
          <thead>
            <tr>
              {['Staff Member', 'Role', 'Orders Today', 'Avg Time', 'Status', 'Trend'].map(h => <th key={h}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {staff.map(s => (
              <tr key={s.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#1A7A4A,#22A05F)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white', flexShrink: 0 }}>{s.avatar}</div>
                    <span style={{ fontWeight: 600, color: 'var(--text-h)', fontSize: 13 }}>{s.name}</span>
                  </div>
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>{s.role}</td>
                <td><span style={{ fontFamily: 'Geist Mono, monospace', fontWeight: 700, color: 'var(--primary)', fontSize: 14 }}>{s.ordersToday}</span></td>
                <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>{s.avgTime}</td>
                <td>
                  <span style={{
                    padding: '3px 10px', borderRadius: 100, fontSize: 11, fontWeight: 700,
                    background: s.status === 'in' ? '#D1FAE5' : '#FEE2E2',
                    color: s.status === 'in' ? '#065F46' : '#B91C1C',
                  }}>{s.status === 'in' ? '● Active' : '○ Off'}</span>
                </td>
                <td>
                  <ResponsiveContainer width={80} height={30}>
                    <LineChart data={s.performance.map((v, i) => ({ i, v }))}>
                      <Line dataKey="v" stroke="#1A7A4A" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
