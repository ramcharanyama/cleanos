// Mock data for CleanOS - Indian Laundry POS System

export const GARMENTS = [
  { id: 'shirt', name: 'Shirt', icon: '👔', basePrice: { 'dry-clean': 120, 'wash-iron': 60, 'iron-only': 30, 'steam-press': 45 } },
  { id: 'trouser', name: 'Trouser', icon: '👖', basePrice: { 'dry-clean': 110, 'wash-iron': 55, 'iron-only': 25, 'steam-press': 40 } },
  { id: 'suit', name: 'Suit (2pc)', icon: '🤵', basePrice: { 'dry-clean': 350, 'wash-iron': 200, 'iron-only': 80, 'steam-press': 120 } },
  { id: 'saree', name: 'Saree', icon: '🥻', basePrice: { 'dry-clean': 280, 'wash-iron': 150, 'iron-only': 60, 'steam-press': 90 } },
  { id: 'jacket', name: 'Jacket', icon: '🧥', basePrice: { 'dry-clean': 250, 'wash-iron': 140, 'iron-only': 55, 'steam-press': 80 } },
  { id: 'blanket', name: 'Blanket', icon: '🛏️', basePrice: { 'dry-clean': 450, 'wash-iron': 280, 'iron-only': 0, 'steam-press': 200 } },
  { id: 'kurta', name: 'Kurta', icon: '👘', basePrice: { 'dry-clean': 130, 'wash-iron': 70, 'iron-only': 35, 'steam-press': 50 } },
  { id: 'coat', name: 'Coat', icon: '🧣', basePrice: { 'dry-clean': 320, 'wash-iron': 180, 'iron-only': 70, 'steam-press': 110 } },
  { id: 'jeans', name: 'Jeans', icon: '👗', basePrice: { 'dry-clean': 140, 'wash-iron': 75, 'iron-only': 30, 'steam-press': 50 } },
  { id: 'dress', name: 'Dress', icon: '👙', basePrice: { 'dry-clean': 200, 'wash-iron': 120, 'iron-only': 50, 'steam-press': 75 } },
  { id: 'tie', name: 'Tie', icon: '👔', basePrice: { 'dry-clean': 80, 'wash-iron': 40, 'iron-only': 20, 'steam-press': 30 } },
  { id: 'shoes', name: 'Shoes', icon: '👟', basePrice: { 'dry-clean': 200, 'wash-iron': 0, 'iron-only': 0, 'steam-press': 0 } },
];

export const SERVICE_TYPES = [
  { id: 'dry-clean', label: 'Dry Clean', color: '#7C3AED' },
  { id: 'wash-iron', label: 'Wash & Iron', color: '#00D4FF' },
  { id: 'iron-only', label: 'Iron Only', color: '#10B981' },
  { id: 'steam-press', label: 'Steam Press', color: '#F59E0B' },
];

export const CUSTOMERS = [
  { id: 'C001', name: 'Arjun Sharma', phone: '9876543210', email: 'arjun@gmail.com', city: 'Mumbai', visits: 24, lifetimeValue: 14820, lastVisit: '2026-04-20', loyaltyPoints: 740, preferredServices: ['dry-clean'], segment: 'VIP', avatar: 'AS' },
  { id: 'C002', name: 'Priya Mehta', phone: '9123456789', email: 'priya.mehta@yahoo.com', city: 'Delhi', visits: 18, lifetimeValue: 9340, lastVisit: '2026-04-25', loyaltyPoints: 467, preferredServices: ['wash-iron'], segment: 'Frequent', avatar: 'PM' },
  { id: 'C003', name: 'Rajesh Kumar', phone: '8765432109', email: 'rajesh.k@gmail.com', city: 'Bangalore', visits: 6, lifetimeValue: 3200, lastVisit: '2026-03-15', loyaltyPoints: 160, preferredServices: ['iron-only'], segment: 'At Risk', avatar: 'RK' },
  { id: 'C004', name: 'Sunita Patel', phone: '7654321098', email: 'sunita@gmail.com', city: 'Ahmedabad', visits: 2, lifetimeValue: 840, lastVisit: '2026-04-22', loyaltyPoints: 42, preferredServices: ['wash-iron'], segment: 'New', avatar: 'SP' },
  { id: 'C005', name: 'Vikram Singh', phone: '9988776655', email: 'vikram.s@outlook.com', city: 'Jaipur', visits: 31, lifetimeValue: 22500, lastVisit: '2026-04-28', loyaltyPoints: 1125, preferredServices: ['dry-clean', 'steam-press'], segment: 'VIP', avatar: 'VS' },
  { id: 'C006', name: 'Ananya Bose', phone: '6543210987', email: 'ananya.b@gmail.com', city: 'Kolkata', visits: 0, lifetimeValue: 1200, lastVisit: '2025-12-10', loyaltyPoints: 60, preferredServices: ['dry-clean'], segment: 'Dormant', avatar: 'AB' },
  { id: 'C007', name: 'Karthik Nair', phone: '9871234560', email: 'karthik.n@gmail.com', city: 'Chennai', visits: 14, lifetimeValue: 7800, lastVisit: '2026-04-18', loyaltyPoints: 390, preferredServices: ['wash-iron', 'iron-only'], segment: 'Frequent', avatar: 'KN' },
  { id: 'C008', name: 'Divya Reddy', phone: '9543216780', email: 'divya.r@gmail.com', city: 'Hyderabad', visits: 9, lifetimeValue: 4500, lastVisit: '2026-04-10', loyaltyPoints: 225, preferredServices: ['steam-press'], segment: 'At Risk', avatar: 'DR' },
  { id: 'C009', name: 'Mohit Gupta', phone: '9012345678', email: 'mohit.g@gmail.com', city: 'Pune', visits: 1, lifetimeValue: 380, lastVisit: '2026-04-26', loyaltyPoints: 19, preferredServices: ['wash-iron'], segment: 'New', avatar: 'MG' },
  { id: 'C010', name: 'Lakshmi Iyer', phone: '8901234567', email: 'lakshmi.i@gmail.com', city: 'Chennai', visits: 22, lifetimeValue: 16400, lastVisit: '2026-04-23', loyaltyPoints: 820, preferredServices: ['dry-clean', 'saree'], segment: 'VIP', avatar: 'LI' },
];

export const ORDERS = [
  { id: 'ORD-1042', customerId: 'C001', customerName: 'Arjun Sharma', phone: '9876543210', status: 'In-Process', items: [{ garment: 'Suit (2pc)', service: 'dry-clean', qty: 1, price: 350 }, { garment: 'Shirt', service: 'dry-clean', qty: 3, price: 360 }], total: 710, gst: 127.8, grandTotal: 837.8, receivedAt: '2026-04-28T09:00:00', dueAt: '2026-04-29T18:00:00', priority: 'VIP', staff: 'Ramesh', notes: 'Handle with care', paymentMethod: 'UPI' },
  { id: 'ORD-1041', customerId: 'C007', customerName: 'Karthik Nair', phone: '9871234560', status: 'Received', items: [{ garment: 'Jeans', service: 'wash-iron', qty: 2, price: 150 }, { garment: 'Shirt', service: 'wash-iron', qty: 5, price: 300 }], total: 450, gst: 81, grandTotal: 531, receivedAt: '2026-04-28T08:30:00', dueAt: '2026-04-28T20:00:00', priority: 'Urgent', staff: 'Suresh', notes: '', paymentMethod: 'Cash' },
  { id: 'ORD-1040', customerId: 'C005', customerName: 'Vikram Singh', phone: '9988776655', status: 'Quality Check', items: [{ garment: 'Saree', service: 'dry-clean', qty: 3, price: 840 }, { garment: 'Jacket', service: 'dry-clean', qty: 1, price: 250 }], total: 1090, gst: 196.2, grandTotal: 1286.2, receivedAt: '2026-04-27T14:00:00', dueAt: '2026-04-28T17:00:00', priority: 'VIP', staff: 'Priya', notes: 'Silk sarees - be careful', paymentMethod: 'Card' },
  { id: 'ORD-1039', customerId: 'C010', customerName: 'Lakshmi Iyer', phone: '8901234567', status: 'Ready for Pickup', items: [{ garment: 'Saree', service: 'steam-press', qty: 2, price: 180 }, { garment: 'Kurta', service: 'iron-only', qty: 4, price: 140 }], total: 320, gst: 57.6, grandTotal: 377.6, receivedAt: '2026-04-27T10:00:00', dueAt: '2026-04-28T12:00:00', priority: 'Normal', staff: 'Ramesh', notes: '', paymentMethod: 'UPI' },
  { id: 'ORD-1038', customerId: 'C002', customerName: 'Priya Mehta', phone: '9123456789', status: 'Delivered', items: [{ garment: 'Dress', service: 'dry-clean', qty: 2, price: 400 }, { garment: 'Jacket', service: 'wash-iron', qty: 1, price: 140 }], total: 540, gst: 97.2, grandTotal: 637.2, receivedAt: '2026-04-26T11:00:00', dueAt: '2026-04-27T18:00:00', priority: 'Normal', staff: 'Suresh', notes: '', paymentMethod: 'Card' },
  { id: 'ORD-1037', customerId: 'C005', customerName: 'Vikram Singh', phone: '9988776655', status: 'In-Process', items: [{ garment: 'Suit (2pc)', service: 'dry-clean', qty: 2, price: 700 }, { garment: 'Coat', service: 'dry-clean', qty: 1, price: 320 }], total: 1020, gst: 183.6, grandTotal: 1203.6, receivedAt: '2026-04-28T07:00:00', dueAt: '2026-04-28T15:00:00', priority: 'VIP', staff: 'Priya', notes: 'Express service', paymentMethod: 'Card' },
  { id: 'ORD-1036', customerId: 'C004', customerName: 'Sunita Patel', phone: '7654321098', status: 'Received', items: [{ garment: 'Saree', service: 'dry-clean', qty: 4, price: 1120 }], total: 1120, gst: 201.6, grandTotal: 1321.6, receivedAt: '2026-04-28T10:30:00', dueAt: '2026-04-30T18:00:00', priority: 'Normal', staff: 'Ramesh', notes: 'Wedding sarees', paymentMethod: 'UPI' },
  { id: 'ORD-1035', customerId: 'C003', customerName: 'Rajesh Kumar', phone: '8765432109', status: 'Delivered', items: [{ garment: 'Shirt', service: 'iron-only', qty: 10, price: 300 }, { garment: 'Trouser', service: 'iron-only', qty: 5, price: 125 }], total: 425, gst: 76.5, grandTotal: 501.5, receivedAt: '2026-04-26T09:00:00', dueAt: '2026-04-27T09:00:00', priority: 'Normal', staff: 'Suresh', notes: '', paymentMethod: 'Cash' },
];

export const STAFF = [
  { id: 'S001', name: 'Ramesh Yadav', role: 'Senior Presser', status: 'in', avatar: 'RY', ordersToday: 8, avgTime: '45 min', performance: [8, 10, 7, 12, 9, 11, 8], shift: '07:00 - 15:00' },
  { id: 'S002', name: 'Suresh Babu', role: 'Dry Clean Specialist', status: 'in', avatar: 'SB', ordersToday: 12, avgTime: '38 min', performance: [6, 9, 11, 8, 13, 10, 12], shift: '07:00 - 15:00' },
  { id: 'S003', name: 'Priya Devi', role: 'Quality Checker', status: 'in', avatar: 'PD', ordersToday: 15, avgTime: '22 min', performance: [14, 12, 16, 15, 18, 13, 15], shift: '09:00 - 17:00' },
  { id: 'S004', name: 'Ankit Verma', role: 'Cashier', status: 'out', avatar: 'AV', ordersToday: 0, avgTime: 'N/A', performance: [5, 7, 6, 8, 9, 7, 0], shift: '13:00 - 21:00' },
];

export const REVENUE_DATA = [
  { day: 'Mon', revenue: 8420, orders: 22 },
  { day: 'Tue', revenue: 12300, orders: 31 },
  { day: 'Wed', revenue: 9870, orders: 26 },
  { day: 'Thu', revenue: 14200, orders: 38 },
  { day: 'Fri', revenue: 18500, orders: 47 },
  { day: 'Sat', revenue: 24800, orders: 63 },
  { day: 'Sun', revenue: 21400, orders: 55 },
];

export const HOURLY_HEATMAP = [
  { hour: '8am', mon: 3, tue: 4, wed: 2, thu: 5, fri: 6, sat: 9, sun: 7 },
  { hour: '9am', mon: 7, tue: 8, wed: 6, thu: 9, fri: 11, sat: 15, sun: 13 },
  { hour: '10am', mon: 10, tue: 12, wed: 9, thu: 13, fri: 16, sat: 20, sun: 18 },
  { hour: '11am', mon: 8, tue: 9, wed: 8, thu: 11, fri: 14, sat: 17, sun: 15 },
  { hour: '12pm', mon: 5, tue: 6, wed: 5, thu: 7, fri: 9, sat: 12, sun: 10 },
  { hour: '1pm', mon: 6, tue: 7, wed: 6, thu: 8, fri: 10, sat: 14, sun: 12 },
  { hour: '2pm', mon: 9, tue: 10, wed: 8, thu: 11, fri: 13, sat: 18, sun: 16 },
  { hour: '3pm', mon: 11, tue: 13, wed: 10, thu: 14, fri: 17, sat: 22, sun: 19 },
  { hour: '4pm', mon: 13, tue: 15, wed: 12, thu: 16, fri: 19, sat: 25, sun: 22 },
  { hour: '5pm', mon: 15, tue: 17, wed: 14, thu: 18, fri: 22, sat: 28, sun: 25 },
  { hour: '6pm', mon: 12, tue: 14, wed: 11, thu: 15, fri: 19, sat: 24, sun: 21 },
  { hour: '7pm', mon: 8, tue: 9, wed: 7, thu: 10, fri: 13, sat: 17, sun: 14 },
];

export const GARMENT_VOLUME = [
  { name: 'Shirt', value: 342, color: '#00D4FF' },
  { name: 'Saree', value: 218, color: '#7C3AED' },
  { name: 'Suit', value: 156, color: '#10B981' },
  { name: 'Trouser', value: 198, color: '#F59E0B' },
  { name: 'Jacket', value: 112, color: '#EF4444' },
];

export const SERVICE_BREAKDOWN = [
  { name: 'Dry Clean', value: 45, color: '#7C3AED' },
  { name: 'Wash & Iron', value: 30, color: '#00D4FF' },
  { name: 'Iron Only', value: 15, color: '#10B981' },
  { name: 'Steam Press', value: 10, color: '#F59E0B' },
];

export const AI_INSIGHTS = [
  "Your Saturdays generate 40% more revenue than weekdays. Consider extending hours from 8pm to 10pm.",
  "Dry cleaning is your most profitable service at ₹1,242 avg revenue per day. Promote it more actively.",
  "Saree dry cleaning has the highest return rate — customers who send sarees once tend to come back 3x more.",
  "3 VIP customers haven't visited in 30+ days. A targeted WhatsApp message could recover ₹8,000+.",
  "Your peak hours are 4PM-6PM. Consider adding an extra staff member during this window.",
  "Order #1037 and #1041 are overdue. Prioritizing these can improve your on-time delivery rate.",
];

export const MONTHLY_REVENUE = [
  { month: 'Nov', revenue: 142000 },
  { month: 'Dec', revenue: 168000 },
  { month: 'Jan', revenue: 132000 },
  { month: 'Feb', revenue: 156000 },
  { month: 'Mar', revenue: 178000 },
  { month: 'Apr', revenue: 194000 },
];

export const AI_CHAT_RESPONSES = {
  "today's revenue": { text: "Today's revenue so far is **₹18,420** from **47 orders**. You're on track to beat yesterday's ₹14,200 by 29%. 🎉", type: 'stat' },
  "top customers": { text: "Your top 3 customers this month are:\n1. **Vikram Singh** — ₹22,500 lifetime value\n2. **Lakshmi Iyer** — ₹16,400 lifetime value\n3. **Arjun Sharma** — ₹14,820 lifetime value\n\nAll three are VIP tier and respond well to premium service messaging.", type: 'list' },
  "popular services": { text: "**Dry Cleaning** is your most popular service (45% of orders), followed by **Wash & Iron** (30%). Saturday sees 2.3x more dry clean requests than any other day.", type: 'stat' },
  "pending orders": { text: "You have **4 pending orders** right now:\n- #1042 (Arjun Sharma) — In Process\n- #1041 (Karthik Nair) — Received ⚠️ Overdue\n- #1036 (Sunita Patel) — Received\n- #1037 (Vikram Singh) — In Process ⚠️ Overdue", type: 'list' },
  "default": { text: "I'm analyzing your store data... Based on today's patterns, your store is performing well! Dry cleaning orders are up 15% vs last week. Would you like me to dive deeper into any specific metric?", type: 'text' }
};

export const UPSELL_SUGGESTIONS = {
  'suit': "Add fabric protection spray? 82% of suit orders include it. (+₹150)",
  'shirt': "Add starch finish for crispy shirts? 68% of customers love it. (+₹30/shirt)",
  'saree': "Add gold/silver lace protection treatment? Highly recommended. (+₹200)",
  'blanket': "Add anti-allergen treatment? Perfect for seasonal use. (+₹180)",
  'jacket': "Add waterproofing treatment? Great for monsoon season. (+₹250)",
  'default': "Add fabric softener for this order? 78% of similar orders include it. (+₹50)",
};

export const CARE_INSTRUCTIONS = {
  'shirt': "Hang immediately after pressing. Avoid folding for 2 hours. Store in breathable garment bag.",
  'suit': "Store on wide-shoulder hanger. Avoid plastic covers. Air for 24h before wearing.",
  'saree': "Store folded with tissue paper between folds. Avoid damp areas. Air dry if slightly damp.",
  'blanket': "Shake out and air before use. Store in a breathable cotton bag, not plastic.",
  'default': "Handle with care. Store in a cool, dry place away from direct sunlight.",
};
