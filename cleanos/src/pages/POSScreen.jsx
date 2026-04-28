import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GARMENTS, SERVICE_TYPES, CUSTOMERS, UPSELL_SUGGESTIONS } from '../data/mockData';
import {
  Search, Plus, Minus, Trash2, Bot, MessageCircle, Printer, X, AlertTriangle,
  User, Phone, Mail, MapPin, Hash, RotateCcw, Save, QrCode, ChevronDown
} from 'lucide-react';
import toast from 'react-hot-toast';

/* ── Stain Modal ── */
function StainModal({ open, onClose }) {
  const [marks, setMarks] = useState([]);
  if (!open) return null;
  const handleClick = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width * 100).toFixed(0);
    const y = ((e.clientY - r.top) / r.height * 100).toFixed(0);
    setMarks(p => [...p, { x, y, id: Date.now() }]);
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 460 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
          <div>
            <div className="section-title" style={{ fontSize: 16 }}>Mark Stain / Damage</div>
            <div className="section-subtitle">Click on the diagram to mark affected areas</div>
          </div>
          <button className="btn-icon" onClick={onClose}><X size={15} /></button>
        </div>
        <div onClick={handleClick}
          style={{ position: 'relative', cursor: 'crosshair', border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg-page)', overflow: 'hidden' }}>
          <svg viewBox="0 0 200 380" width="100%" style={{ display: 'block' }}>
            <rect x="70" y="10" width="60" height="55" rx="18" fill="none" stroke="#D1D5DB" strokeWidth="1.5" />
            <rect x="55" y="68" width="90" height="115" rx="8" fill="none" stroke="#D1D5DB" strokeWidth="1.5" />
            <rect x="18" y="68" width="37" height="100" rx="8" fill="none" stroke="#D1D5DB" strokeWidth="1.5" />
            <rect x="145" y="68" width="37" height="100" rx="8" fill="none" stroke="#D1D5DB" strokeWidth="1.5" />
            <rect x="60" y="183" width="35" height="130" rx="8" fill="none" stroke="#D1D5DB" strokeWidth="1.5" />
            <rect x="105" y="183" width="35" height="130" rx="8" fill="none" stroke="#D1D5DB" strokeWidth="1.5" />
            {marks.map(m => (
              <circle key={m.id} cx={m.x * 2} cy={m.y * 3.8} r={9} fill="rgba(239,68,68,0.35)" stroke="#EF4444" strokeWidth="1.5" />
            ))}
          </svg>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12 }}>
          {marks.length === 0 ? 'Click above to mark damage areas' : `${marks.length} area(s) marked`}
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
          <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setMarks([])}>Clear All</button>
          <button className="btn-primary" style={{ flex: 2, justifyContent: 'center' }} onClick={onClose}>Save Marks</button>
        </div>
      </div>
    </div>
  );
}

/* ── UPI Modal ── */
function UPIModal({ open, onClose, amount, onPay }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()} style={{ maxWidth: 360, textAlign: 'center' }}>
        <div className="section-title" style={{ fontSize: 16, marginBottom: 4 }}>UPI Payment</div>
        <div className="section-subtitle" style={{ marginBottom: 20 }}>Scan the QR code to pay ₹{amount.toFixed(0)}</div>
        <div style={{ width: 156, height: 156, margin: '0 auto 16px', background: 'white', borderRadius: 12, padding: 8, border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 100 100" width="140">
            <rect width="100" height="100" fill="white" />
            {Array.from({ length: 7 }, (_, r) =>
              Array.from({ length: 7 }, (_, c) => {
                const isBorder = (r < 3 && c < 3) || (r < 3 && c > 3) || (r > 3 && c < 3);
                const filled = isBorder || (r === 3 && c === 3) || Math.random() > 0.5;
                return filled ? <rect key={`${r}-${c}`} x={c * 14 + 1} y={r * 14 + 1} width="12" height="12" fill="#111827" rx="1" /> : null;
              })
            )}
          </svg>
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 14 }}>UPI ID: cleanos@paytm</div>
        <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 26, fontWeight: 700, color: 'var(--primary)', marginBottom: 20 }}>₹{amount.toFixed(0)}</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-secondary" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
          <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={onPay}>✓ Payment Done</button>
        </div>
      </div>
    </div>
  );
}

/* ── Toggle switch ── */
function Toggle({ on, onChange, label }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
      <button type="button" className="toggle-track" onClick={() => onChange(!on)}
        style={{ background: on ? 'var(--primary)' : '#D1D5DB' }}>
        <div className="toggle-thumb" style={{ left: on ? 23 : 3 }} />
      </button>
      {label && <span style={{ fontSize: 13, color: 'var(--text-body)', fontWeight: 500 }}>{label}</span>}
    </label>
  );
}

/* ── Input row with label ── */
function Field({ label, required, children }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>
        {label}{required && <span style={{ color: 'var(--error)', marginLeft: 2 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

export default function POSScreen() {
  const { cart, addToCart, removeFromCart, updateCartItem, clearCart, placeOrder, selectedCustomer, setSelectedCustomer } = useApp();

  // Garment & service state
  const [selectedGarment, setSelectedGarment] = useState(null);
  const [serviceMap, setServiceMap] = useState({});
  const [stainModal, setStainModal] = useState(false);
  const [upiModal, setUpiModal] = useState(false);
  const [payMethod, setPayMethod] = useState('Cash');

  // Customer details form state
  const [form, setForm] = useState({ name: '', mobile: '', email: '', address: '', landmark: '', pincode: '' });
  const [sameDelivery, setSameDelivery] = useState(true);
  const [isReturning, setIsReturning] = useState(false);
  const [saveAsNew, setSaveAsNew] = useState(false);
  const [phoneSearch, setPhoneSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = CUSTOMERS.filter(c =>
    phoneSearch.length >= 3 && (c.phone.includes(phoneSearch) || c.name.toLowerCase().includes(phoneSearch.toLowerCase()))
  ).slice(0, 4);

  const handleSelectReturning = (c) => {
    setForm({ name: c.name, mobile: c.phone, email: c.email || '', address: '', landmark: '', pincode: '' });
    setSelectedCustomer(c);
    setPhoneSearch(c.phone);
    setShowSuggestions(false);
    toast.success(`Customer "${c.name}" loaded! ✔`);
  };

  const setField = (key, val) => setForm(p => ({ ...p, [key]: val }));

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;

  const upsell = (() => {
    if (!cart.length) return null;
    const id = cart[cart.length - 1]?.garmentId;
    return UPSELL_SUGGESTIONS[id] || UPSELL_SUGGESTIONS.default;
  })();

  const handleGarmentClick = (g) => {
    const svc = serviceMap[g.id] || 'dry-clean';
    if (!g.basePrice[svc]) { toast.error(`${g.name} doesn't support ${svc}`); return; }
    addToCart(g, svc);
    setSelectedGarment(g.id);
    toast.success(`${g.icon} ${g.name} added!`, { duration: 1400 });
  };

  const handlePlaceOrder = () => {
    if (!form.name.trim() && !selectedCustomer) { toast.error('Please enter customer name'); return; }
    if (payMethod === 'UPI') { setUpiModal(true); return; }
    placeOrder(payMethod);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px 300px', height: 'calc(100vh - 60px)', overflow: 'hidden', gap: 0 }}>

      {/* ── LEFT: Garment Grid ── */}
      <div style={{ padding: 20, overflowY: 'auto', borderRight: '1px solid var(--border)' }}>
        <div style={{ marginBottom: 18 }}>
          <h2 className="section-title" style={{ fontSize: 18 }}>New Order</h2>
          <p className="section-subtitle">Select garments to add to cart</p>
        </div>

        {/* Service legend */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
          {SERVICE_TYPES.map(s => (
            <span key={s.id} className={`service-pill active-${s.id}`} style={{ cursor: 'default' }}>{s.label}</span>
          ))}
        </div>

        {/* Garment grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 16 }}>
          {GARMENTS.map(g => {
            const svc = serviceMap[g.id] || 'dry-clean';
            const isSelected = selectedGarment === g.id;
            return (
              <div key={g.id}
                onClick={() => handleGarmentClick(g)}
                style={{
                  background: isSelected ? 'var(--bg-green-soft)' : 'var(--bg-card)',
                  border: `1.5px solid ${isSelected ? 'rgba(26,122,74,0.5)' : 'var(--border)'}`,
                  borderRadius: 14, padding: '14px 10px', cursor: 'pointer', textAlign: 'center',
                  transition: 'all 0.18s', boxShadow: isSelected ? '0 0 0 3px rgba(26,122,74,0.1)' : 'var(--shadow-card)',
                }}
                onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.borderColor = 'rgba(26,122,74,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-hover)'; } }}
                onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-card)'; } }}
              >
                <div style={{ fontSize: 28, marginBottom: 6 }}>{g.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-h)', marginBottom: 6 }}>{g.name}</div>
                {/* Per-garment service selector */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', marginBottom: 6 }}>
                  {SERVICE_TYPES.filter(s => g.basePrice[s.id] > 0).map(s => (
                    <span key={s.id}
                      className={`service-pill ${(serviceMap[g.id] || 'dry-clean') === s.id ? `active-${s.id}` : ''}`}
                      style={{ fontSize: 9, padding: '1px 6px' }}
                      onClick={e => { e.stopPropagation(); setServiceMap(p => ({ ...p, [g.id]: s.id })); }}
                    >{s.label}</span>
                  ))}
                </div>
                <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 12, fontWeight: 700, color: 'var(--primary)' }}>
                  ₹{g.basePrice[svc] || 0}
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Upsell */}
        {upsell && cart.length > 0 && (
          <div className="ai-banner">
            <Bot size={16} style={{ color: 'var(--primary)', flexShrink: 0 }} />
            <div style={{ fontSize: 12, color: 'var(--text-body)', flex: 1 }}>
              <span style={{ color: 'var(--primary)', fontWeight: 700 }}>🤖 AI Suggests: </span>{upsell}
            </div>
            <button className="btn-green-soft" style={{ padding: '5px 12px', fontSize: 11, flexShrink: 0 }}>Add</button>
          </div>
        )}
      </div>

      {/* ── MIDDLE: Cart ── */}
      <div style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border)' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-h)' }}>Cart ({cart.length})</span>
          {cart.length > 0 && (
            <button className="btn-danger" onClick={clearCart} style={{ padding: '4px 10px', fontSize: 11 }}>
              <X size={11} />Clear
            </button>
          )}
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 14px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 16px' }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>🧺</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Cart is empty<br />Select garments from the left</div>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} style={{ background: 'var(--bg-page)', border: '1px solid var(--border)', borderRadius: 12, padding: 12, marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 20 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-h)' }}>{item.garmentName}</div>
                      <span className={`service-pill active-${item.service}`} style={{ fontSize: 10 }}>
                        {SERVICE_TYPES.find(s => s.id === item.service)?.label}
                      </span>
                    </div>
                  </div>
                  <button className="btn-icon" style={{ width: 26, height: 26, borderRadius: 6 }} onClick={() => removeFromCart(item.id)}>
                    <Trash2 size={12} style={{ color: 'var(--error)' }} />
                  </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <button className="btn-icon" style={{ width: 24, height: 24, borderRadius: 6 }} onClick={() => updateCartItem(item.id, { qty: Math.max(1, item.qty - 1) })}><Minus size={10} /></button>
                    <span style={{ fontFamily: 'monospace', fontWeight: 700, minWidth: 20, textAlign: 'center', fontSize: 14 }}>{item.qty}</span>
                    <button className="btn-icon" style={{ width: 24, height: 24, borderRadius: 6 }} onClick={() => updateCartItem(item.id, { qty: item.qty + 1 })}><Plus size={10} /></button>
                  </div>
                  <span style={{ fontFamily: 'Geist Mono, monospace', fontWeight: 700, color: 'var(--primary)', fontSize: 14 }}>₹{(item.price * item.qty).toFixed(0)}</span>
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 8, alignItems: 'center' }}>
                  <input
                    className="input-field" placeholder="Note..." value={item.notes}
                    onChange={e => updateCartItem(item.id, { notes: e.target.value })}
                    style={{ fontSize: 11, padding: '5px 8px' }}
                  />
                  <button className="btn-icon" style={{ width: 28, height: 28, flexShrink: 0, borderRadius: 6 }}
                    onClick={() => setStainModal(true)} title="Mark stain/damage">
                    <AlertTriangle size={12} style={{ color: item.hasStain ? 'var(--error)' : undefined }} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart totals */}
        {cart.length > 0 && (
          <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border)', background: 'var(--bg-page)' }}>
            {[['Subtotal', `₹${subtotal.toFixed(0)}`], ['GST (18%)', `₹${gst.toFixed(0)}`]].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 5 }}>
                <span>{l}</span><span style={{ fontFamily: 'monospace' }}>{v}</span>
              </div>
            ))}
            <div style={{ height: 1, background: 'var(--border)', margin: '8px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 16 }}>
              <span style={{ color: 'var(--text-h)' }}>Total</span>
              <span style={{ fontFamily: 'Geist Mono, monospace', color: 'var(--primary)' }}>₹{grandTotal.toFixed(0)}</span>
            </div>
          </div>
        )}
      </div>

      {/* ── RIGHT: Customer Details ── */}
      <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        {/* Section header */}
        <div style={{ padding: '16px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--bg-green-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={15} style={{ color: 'var(--primary)' }} />
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-h)' }}>Customer Details</span>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>

          {/* Returning customer toggle */}
          <div style={{ background: 'var(--bg-page)', border: '1px solid var(--border)', borderRadius: 12, padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isReturning ? 10 : 0 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-h)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <RotateCcw size={13} style={{ color: 'var(--primary)' }} /> Returning Customer?
              </span>
              <Toggle on={isReturning} onChange={setIsReturning} />
            </div>
            {isReturning && (
              <div style={{ position: 'relative' }}>
                <Phone size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)' }} />
                <input
                  className="input-field"
                  placeholder="Search by phone or name..."
                  value={phoneSearch}
                  onChange={e => { setPhoneSearch(e.target.value); setShowSuggestions(true); }}
                  style={{ paddingLeft: 30, fontSize: 12 }}
                />
                {showSuggestions && suggestions.length > 0 && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, zIndex: 50, boxShadow: 'var(--shadow-dropdown)', overflow: 'hidden', marginTop: 4 }}>
                    {suggestions.map(c => (
                      <div key={c.id} onClick={() => handleSelectReturning(c)}
                        style={{ padding: '9px 12px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background 0.12s' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-hover)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                      >
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-h)' }}>{c.name}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.phone}</div>
                        </div>
                        <span className={`badge seg-${c.segment.replace(' ', '-')}`} style={{ fontSize: 10 }}>{c.segment}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Form fields */}
          <Field label="Full Name" required>
            <div style={{ position: 'relative' }}>
              <User size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)' }} />
              <input className="input-field" placeholder="e.g. Arjun Sharma" value={form.name} onChange={e => setField('name', e.target.value)} style={{ paddingLeft: 30 }} />
            </div>
          </Field>

          <Field label="Mobile Number" required>
            <div className="input-group">
              <div className="input-prefix">
                <span>🇮🇳</span> +91
              </div>
              <input
                className="input-field" type="tel" placeholder="9876543210"
                value={form.mobile} onChange={e => setField('mobile', e.target.value.slice(0, 10))}
                maxLength={10}
              />
            </div>
          </Field>

          <Field label="Email Address">
            <div style={{ position: 'relative' }}>
              <Mail size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)' }} />
              <input className="input-field" type="email" placeholder="optional" value={form.email} onChange={e => setField('email', e.target.value)} style={{ paddingLeft: 30 }} />
            </div>
          </Field>

          <Field label="Pickup Address" required>
            <div style={{ position: 'relative' }}>
              <MapPin size={13} style={{ position: 'absolute', left: 10, top: 10, color: 'var(--text-faint)' }} />
              <textarea
                className="input-field" rows={3} placeholder="Street, area, city..."
                value={form.address} onChange={e => setField('address', e.target.value)}
                style={{ paddingLeft: 30 }}
              />
            </div>
          </Field>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Field label="Landmark">
              <input className="input-field" placeholder="optional" value={form.landmark} onChange={e => setField('landmark', e.target.value)} style={{ fontSize: 12 }} />
            </Field>
            <Field label="Pincode" required>
              <div style={{ position: 'relative' }}>
                <Hash size={12} style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-faint)' }} />
                <input className="input-field" placeholder="110001" maxLength={6}
                  value={form.pincode} onChange={e => setField('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                  style={{ paddingLeft: 26, fontSize: 12 }} />
              </div>
            </Field>
          </div>

          {/* Same delivery toggle */}
          <div style={{ background: 'var(--bg-page)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 12px' }}>
            <Toggle on={sameDelivery} onChange={setSameDelivery} label="Same address for delivery?" />
          </div>

          {/* Save as customer */}
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: 'var(--text-body)' }}>
            <input type="checkbox" checked={saveAsNew} onChange={e => setSaveAsNew(e.target.checked)}
              style={{ width: 15, height: 15, accentColor: 'var(--primary)' }} />
            <Save size={12} style={{ color: 'var(--primary)' }} />
            Save as new customer
          </label>
        </div>

        {/* ── Order summary + payment + place order ── */}
        <div style={{ padding: '14px 18px', borderTop: '1px solid var(--border)', background: 'var(--bg-card)' }}>
          {/* Summary */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>
              <span>{cart.length} item(s)</span>
              <span style={{ fontFamily: 'monospace' }}>₹{subtotal.toFixed(0)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>
              <span>GST 18%</span>
              <span style={{ fontFamily: 'monospace' }}>₹{gst.toFixed(0)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 16, borderTop: '1px solid var(--border)', paddingTop: 8 }}>
              <span style={{ color: 'var(--text-h)' }}>Total</span>
              <span style={{ fontFamily: 'Geist Mono, monospace', color: 'var(--primary)' }}>₹{grandTotal.toFixed(0)}</span>
            </div>
          </div>

          {/* Payment method */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 12 }}>
            {['Cash', 'Card', 'UPI', 'Wallet'].map(m => (
              <button key={m} onClick={() => setPayMethod(m)} style={{
                padding: '8px', borderRadius: 10, cursor: 'pointer', fontSize: 12, fontWeight: 600,
                background: payMethod === m ? 'var(--bg-green-soft)' : 'var(--bg-page)',
                border: `1.5px solid ${payMethod === m ? 'rgba(26,122,74,0.5)' : 'var(--border)'}`,
                color: payMethod === m ? 'var(--primary)' : 'var(--text-muted)',
                transition: 'all 0.15s', fontFamily: 'inherit',
              }}>
                {m === 'UPI' ? '📱 ' : m === 'Cash' ? '💵 ' : m === 'Card' ? '💳 ' : '👜 '}{m}
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <button
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: 14 }}
            onClick={handlePlaceOrder}
            disabled={cart.length === 0}
          >
            Place Order · ₹{grandTotal.toFixed(0)}
          </button>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center', fontSize: 12 }}><Printer size={13} />Receipt</button>
            <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center', fontSize: 12 }}><MessageCircle size={13} />WhatsApp</button>
          </div>
        </div>
      </div>

      <StainModal open={stainModal} onClose={() => setStainModal(false)} />
      <UPIModal open={upiModal} onClose={() => setUpiModal(false)} amount={grandTotal} onPay={() => { setUpiModal(false); placeOrder('UPI'); }} />
    </div>
  );
}
