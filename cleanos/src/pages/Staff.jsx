import { useApp } from '../context/AppContext';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Staff() {
  const { staff, setStaff } = useApp();

  const toggleStatus = (id) => {
    setStaff(prev => prev.map(s => {
      if (s.id !== id) return s;
      const newStatus = s.status === 'in' ? 'out' : 'in';
      toast.success(`${s.name} marked as ${newStatus === 'in' ? 'clocked in' : 'clocked out'}`);
      return { ...s, status: newStatus };
    }));
  };

  return (
    <div style={{ padding: 24, animation: 'fadeUp 0.35s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 className="section-title" style={{ fontSize: 22 }}>Staff Management</h1>
          <p className="section-subtitle">Track attendance and performance of your team</p>
        </div>
        <button className="btn-primary">+ Add Staff</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 18 }}>
        {staff.map(s => (
          <div key={s.id} className="card card-hover" style={{ padding: 22, position: 'relative', overflow: 'hidden' }}>
            {/* Status stripe */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 3,
              background: s.status === 'in' ? 'var(--primary)' : '#EF4444',
              borderRadius: '3px 3px 0 0',
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: 'linear-gradient(135deg, #1A7A4A, #22A05F)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 15, fontWeight: 800, color: 'white', flexShrink: 0,
                }}>{s.avatar}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-h)' }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.role}</div>
                </div>
              </div>
              <span style={{
                padding: '4px 10px', borderRadius: 100, fontSize: 11, fontWeight: 700,
                background: s.status === 'in' ? '#D1FAE5' : '#FEE2E2',
                color: s.status === 'in' ? '#065F46' : '#B91C1C',
              }}>{s.status === 'in' ? '● Active' : '○ Off'}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
              <div style={{ background: 'var(--bg-page)', borderRadius: 10, padding: '12px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 20, fontWeight: 800, color: 'var(--primary)' }}>{s.ordersToday}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500 }}>Orders Today</div>
              </div>
              <div style={{ background: 'var(--bg-page)', borderRadius: 10, padding: '12px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 13, fontWeight: 700, color: '#D97706' }}>{s.avgTime}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500 }}>Avg Time</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
              <Clock size={11} />Shift: {s.shift}
            </div>

            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 5 }}>7-day order trend</div>
              <ResponsiveContainer width="100%" height={36}>
                <LineChart data={s.performance.map((v, i) => ({ i, v }))}>
                  <Line dataKey="v" stroke="#1A7A4A" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <button
              style={{
                width: '100%', padding: '9px', borderRadius: 10, border: 'none',
                fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
                background: s.status === 'in' ? '#FEE2E2' : 'var(--bg-green-soft)',
                color: s.status === 'in' ? '#B91C1C' : 'var(--primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
              onClick={() => toggleStatus(s.id)}
            >
              {s.status === 'in' ? <><XCircle size={14} />Clock Out</> : <><CheckCircle2 size={14} />Clock In</>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
