import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Mic, X, Maximize2 } from 'lucide-react';
import { AI_CHAT_RESPONSES } from '../data/mockData';
import { BarChart, Bar, XAxis, ResponsiveContainer } from 'recharts';
import { REVENUE_DATA } from '../data/mockData';

const CHIPS = [
  "Show today's revenue",
  "Who are my top customers?",
  "Most popular services?",
  "Pending orders status",
];

const BRIEFING = {
  id: 'briefing', role: 'ai',
  text: "Good evening! 🌆 Here's your store summary for today:\n\n• **Revenue**: ₹18,420 from 47 orders (↑18%)\n• **Pending**: 4 orders need attention\n• **VIP orders**: 2 in progress\n• **Staff on duty**: 3 out of 4\n\nSaturday is approaching — your busiest day. Would you like a priority list?",
  chart: null,
  time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
  chips: ["Show priority orders", "Prepare for Saturday", "Notify VIP customers"],
};

function Bubble({ msg }) {
  const isAI = msg.role === 'ai';
  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: isAI ? 'flex-start' : 'flex-end', marginBottom: 14 }}>
      {isAI && (
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#1A7A4A,#22A05F)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, alignSelf: 'flex-end' }}>
          <Bot size={13} color="white" />
        </div>
      )}
      <div style={{ maxWidth: '76%' }}>
        <div style={{
          background: isAI ? 'var(--bg-card)' : 'var(--primary)',
          border: isAI ? '1px solid var(--border)' : 'none',
          borderRadius: isAI ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
          padding: '11px 14px',
          fontSize: 13,
          color: isAI ? 'var(--text-body)' : '#fff',
          lineHeight: 1.6,
          whiteSpace: 'pre-line',
          boxShadow: isAI ? 'var(--shadow-card)' : '0 4px 14px rgba(26,122,74,0.3)',
        }}>
          {msg.text.split(/(\*\*[^*]+\*\*)/).map((p, i) =>
            p.startsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : p
          )}
          {msg.chart && (
            <div style={{ marginTop: 10, background: 'var(--bg-page)', borderRadius: 8, padding: '8px 0' }}>
              <ResponsiveContainer width="100%" height={70}>
                <BarChart data={REVENUE_DATA.slice(-5)}>
                  <Bar dataKey="revenue" fill="#1A7A4A" radius={[3,3,0,0]} />
                  <XAxis dataKey="day" tick={{ fill: '#9CA3AF', fontSize: 9 }} axisLine={false} tickLine={false} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
        <div style={{ fontSize: 10, color: 'var(--text-faint)', marginTop: 3, paddingLeft: isAI ? 4 : 0, textAlign: isAI ? 'left' : 'right' }}>{msg.time}</div>
        {isAI && msg.chips && (
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 7 }}>
            {msg.chips.map(c => (
              <button key={c} style={{
                fontSize: 11, padding: '3px 10px', borderRadius: 100,
                background: 'var(--bg-green-soft)', color: 'var(--primary)',
                border: '1px solid rgba(26,122,74,0.2)', cursor: 'pointer',
                fontFamily: 'inherit', fontWeight: 600, transition: 'all 0.12s',
              }}
                onMouseEnter={e => { e.target.style.background = 'rgba(26,122,74,0.18)'; }}
                onMouseLeave={e => { e.target.style.background = 'var(--bg-green-soft)'; }}
              >{c}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AIAssistant({ inline = false }) {
  const [messages, setMessages] = useState([BRIEFING]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const bottomRef = useRef();

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);

  const getResp = (text) => {
    const lower = text.toLowerCase();
    for (const [key, val] of Object.entries(AI_CHAT_RESPONSES)) {
      if (key !== 'default' && lower.includes(key)) return { ...val, showChart: key.includes('revenue') };
    }
    return { ...AI_CHAT_RESPONSES.default, showChart: false };
  };

  const send = (text = input) => {
    if (!text.trim()) return;
    const t = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    setMessages(p => [...p, { id: Date.now(), role: 'user', text, time: t }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const resp = getResp(text);
      setMessages(p => [...p, { id: Date.now() + 1, role: 'ai', text: resp.text, chart: resp.showChart, time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), chips: ["Tell me more", "Show charts", "What's next?"] }]);
      setTyping(false);
    }, 1000 + Math.random() * 800);
  };

  const handleVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { alert('Voice not supported'); return; }
    const r = new SR();
    r.lang = 'en-IN';
    r.onresult = e => { send(e.results[0][0].transcript); setListening(false); };
    r.onend = () => setListening(false);
    setListening(true);
    r.start();
  };

  return (
    <div style={inline ? { display: 'flex', flexDirection: 'column', height: 'calc(100vh - 60px)', padding: 24, animation: 'fadeUp 0.35s ease' } : { display: 'flex', flexDirection: 'column', height: '100%' }}>
      {inline && (
        <div style={{ marginBottom: 18 }}>
          <h1 className="section-title" style={{ fontSize: 22 }}>AI Assistant</h1>
          <p className="section-subtitle">Ask anything about your store in plain language</p>
        </div>
      )}
      {inline && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
          {CHIPS.map(c => (
            <button key={c} onClick={() => send(c)} style={{
              padding: '7px 14px', borderRadius: 100, fontSize: 12, fontWeight: 500,
              background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-muted)',
              cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
            >{c}</button>
          ))}
        </div>
      )}

      <div className={inline ? 'card' : ''} style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', minHeight: 0, background: inline ? 'var(--bg-card)' : 'var(--bg-page)' }}>
        {messages.map(m => <Bubble key={m.id} msg={m} />)}
        {typing && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#1A7A4A,#22A05F)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Bot size={13} color="white" />
            </div>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '4px 14px 14px 14px', padding: '12px 14px', display: 'flex', gap: 5, alignItems: 'center', boxShadow: 'var(--shadow-card)' }}>
              {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)', animation: `pulseGreen 1.2s ${i*0.2}s infinite` }} />)}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 10, padding: inline ? '10px 0 0' : '10px 14px', background: inline ? 'transparent' : 'var(--bg-card)', borderTop: inline ? 'none' : '1px solid var(--border)' }}>
        <input className="input-field" placeholder="Ask anything about your store..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} style={{ flex: 1 }} />
        <button className="btn-icon" onClick={handleVoice} style={{ width: 40, height: 40, borderRadius: 10, background: listening ? '#FEE2E2' : undefined, borderColor: listening ? 'var(--error)' : undefined }}>
          <Mic size={15} style={{ color: listening ? 'var(--error)' : undefined }} />
        </button>
        <button className="btn-primary" onClick={() => send()} style={{ padding: '9px 14px' }}>
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
