import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area
} from 'recharts';
import { TrendingUp, Clock, CheckCircle, Truck, Bot, Plus, QrCode, List, Star, ArrowRight, ArrowUpRight } from 'lucide-react';
import { REVENUE_DATA, HOURLY_HEATMAP, AI_INSIGHTS } from '../data/mockData';

/* ── Animated counter ── */
function AnimatedCounter({ target, prefix = '' }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let n = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const t = setInterval(() => {
      n = Math.min(n + step, target);
      setVal(n);
      if (n >= target) clearInterval(t);
    }, 16);
    return () => clearInterval(t);
  }, [target]);
  return <>{prefix}{Math.round(val).toLocaleString('en-IN')}</>;
}

/* ── Tooltip ── */
const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1A1A2E', color: '#fff', borderRadius: 10, padding: '10px 14px', fontSize: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
      <div style={{ opacity: 0.7, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ fontWeight: 700, color: p.color || '#fff' }}>
          {p.name === 'revenue' ? '₹' : ''}{typeof p.value === 'number' ? p.value.toLocaleString('en-IN') : p.value}
        </div>
      ))}
    </div>
  );
};

/* ── Heatmap cell ── */
function HmCell({ value, max }) {
  const intensity = value / max;
  const bg = intensity > 0.8 ? '#1A7A4A'
    : intensity > 0.6 ? 'rgba(26,122,74,0.6)'
      : intensity > 0.4 ? 'rgba(26,122,74,0.3)'
        : intensity > 0.2 ? 'rgba(26,122,74,0.12)'
          : '#F3F4F6';
  const color = intensity > 0.6 ? '#fff' : intensity > 0.2 ? 'var(--primary)' : 'var(--text-faint)';
  return (
    <div style={{ width: 28, height: 22, borderRadius: 5, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color, fontWeight: 600, transition: 'all 0.15s', cursor: 'default' }} title={`${value} orders`}>{value}</div>
  );
}

const STATUS_BADGE = {
  'Received': 'badge-received', 'In-Process': 'badge-in-process',
  'Quality Check': 'badge-quality', 'Ready for Pickup': 'badge-ready', 'Delivered': 'badge-delivered',
};

export default function Dashboard() {
  const { todayStats, orders, setCurrentPage } = useApp();
  const [aiInsight] = useState(() => AI_INSIGHTS[Math.floor(Math.random() * AI_INSIGHTS.length)]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 900); return () => clearTimeout(t); }, []);

  const hmMax = Math.max(...HOURLY_HEATMAP.flatMap(r => [r.mon, r.tue, r.wed, r.thu, r.fri, r.sat, r.sun]));
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const liveOrders = orders.filter(o => o.status !== 'Delivered').slice(0, 7);

  const kpis = [
    { label: "Today's Revenue", value: todayStats.revenue, prefix: '₹', icon: TrendingUp, iconBg: '#DCFCE7', iconColor: '#16A34A', trend: '+18%', up: true },
    { label: 'Pending Orders', value: todayStats.pending, icon: Clock, iconBg: '#FEF3C7', iconColor: '#D97706', trend: '2 overdue', up: false },
    { label: 'Ready for Pickup', value: todayStats.ready, icon: CheckCircle, iconBg: '#DBEAFE', iconColor: '#2563EB', trend: 'Notify now', up: true },
    { label: 'Delivered Today', value: todayStats.delivered, icon: Truck, iconBg: '#F3E8FF', iconColor: '#7C3AED', trend: '100% on-time', up: true },
  ];

  if (loading) {
    return (
      <div style={{ padding: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 20 }}>
          {[1, 2, 3, 4].map(i => <div key={i} className="skeleton" style={{ height: 110, borderRadius: 16 }} />)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16 }}>
          <div className="skeleton" style={{ height: 280, borderRadius: 16 }} />
          <div className="skeleton" style={{ height: 280, borderRadius: 16 }} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, animation: 'fadeUp 0.35s ease' }}>
      {/* Page header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 className="section-title" style={{ fontSize: 22 }}>Good evening, Ram Ji 👋</h1>
          <p className="section-subtitle">Here's what's happening at your store today.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-secondary" onClick={() => setCurrentPage('analytics')}>View Report</button>
          <button className="btn-primary" onClick={() => setCurrentPage('pos')}>
            <Plus size={14} /> New Order
          </button>
        </div>
      </div>

      {/* AI banner */}
      <div className="ai-banner" style={{ marginBottom: 24 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--bg-green-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Bot size={20} style={{ color: 'var(--primary)' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 700, marginBottom: 2 }}>🤖 AI INSIGHT</div>
          <div style={{ fontSize: 13, color: 'var(--text-body)' }}>{aiInsight}</div>
        </div>
        <button className="btn-green-soft" style={{ flexShrink: 0 }}>
          Take Action <ArrowRight size={12} />
        </button>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 24 }}>
        {kpis.map((k, i) => {
          const Icon = k.icon;
          return (
            <div key={i} className="kpi-card card-hover" style={{ animationDelay: `${i * 70}ms` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: k.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} style={{ color: k.iconColor }} />
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 100,
                  background: k.up ? '#DCFCE7' : '#FEF3C7',
                  color: k.up ? '#16A34A' : '#D97706',
                  display: 'flex', alignItems: 'center', gap: 3,
                }}>
                  {k.up ? '↑' : '⚠'} {k.trend}
                </span>
              </div>
              <div style={{ fontFamily: 'Geist Mono, JetBrains Mono, monospace', fontSize: 28, fontWeight: 700, color: 'var(--text-h)', letterSpacing: '-1px' }}>
                <AnimatedCounter target={k.value} prefix={k.prefix || ''} />
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, marginBottom: 12 }}>{k.label}</div>
              <div style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                onClick={() => setCurrentPage(i < 2 ? 'orders' : 'orders')}>
                See details <ArrowUpRight size={12} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16, marginBottom: 24 }}>
        {/* Revenue chart */}
        <div className="card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-h)' }}>Revenue — Last 7 Days</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Daily totals with trend line</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#16A34A', background: '#DCFCE7', padding: '3px 10px', borderRadius: 100 }}>↑ 18% vs last week</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={REVENUE_DATA}>
              <defs>
                <linearGradient id="barG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1A7A4A" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#1A7A4A" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="day" tick={{ fill: '#9CA3AF', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#9CA3AF', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="revenue" fill="url(#barG)" radius={[6, 6, 0, 0]} name="revenue" />
              <Line dataKey="revenue" stroke="#22A05F" strokeWidth={2} dot={false} name="trend" strokeDasharray="4 2" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Live orders */}
        <div className="card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-h)' }}>Live Orders</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--primary)' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--primary)', display: 'inline-block', animation: 'pulseGreen 2s infinite' }} />
              Live
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {liveOrders.map(o => (
              <div key={o.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #F9FAFB' }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-h)', fontFamily: 'monospace' }}>{o.id}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{o.customerName}</div>
                </div>
                <span className={`badge ${STATUS_BADGE[o.status] || 'badge-received'}`} style={{ fontSize: 10 }}>{o.status}</span>
              </div>
            ))}
            {!liveOrders.length && <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 32, fontSize: 13 }}>No active orders 🎉</div>}
          </div>
          <button className="btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }} onClick={() => setCurrentPage('orders')}>
            View All Orders <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Heatmap */}
      <div className="card" style={{ padding: 22, marginBottom: 24 }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-h)' }}>Hourly Traffic Heatmap</div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Order volume by hour and day of week</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: 6, minWidth: 460 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingTop: 28 }}>
              {HOURLY_HEATMAP.map(r => (
                <div key={r.hour} style={{ fontSize: 10, color: 'var(--text-muted)', height: 22, display: 'flex', alignItems: 'center', width: 32 }}>{r.hour}</div>
              ))}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                {days.map(d => <div key={d} style={{ width: 28, fontSize: 10, color: 'var(--text-muted)', textAlign: 'center', fontWeight: 700 }}>{d}</div>)}
              </div>
              {HOURLY_HEATMAP.map(r => (
                <div key={r.hour} style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                  {[r.mon, r.tue, r.wed, r.thu, r.fri, r.sat, r.sun].map((v, i) => (
                    <HmCell key={i} value={v} max={hmMax} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {[
          { label: 'New Order', icon: Plus, color: 'var(--primary)', bg: 'var(--bg-green-soft)', action: () => setCurrentPage('pos') },
          { label: 'Scan QR', icon: QrCode, color: '#7C3AED', bg: '#F3E8FF', action: () => { } },
          { label: 'View Queue', icon: List, color: '#D97706', bg: '#FEF3C7', action: () => setCurrentPage('orders') },
          { label: 'Mark Ready', icon: Star, color: '#2563EB', bg: '#DBEAFE', action: () => setCurrentPage('orders') },
        ].map((a, i) => {
          const Icon = a.icon;
          return (
            <button key={i} onClick={a.action} style={{
              background: a.bg, border: `1px solid ${a.color}20`,
              color: a.color, borderRadius: 14, padding: '18px',
              cursor: 'pointer', transition: 'all 0.18s',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              fontWeight: 700, fontSize: 13, fontFamily: 'inherit',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-hover)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <Icon size={22} />
              {a.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
