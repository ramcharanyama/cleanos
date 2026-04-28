import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ORDERS, CUSTOMERS, STAFF } from '../data/mockData';
import toast from 'react-hot-toast';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [orders, setOrders] = useState(ORDERS);
  const [customers, setCustomers] = useState(CUSTOMERS);
  const [staff, setStaff] = useState(STAFF);
  const [cart, setCart] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [orderCounter, setOrderCounter] = useState(1043);
  const [confetti, setConfetti] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'n' || e.key === 'N') setCurrentPage('pos');
      if (e.key === 'd' || e.key === 'D') setCurrentPage('dashboard');
      if (e.key === 'o' || e.key === 'O') setCurrentPage('orders');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addToCart = useCallback((garment, service = 'dry-clean') => {
    setCart(prev => {
      const existing = prev.find(i => i.garmentId === garment.id && i.service === service);
      if (existing) {
        return prev.map(i => i.garmentId === garment.id && i.service === service
          ? { ...i, qty: i.qty + 1 }
          : i
        );
      }
      return [...prev, {
        id: Date.now(),
        garmentId: garment.id,
        garmentName: garment.name,
        icon: garment.icon,
        service,
        qty: 1,
        price: garment.basePrice[service],
        notes: '',
        hasStain: false,
      }];
    });
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  }, []);

  const updateCartItem = useCallback((itemId, updates) => {
    setCart(prev => prev.map(i => i.id === itemId ? { ...i, ...updates } : i));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    setSelectedCustomer(null);
  }, []);

  const placeOrder = useCallback((paymentMethod = 'Cash') => {
    if (cart.length === 0) {
      toast.error('Cart is empty!');
      return null;
    }
    const subtotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
    const gst = subtotal * 0.18;
    const grandTotal = subtotal + gst;
    const orderId = `ORD-${orderCounter}`;

    const newOrder = {
      id: orderId,
      customerId: selectedCustomer?.id || 'WALK-IN',
      customerName: selectedCustomer?.name || 'Walk-in Customer',
      phone: selectedCustomer?.phone || 'N/A',
      status: 'Received',
      items: cart.map(i => ({
        garment: i.garmentName,
        service: i.service,
        qty: i.qty,
        price: i.price * i.qty,
      })),
      total: subtotal,
      gst,
      grandTotal,
      receivedAt: new Date().toISOString(),
      dueAt: new Date(Date.now() + 48 * 3600000).toISOString(),
      priority: selectedCustomer?.segment === 'VIP' ? 'VIP' : 'Normal',
      staff: 'Ramesh',
      notes: '',
      paymentMethod,
    };

    setOrders(prev => [newOrder, ...prev]);
    setOrderCounter(prev => prev + 1);
    clearCart();
    toast.success(`Order ${orderId} placed successfully! 🎉`);
    return newOrder;
  }, [cart, selectedCustomer, orderCounter, clearCart]);

  const updateOrderStatus = useCallback((orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    if (newStatus === 'Delivered') {
      setConfetti(true);
      toast.success('Order delivered! Customer notified via WhatsApp 🎉');
      setTimeout(() => setConfetti(false), 3500);
    } else {
      toast.success(`Order ${orderId} moved to ${newStatus}`);
    }
  }, []);

  const addNotification = useCallback((msg) => {
    setNotifications(prev => [{ id: Date.now(), msg, time: new Date() }, ...prev.slice(0, 9)]);
  }, []);

  const todayStats = {
    revenue: orders.filter(o => o.receivedAt?.startsWith('2026-04-28')).reduce((s, o) => s + o.grandTotal, 0),
    pending: orders.filter(o => ['Received', 'In-Process'].includes(o.status)).length,
    ready: orders.filter(o => o.status === 'Ready for Pickup').length,
    delivered: orders.filter(o => o.status === 'Delivered').length,
  };

  return (
    <AppContext.Provider value={{
      currentPage, setCurrentPage,
      sidebarCollapsed, setSidebarCollapsed,
      darkMode, setDarkMode,
      orders, setOrders,
      customers, setCustomers,
      staff, setStaff,
      cart, addToCart, removeFromCart, updateCartItem, clearCart, placeOrder,
      selectedCustomer, setSelectedCustomer,
      aiChatOpen, setAiChatOpen,
      notifications, addNotification,
      todayStats,
      confetti,
      updateOrderStatus,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
