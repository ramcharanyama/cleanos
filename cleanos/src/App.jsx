import { Toaster } from 'react-hot-toast';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import FloatingAIBubble from './components/FloatingAIBubble';
import Confetti from './components/Confetti';
import OnboardingOverlay from './components/OnboardingOverlay';
import Dashboard from './pages/Dashboard';
import POSScreen from './pages/POSScreen';
import OrderManagement from './pages/OrderManagement';
import CustomerCRM from './pages/CustomerCRM';
import Analytics from './pages/Analytics';
import Staff from './pages/Staff';
import AIAssistant from './pages/AIAssistant';
import Settings from './pages/Settings';
import { LayoutDashboard, ShoppingCart, Package, Users, BarChart3, UserCheck, Bot, Settings as SettingsIcon } from 'lucide-react';

const PAGE_COMPONENTS = {
  dashboard: Dashboard,
  pos: POSScreen,
  orders: OrderManagement,
  customers: CustomerCRM,
  analytics: Analytics,
  staff: Staff,
  ai: AIAssistant,
  settings: Settings,
};

const MOBILE_NAV = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Home' },
  { id: 'pos', icon: ShoppingCart, label: 'POS' },
  { id: 'orders', icon: Package, label: 'Orders' },
  { id: 'customers', icon: Users, label: 'Customers' },
  { id: 'ai', icon: Bot, label: 'AI' },
];

function AppLayout() {
  const { currentPage, setCurrentPage, sidebarCollapsed, confetti } = useApp();
  const left = sidebarCollapsed ? 64 : 220;
  const PageComponent = PAGE_COMPONENTS[currentPage] || Dashboard;
  const isFullH = ['pos', 'orders', 'customers', 'ai'].includes(currentPage);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Sidebar />
      <div style={{ marginLeft: left, flex: 1, minWidth: 0, transition: 'margin-left 0.25s ease' }}>
        <Header />
        <main
          className="main-content"
          style={{
            marginTop: 60,
            height: isFullH ? 'calc(100vh - 60px)' : undefined,
            minHeight: isFullH ? undefined : 'calc(100vh - 60px)',
            overflowY: isFullH ? 'hidden' : 'auto',
          }}
        >
          <PageComponent inline={true} />
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="mobile-nav">
        {MOBILE_NAV.map(n => {
          const Icon = n.icon;
          return (
            <button key={n.id} onClick={() => setCurrentPage(n.id)}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '8px 0', border: 'none', background: 'transparent', cursor: 'pointer', color: currentPage === n.id ? 'var(--accent-cyan)' : 'var(--text-muted)', fontSize: 10, fontWeight: 600 }}>
              <Icon size={20} />
              {n.label}
            </button>
          );
        })}
      </nav>

      <FloatingAIBubble />
      <Confetti active={confetti} />
      <OnboardingOverlay />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            fontSize: '13px',
            fontFamily: 'DM Sans, sans-serif',
          },
          success: { iconTheme: { primary: '#10B981', secondary: '#0A0F1E' } },
          error: { iconTheme: { primary: '#EF4444', secondary: '#0A0F1E' } },
        }}
      />
      <AppLayout />
    </AppProvider>
  );
}
