import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Sun, Moon, HelpCircle, Mail, Share2, ChevronRight, ChevronDown } from 'lucide-react';

const PAGE_LABELS = {
  dashboard: 'Dashboard', pos: 'New Order', orders: 'Order Management',
  customers: 'Customers', analytics: 'Analytics', ai: 'AI Assistant',
  staff: 'Staff', settings: 'Settings',
};

export default function Header() {
  const { sidebarCollapsed, currentPage, orders } = useApp();
  const [time, setTime] = useState(new Date());
  const left = sidebarCollapsed ? 64 : 260;

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const pendingCount = orders.filter(o => ['Received', 'In-Process'].includes(o.status)).length;
  const fmt = time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const pageLabel = PAGE_LABELS[currentPage] || 'Dashboard';

  return (
    <header className="top-header" style={{ left }}>
      {/* Left: Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>CleanOS</span>
        <ChevronRight size={13} style={{ color: 'var(--text-faint)' }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-h)' }}>{pageLabel}</span>
      </div>

      {/* Right: actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Clock */}
        <div style={{ marginRight: 4 }}>
          <span style={{ fontFamily: 'Geist Mono, JetBrains Mono, monospace', fontSize: 13, fontWeight: 600, color: 'var(--primary)', letterSpacing: 0.5 }}>{fmt}</span>
        </div>

        <div style={{ width: 1, height: 22, background: 'var(--border)' }} />

        {/* Icon buttons */}
        <button className="btn-icon" title="Help">
          <HelpCircle size={15} />
        </button>
        <button className="btn-icon" title="Messages">
          <Mail size={15} />
        </button>
        <button className="btn-icon" style={{ position: 'relative' }} title="Notifications">
          <Bell size={15} />
          {pendingCount > 0 && (
            <span style={{
              position: 'absolute', top: 5, right: 5,
              width: 7, height: 7, borderRadius: '50%',
              background: 'var(--error)', border: '1.5px solid white',
            }} />
          )}
        </button>

        <div style={{ width: 1, height: 22, background: 'var(--border)' }} />

        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '5px 10px', borderRadius: 10, transition: 'background 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-hover)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(135deg, #1A7A4A, #22A05F)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, color: 'white',
          }}>AM</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-h)', lineHeight: 1.2 }}>Agarwal Ji</span>
            <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Admin</span>
          </div>
          <ChevronDown size={13} style={{ color: 'var(--text-muted)' }} />
        </div>

        {/* Share / CTA button */}
        <button className="btn-share">
          <Share2 size={13} />
          Share
        </button>
      </div>
    </header>
  );
}
