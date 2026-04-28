import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Filter, Clock, AlertCircle, Bot, ChevronDown } from 'lucide-react';

const COLUMNS = [
  { id: 'Received',        label: 'Received',       color: '#6B7280', dot: '#9CA3AF' },
  { id: 'In-Process',      label: 'In Process',     color: '#2563EB', dot: '#60A5FA' },
  { id: 'Quality Check',   label: 'Quality Check',  color: '#D97706', dot: '#FCD34D' },
  { id: 'Ready for Pickup',label: 'Ready',           color: '#16A34A', dot: '#4ADE80' },
  { id: 'Delivered',       label: 'Delivered',      color: '#7C3AED', dot: '#A78BFA' },
];

const BADGE_CLASS = {
  'Received': 'badge-received', 'In-Process': 'badge-in-process',
  'Quality Check': 'badge-quality', 'Ready for Pickup': 'badge-ready', 'Delivered': 'badge-delivered',
};

function OrderCard({ order, onDragStart, onMove }) {
  const isOverdue = new Date(order.dueAt) < new Date() && order.status !== 'Delivered';
  const due = new Date(order.dueAt);
  const dueLabel = due.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) + ' ' + due.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const nextCols = COLUMNS.filter(c => c.id !== order.status).slice(0, 2);

  return (
    <div className="kanban-card" draggable onDragStart={() => onDragStart(order.id)}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div>
          <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11, fontWeight: 700, color: 'var(--primary)', marginBottom: 2 }}>{order.id}</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-h)' }}>{order.customerName}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'flex-end' }}>
          <span className={`badge badge-${(order.priority || 'normal').toLowerCase()}`}>{order.priority || 'Normal'}</span>
          {isOverdue && (
            <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--error)', display: 'flex', alignItems: 'center', gap: 2 }}>
              <AlertCircle size={9} />OVERDUE
            </span>
          )}
        </div>
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>
        {order.items?.length} garment(s) · ₹{order.grandTotal?.toFixed(0)}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: isOverdue ? 'var(--error)' : 'var(--text-muted)', fontWeight: isOverdue ? 600 : 400 }}>
          <Clock size={10} />{dueLabel}
        </div>
        <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: 'white' }}>
          {order.staff?.charAt(0) || 'R'}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {nextCols.map(col => (
          <button key={col.id} onClick={() => onMove(order.id, col.id)} style={{
            fontSize: 10, padding: '3px 8px', borderRadius: 6,
            background: `${col.color}10`, color: col.color,
            border: `1px solid ${col.color}30`, cursor: 'pointer',
            fontWeight: 600, fontFamily: 'inherit', transition: 'all 0.12s',
          }}>→ {col.label}</button>
        ))}
      </div>
    </div>
  );
}

export default function OrderManagement() {
  const { orders, updateOrderStatus } = useApp();
  const [search, setSearch] = useState('');
  const [dragId, setDragId] = useState(null);

  const filtered = orders.filter(o =>
    !search || o.id.includes(search) || o.customerName.toLowerCase().includes(search.toLowerCase()) || o.phone?.includes(search)
  );

  const overdueOrders = orders.filter(o => new Date(o.dueAt) < new Date() && !['Delivered', 'Ready for Pickup'].includes(o.status));

  return (
    <div style={{ padding: 24, height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column', animation: 'fadeUp 0.35s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
        <div>
          <h1 className="section-title" style={{ fontSize: 22 }}>Order Management</h1>
          <p className="section-subtitle">Drag cards between columns to update status</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ position: 'relative' }}>
            <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)' }} />
            <input className="input-field" placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 30, width: 220 }} />
          </div>
          <button className="btn-secondary"><Filter size={13} />Filter</button>
        </div>
      </div>

      {overdueOrders.length > 0 && (
        <div className="ai-banner" style={{ marginBottom: 18 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--bg-green-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Bot size={17} style={{ color: 'var(--primary)' }} />
          </div>
          <div style={{ flex: 1, fontSize: 13 }}>
            <span style={{ color: 'var(--primary)', fontWeight: 700 }}>🤖 AI Priority Engine: </span>
            {overdueOrders.length} order(s) are overdue. Prioritize{' '}
            {overdueOrders.map((o, i) => (
              <span key={o.id}><strong style={{ color: 'var(--primary-dark)' }}>{o.id}</strong>{i < overdueOrders.length - 1 && ' and '}</span>
            ))}.
          </div>
          <button className="btn-green-soft" style={{ flexShrink: 0, fontSize: 12 }}>Prioritize</button>
        </div>
      )}

      {/* Kanban */}
      <div style={{ display: 'flex', gap: 12, overflow: 'auto', flex: 1 }}>
        {COLUMNS.map(col => {
          const colOrders = filtered.filter(o => o.status === col.id);
          return (
            <div key={col.id} className="kanban-col" style={{ flex: '0 0 240px' }}
              onDragOver={e => e.preventDefault()}
              onDrop={() => { if (dragId) { updateOrderStatus(dragId, col.id); setDragId(null); } }}
            >
              <div style={{ padding: '14px 14px 10px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: col.dot }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-h)' }}>{col.label}</span>
                </div>
                <span style={{ background: `${col.color}15`, color: col.color, borderRadius: 100, padding: '2px 9px', fontSize: 11, fontWeight: 700 }}>
                  {colOrders.length}
                </span>
              </div>
              <div style={{ padding: 10, display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto', maxHeight: 'calc(100% - 56px)' }}>
                {colOrders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '36px 12px', color: 'var(--text-faint)', fontSize: 12 }}>
                    <div style={{ fontSize: 22, marginBottom: 8 }}>📭</div>No orders
                  </div>
                ) : (
                  colOrders.map(o => (
                    <OrderCard key={o.id} order={o} onDragStart={setDragId} onMove={updateOrderStatus} />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
