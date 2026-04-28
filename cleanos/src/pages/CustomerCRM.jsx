import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, MessageCircle, TrendingUp, Gift, Bot, Send, ArrowRight, Phone } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ORDERS } from '../data/mockData';

function Avatar({ initials, segment }) {
  const colors = { VIP: '#B45309', Frequent: '#1D4ED8', New: '#065F46', Dormant: '#B91C1C', 'At Risk': '#B45309' };
  const bgs = { VIP: '#FEF3C7', Frequent: '#DBEAFE', New: '#D1FAE5', Dormant: '#FEE2E2', 'At Risk': '#FEF3C7' };
  return (
    <div style={{
      width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
      background: bgs[segment] || '#F3F4F6',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 13, fontWeight: 700, color: colors[segment] || 'var(--text-muted)',
      border: `1.5px solid ${bgs[segment] || 'var(--border)'}`,
    }}>{initials}</div>
  );
}

function CustomerRow({ customer, onSelect, selected }) {
  return (
    <div onClick={() => onSelect(customer)} style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px', cursor: 'pointer',
      borderBottom: '1px solid var(--border)',
      background: selected ? 'var(--bg-green-soft)' : 'transparent',
      borderLeft: `3px solid ${selected ? 'var(--primary)' : 'transparent'}`,
      transition: 'all 0.15s',
    }}
      onMouseEnter={e => { if (!selected) e.currentTarget.style.background = 'var(--bg-hover)'; }}
      onMouseLeave={e => { if (!selected) e.currentTarget.style.background = 'transparent'; }}
    >
      <Avatar initials={customer.avatar} segment={customer.segment} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-h)' }}>{customer.name}</span>
          <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 12, fontWeight: 700, color: 'var(--primary)' }}>₹{customer.lifetimeValue.toLocaleString('en-IN')}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11 }}>
          <span style={{ color: 'var(--text-muted)' }}>{customer.phone}</span>
          <span className={`badge seg-${customer.segment.replace(' ','-')}`} style={{ fontSize: 10 }}>{customer.segment}</span>
        </div>
      </div>
    </div>
  );
}

function Profile({ customer }) {
  const custOrders = ORDERS.filter(o => o.customerId === customer.id);
  const loyaltyTarget = 1000;
  const progress = Math.min((customer.loyaltyPoints / loyaltyTarget) * 100, 100);
  const spendData = [
    { month: 'Nov', spend: Math.round(customer.lifetimeValue * 0.12) },
    { month: 'Dec', spend: Math.round(customer.lifetimeValue * 0.18) },
    { month: 'Jan', spend: Math.round(customer.lifetimeValue * 0.09) },
    { month: 'Feb', spend: Math.round(customer.lifetimeValue * 0.15) },
    { month: 'Mar', spend: Math.round(customer.lifetimeValue * 0.22) },
    { month: 'Apr', spend: Math.round(customer.lifetimeValue * 0.24) },
  ];

  return (
    <div style={{ padding: 28, overflowY: 'auto', height: '100%', animation: 'fadeUp 0.3s ease' }}>
      {/* Header */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 24 }}>
        <Avatar initials={customer.avatar} segment={customer.segment} />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ fontWeight: 800, fontSize: 18, color: 'var(--text-h)' }}>{customer.name}</h2>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{customer.email} · {customer.city}</div>
            </div>
            <span className={`badge seg-${customer.segment.replace(' ', '-')}`}>{customer.segment}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { label: 'Visits', value: customer.visits, icon: '🔁' },
          { label: 'Lifetime Value', value: `₹${customer.lifetimeValue.toLocaleString('en-IN')}`, icon: '💰' },
          { label: 'Last Visit', value: new Date(customer.lastVisit).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }), icon: '📅' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: '14px', textAlign: 'center' }}>
            <div style={{ fontSize: 20, marginBottom: 5 }}>{s.icon}</div>
            <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 16, fontWeight: 800, color: 'var(--primary)' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Loyalty */}
      <div className="card" style={{ padding: 16, marginBottom: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Gift size={14} style={{ color: '#D97706' }} /><span style={{ fontSize: 13, fontWeight: 600 }}>Loyalty Points</span></div>
          <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 13, fontWeight: 700, color: '#D97706' }}>{customer.loyaltyPoints} / 1000</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #1A7A4A, #22A05F)' }} />
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 7 }}>{1000 - customer.loyaltyPoints} pts to next reward (₹200 discount)</div>
      </div>

      {/* Spend chart */}
      <div className="card" style={{ padding: 16, marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <TrendingUp size={14} style={{ color: 'var(--primary)' }} />Spend History
        </div>
        <ResponsiveContainer width="100%" height={90}>
          <AreaChart data={spendData}>
            <defs>
              <linearGradient id="sgGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1A7A4A" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#1A7A4A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fill: '#9CA3AF', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip formatter={v => `₹${v}`} contentStyle={{ background: '#1A1A2E', border: 'none', borderRadius: 8, color: 'white', fontSize: 12 }} />
            <Area dataKey="spend" stroke="#1A7A4A" fill="url(#sgGrad)" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Order history */}
      <div className="card" style={{ padding: 16, marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Order History</div>
        {custOrders.length === 0 ? (
          <div style={{ color: 'var(--text-muted)', fontSize: 12, textAlign: 'center', padding: 20 }}>No orders found</div>
        ) : custOrders.map(o => (
          <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F9FAFB' }}>
            <div>
              <div style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: 'var(--primary)' }}>{o.id}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{o.items?.length} items · {new Date(o.receivedAt).toLocaleDateString('en-IN')}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 13, color: 'var(--text-h)' }}>₹{o.grandTotal?.toFixed(0)}</div>
              <span className={`badge badge-${o.status?.toLowerCase().replace(/ /g, '-') || 'received'}`} style={{ fontSize: 10 }}>{o.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}><MessageCircle size={14} />WhatsApp</button>
        <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}><Phone size={14} />Call</button>
      </div>
    </div>
  );
}

export default function CustomerCRM() {
  const { customers } = useApp();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [segFilter, setSegFilter] = useState('All');
  const [campaignOpen, setCampaignOpen] = useState(false);

  const segments = ['All', 'VIP', 'Frequent', 'New', 'At Risk', 'Dormant'];
  const filtered = customers.filter(c => {
    if (segFilter !== 'All' && c.segment !== segFilter) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.phone.includes(search)) return false;
    return true;
  });
  const dormant = customers.filter(c => c.segment === 'Dormant');

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', height: 'calc(100vh - 60px)', overflow: 'hidden' }}>
      {/* List */}
      <div style={{ borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', background: 'var(--bg-card)' }}>
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h2 className="section-title" style={{ fontSize: 18 }}>Customers</h2>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', background: 'var(--bg-page)', padding: '2px 10px', borderRadius: 100 }}>{filtered.length}</span>
          </div>
          <div style={{ position: 'relative', marginBottom: 12 }}>
            <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)' }} />
            <input className="input-field" placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 30 }} />
          </div>
          <div style={{ display: 'flex', gap: 5, overflowX: 'auto', paddingBottom: 12, scrollbarWidth: 'none' }}>
            {segments.map(s => (
              <button key={s} onClick={() => setSegFilter(s)} style={{
                padding: '4px 12px', borderRadius: 100, border: 'none', fontSize: 11, fontWeight: 600,
                background: segFilter === s ? 'var(--primary)' : 'var(--bg-page)',
                color: segFilter === s ? 'white' : 'var(--text-muted)',
                cursor: 'pointer', flexShrink: 0, transition: 'all 0.15s', fontFamily: 'inherit',
              }}>{s}</button>
            ))}
          </div>
        </div>

        {dormant.length > 0 && (
          <div style={{ margin: '0 14px 10px', padding: '10px 12px', background: 'var(--bg-green-soft)', border: '1px solid rgba(26,122,74,0.2)', borderRadius: 10 }}>
            <div style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 700, marginBottom: 4 }}>🤖 AI Churn Alert</div>
            <div style={{ fontSize: 12, color: 'var(--text-body)', marginBottom: 8 }}>{dormant.length} customers inactive 30+ days</div>
            <button className="btn-green-soft" style={{ fontSize: 11, padding: '4px 12px' }} onClick={() => setCampaignOpen(true)}>
              Send Retention Offer
            </button>
          </div>
        )}

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filtered.map(c => <CustomerRow key={c.id} customer={c} onSelect={setSelected} selected={selected?.id === c.id} />)}
        </div>
      </div>

      {/* Profile */}
      <div style={{ overflowY: 'auto', background: 'var(--bg-page)' }}>
        {selected ? <Profile customer={selected} /> : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12 }}>
            <div style={{ fontSize: 56 }}>👥</div>
            <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-h)' }}>Select a customer</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Click any customer from the list to view their profile</div>
          </div>
        )}
      </div>

      {/* Campaign modal */}
      {campaignOpen && (
        <div className="modal-overlay" onClick={() => setCampaignOpen(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 520 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 18 }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: 'var(--bg-green-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={20} style={{ color: 'var(--primary)' }} />
              </div>
              <div>
                <div className="section-title" style={{ fontSize: 16 }}>AI Campaign Composer</div>
                <div className="section-subtitle">Bulk WhatsApp for {dormant.length} dormant customers</div>
              </div>
            </div>
            <div style={{ background: 'var(--bg-page)', border: '1px solid var(--border)', borderRadius: 12, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 700, marginBottom: 8 }}>🤖 AI-Generated Message</div>
              <textarea style={{ width: '100%', background: 'transparent', border: 'none', color: 'var(--text-body)', fontSize: 13, resize: 'none', outline: 'none', lineHeight: 1.6, fontFamily: 'inherit' }}
                rows={6}
                defaultValue={`Namaste! 🙏\n\nWe miss you at Agarwal Laundry! It's been a while since your last visit.\n\n✨ Special offer just for you: Get 20% off your next order!\nValid for the next 7 days.\n\nCall us: 9876543210\n\n— Team CleanOS`} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setCampaignOpen(false)}>Cancel</button>
              <button className="btn-primary" style={{ flex: 2, justifyContent: 'center' }} onClick={() => setCampaignOpen(false)}>
                <Send size={13} />Send to {dormant.length} Customers
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
