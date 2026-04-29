import { useState } from 'react';
import { GARMENTS, SERVICE_TYPES } from '../data/mockData';
import { Save, Bell, Receipt, Gift, Bot } from 'lucide-react';
import toast from 'react-hot-toast';

const TABS = ['Store Info', 'Pricing', 'Notifications', 'Receipt', 'Loyalty', 'AI Settings'];

function Toggle({ on, onChange }) {
  return (
    <button type="button" onClick={() => onChange(!on)}
      style={{ width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', background: on ? 'var(--primary)' : '#D1D5DB', flexShrink: 0 }}>
      <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: on ? 23 : 3, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
    </button>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState('Store Info');
  const [pricing, setPricing] = useState(() => {
    const p = {};
    GARMENTS.forEach(g => { p[g.id] = { ...g.basePrice }; });
    return p;
  });
  const [aiToggles, setAiToggles] = useState({ upsell: true, churnAlert: true, dailyBriefing: true, dynamicPricing: false, autoTag: true, receiptNotes: true });
  const [notifs, setNotifs] = useState({ whatsapp: true, sms: false, email: true });

  return (
    <div style={{ padding: 24, maxWidth: 940, margin: '0 auto', animation: 'fadeUp 0.35s ease' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 className="section-title" style={{ fontSize: 22 }}>Settings</h1>
        <p className="section-subtitle">Configure your store preferences</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 3, borderBottom: '2px solid var(--border)', marginBottom: 24, overflowX: 'auto' }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            padding: '10px 18px', fontSize: 13, fontWeight: 600,
            background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            color: activeTab === t ? 'var(--primary)' : 'var(--text-muted)',
            borderBottom: `2px solid ${activeTab === t ? 'var(--primary)' : 'transparent'}`,
            marginBottom: '-2px', whiteSpace: 'nowrap', transition: 'all 0.15s',
          }}>{t}</button>
        ))}
      </div>

      {/* Store Info */}
      {activeTab === 'Store Info' && (
        <div className="card" style={{ padding: 28 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {[
              { label: 'Store Name', val: 'Ram Premium Laundry' },
              { label: 'Owner Name', val: 'Ram Charan' },
              { label: 'Phone', val: '9876543210' },
              { label: 'Email', val: 'ram.laundry@gmail.com' },
              { label: 'Address', val: 'Shop 14, Connaught Place, New Delhi' },
              { label: 'GST Number', val: '07AABCU9603R1ZX' },
            ].map(f => (
              <Field key={f.label} label={f.label}>
                <input className="input-field" defaultValue={f.val} />
              </Field>
            ))}
          </div>
          <button className="btn-primary" style={{ marginTop: 24 }} onClick={() => toast.success('Store info saved!')}>
            <Save size={14} />Save Changes
          </button>
        </div>
      )}

      {/* Pricing */}
      {activeTab === 'Pricing' && (
        <div className="card" style={{ padding: 22 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-h)', marginBottom: 16 }}>Pricing per Garment (₹)</div>
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Garment</th>
                  {SERVICE_TYPES.map(s => <th key={s.id} style={{ textAlign: 'center' }}>{s.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {GARMENTS.map(g => (
                  <tr key={g.id}>
                    <td style={{ fontWeight: 600, color: 'var(--text-h)' }}>
                      <span style={{ marginRight: 6 }}>{g.icon}</span>{g.name}
                    </td>
                    {SERVICE_TYPES.map(s => (
                      <td key={s.id} style={{ textAlign: 'center' }}>
                        {g.basePrice[s.id] > 0 ? (
                          <input type="number" value={pricing[g.id]?.[s.id] || 0}
                            onChange={e => setPricing(p => ({ ...p, [g.id]: { ...p[g.id], [s.id]: Number(e.target.value) } }))}
                            style={{ width: 70, textAlign: 'center', background: 'var(--bg-page)', border: '1px solid var(--border)', color: 'var(--text-h)', borderRadius: 8, padding: '5px 8px', fontSize: 12, outline: 'none', fontFamily: 'Geist Mono, monospace' }}
                          />
                        ) : <span style={{ color: 'var(--text-faint)' }}>—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn-primary" style={{ marginTop: 18 }} onClick={() => toast.success('Pricing saved!')}>
            <Save size={14} />Save Pricing
          </button>
        </div>
      )}

      {/* Notifications */}
      {activeTab === 'Notifications' && (
        <div className="card" style={{ padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <Bell size={16} style={{ color: 'var(--primary)' }} />
            <span style={{ fontWeight: 700, fontSize: 15 }}>Notification Channels</span>
          </div>
          {[
            { key: 'whatsapp', icon: '💬', label: 'WhatsApp', desc: 'Send order updates via WhatsApp' },
            { key: 'sms', icon: '📱', label: 'SMS', desc: 'SMS for pickup notifications' },
            { key: 'email', icon: '📧', label: 'Email', desc: 'Order receipts via email' },
          ].map(n => (
            <div key={n.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ fontSize: 22 }}>{n.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-h)' }}>{n.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{n.desc}</div>
                </div>
              </div>
              <Toggle on={notifs[n.key]} onChange={() => { setNotifs(p => ({ ...p, [n.key]: !p[n.key] })); toast.success(`${n.label} ${notifs[n.key] ? 'disabled' : 'enabled'}`); }} />
            </div>
          ))}
        </div>
      )}

      {/* Receipt */}
      {activeTab === 'Receipt' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 18 }}>
          <div className="card" style={{ padding: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Receipt size={15} style={{ color: 'var(--primary)' }} />Receipt Template
            </div>
            {[
              { label: 'Header Text', val: 'Thank you for choosing us!' },
              { label: 'Footer Text', val: 'Your clothes deserve the best.' },
              { label: 'Tagline', val: 'Premium Laundry & Dry Cleaning' },
            ].map(f => (
              <div key={f.label} style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>{f.label}</label>
                <input className="input-field" defaultValue={f.val} />
              </div>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Show GST breakdown', 'Show care instructions', 'Show loyalty points'].map(l => (
                <label key={l} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', color: 'var(--text-body)' }}>
                  <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)', width: 14, height: 14 }} />
                  {l}
                </label>
              ))}
            </div>
            <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => toast.success('Receipt template saved!')}>
              <Save size={14} />Save Template
            </button>
          </div>
          {/* Preview */}
          <div className="card" style={{ padding: 20, fontFamily: 'Courier New, monospace', fontSize: 11, color: '#111' }}>
            <div style={{ textAlign: 'center', marginBottom: 10 }}>
              <strong style={{ fontSize: 13 }}>RAM PREMIUM LAUNDRY</strong><br />
              <span style={{ fontSize: 9 }}>Premium Laundry & Dry Cleaning</span><br />
              Connaught Place, New Delhi<br />
              GST: 07AABCU9603R1ZX
            </div>
            <div style={{ borderTop: '1px dashed #ccc', borderBottom: '1px dashed #ccc', padding: '7px 0', margin: '7px 0', fontSize: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Order:</span><span>ORD-1042</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Date:</span><span>28/04/2026</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Customer:</span><span>Arjun Sharma</span></div>
            </div>
            <div style={{ fontSize: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}><span>Suit 2pc × 1</span><span>₹350</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Shirt × 3</span><span>₹360</span></div>
            </div>
            <div style={{ borderTop: '1px dashed #ccc', paddingTop: 7, marginTop: 7, fontSize: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subtotal</span><span>₹710</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>GST 18%</span><span>₹127.8</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 12 }}><span>TOTAL</span><span>₹837.8</span></div>
            </div>
            <div style={{ textAlign: 'center', marginTop: 10, fontSize: 10, color: '#666' }}>Thank you for choosing us!</div>
          </div>
        </div>
      )}

      {/* Loyalty */}
      {activeTab === 'Loyalty' && (
        <div className="card" style={{ padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <Gift size={16} style={{ color: '#D97706' }} />
            <span style={{ fontWeight: 700, fontSize: 15 }}>Loyalty Program Configuration</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {[
              { label: 'Points per ₹100 spent', val: '5' },
              { label: 'Points to redeem for ₹100', val: '200' },
              { label: 'VIP threshold (visits)', val: '20' },
              { label: 'Dormant after (days)', val: '30' },
            ].map(f => (
              <Field key={f.label} label={f.label}>
                <input className="input-field" type="number" defaultValue={f.val} style={{ fontFamily: 'Geist Mono, monospace' }} />
              </Field>
            ))}
          </div>
          <button className="btn-primary" style={{ marginTop: 24 }} onClick={() => toast.success('Loyalty config saved!')}>
            <Save size={14} />Save Loyalty Config
          </button>
        </div>
      )}

      {/* AI Settings */}
      {activeTab === 'AI Settings' && (
        <div className="card" style={{ padding: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--bg-green-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={16} style={{ color: 'var(--primary)' }} />
            </div>
            <span style={{ fontWeight: 700, fontSize: 15 }}>AI Feature Preferences</span>
          </div>
          {[
            { key: 'upsell', label: 'Smart Upsell Engine', desc: 'Suggest add-ons during order creation' },
            { key: 'churnAlert', label: 'Customer Churn Alerts', desc: 'Flag dormant customers automatically' },
            { key: 'dailyBriefing', label: 'Daily Morning Briefing', desc: 'AI-generated store summary each morning' },
            { key: 'dynamicPricing', label: 'Dynamic Pricing Suggestions', desc: 'Suggest express surcharge during peak hours' },
            { key: 'autoTag', label: 'Auto Order Tagging', desc: 'AI assigns priority tags to new orders' },
            { key: 'receiptNotes', label: 'AI Care Instructions', desc: 'Auto-generate garment care notes on receipts' },
          ].map(a => (
            <div key={a.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-h)' }}>{a.label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{a.desc}</div>
              </div>
              <Toggle on={aiToggles[a.key]} onChange={() => setAiToggles(p => ({ ...p, [a.key]: !p[a.key] }))} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
