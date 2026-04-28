import { useApp } from '../context/AppContext';
import {
  LayoutDashboard, ShoppingCart, Package, Users, BarChart3,
  Settings, UserCheck, Bot, ChevronLeft, ChevronRight,
  Search, Crown, Zap, RefreshCw, Bell, HelpCircle
} from 'lucide-react';

const NAV = [
  {
    section: 'MAIN MENU',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'pos',       label: 'New Order',  icon: ShoppingCart },
      { id: 'orders',    label: 'Orders',     icon: Package, badge: '4' },
      { id: 'customers', label: 'Customers',  icon: Users },
    ],
  },
  {
    section: 'FEATURES',
    items: [
      { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: 'New' },
      { id: 'ai',        label: 'AI Assistant', icon: Bot, badge: 'AI' },
    ],
  },
  {
    section: 'GENERAL',
    items: [
      { id: 'staff',    label: 'Staff',    icon: UserCheck },
      { id: 'settings', label: 'Settings', icon: Settings },
    ],
  },
];

export default function Sidebar() {
  const { currentPage, setCurrentPage, sidebarCollapsed, setSidebarCollapsed } = useApp();
  const w = sidebarCollapsed ? 64 : 260;

  return (
    <aside className="sidebar" style={{ width: w }}>
      {/* Logo */}
      <div style={{ padding: sidebarCollapsed ? '16px 14px' : '18px 20px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: 'linear-gradient(135deg, #1A7A4A, #22A05F)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(26,122,74,0.35)',
          }}>
            <Zap size={18} color="#fff" fill="#fff" />
          </div>
          {!sidebarCollapsed && (
            <div>
              <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 16, color: 'var(--text-h)', letterSpacing: '-0.3px' }}>
                Clean<span style={{ color: 'var(--primary)' }}>OS</span>
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-faint)', fontWeight: 500 }}>Laundry POS v2.0</div>
            </div>
          )}
        </div>
      </div>

      {/* Search bar */}
      {!sidebarCollapsed && (
        <div style={{ padding: '12px 14px 4px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)' }} />
            <input
              className="input-field"
              placeholder="Search..."
              style={{ paddingLeft: 30, fontSize: 12, background: 'var(--bg-page)', borderRadius: 10, height: 34 }}
            />
          </div>
        </div>
      )}

      {/* Nav sections */}
      <nav style={{ flex: 1, overflowY: 'auto', paddingTop: 4 }}>
        {NAV.map(section => (
          <div key={section.section}>
            {!sidebarCollapsed && (
              <div className="nav-section-label">{section.section}</div>
            )}
            {section.items.map(item => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <div
                  key={item.id}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => setCurrentPage(item.id)}
                  title={sidebarCollapsed ? item.label : ''}
                  style={{ justifyContent: sidebarCollapsed ? 'center' : 'flex-start' }}
                >
                  <Icon size={16} style={{ flexShrink: 0 }} />
                  {!sidebarCollapsed && (
                    <>
                      <span style={{ flex: 1 }}>{item.label}</span>
                      {item.badge && (
                        <span className="nav-badge">{item.badge}</span>
                      )}
                    </>
                  )}
                  {sidebarCollapsed && item.badge && (
                    <span style={{
                      position: 'absolute', top: 4, right: 4,
                      width: 7, height: 7, borderRadius: '50%',
                      background: 'var(--primary)',
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Upgrade card */}
      {!sidebarCollapsed && (
        <div className="upgrade-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <Crown size={16} style={{ color: '#FDE68A' }} />
            <span style={{ fontSize: 13, fontWeight: 700 }}>Upgrade Pro</span>
          </div>
          <p style={{ fontSize: 11, opacity: 0.85, marginBottom: 12, lineHeight: 1.5 }}>
            Unlock unlimited orders, WhatsApp automation & advanced AI reports.
          </p>
          <button style={{
            width: '100%', padding: '8px', borderRadius: 8, border: 'none',
            background: 'rgba(255,255,255,0.22)', color: 'white',
            fontWeight: 700, fontSize: 12, cursor: 'pointer',
            backdropFilter: 'blur(8px)', fontFamily: 'inherit',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.32)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; }}
          >
            Upgrade Now →
          </button>
        </div>
      )}

      {/* Collapse */}
      <div style={{ padding: '10px 8px', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
        <button
          className="btn-ghost"
          style={{ width: '100%', justifyContent: sidebarCollapsed ? 'center' : 'flex-start', padding: '8px 10px' }}
          onClick={() => setSidebarCollapsed(p => !p)}
        >
          {sidebarCollapsed ? <ChevronRight size={15} /> : <><ChevronLeft size={15} /><span style={{ fontSize: 12 }}>Collapse</span></>}
        </button>
      </div>
    </aside>
  );
}
