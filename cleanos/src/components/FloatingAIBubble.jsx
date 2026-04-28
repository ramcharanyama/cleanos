import { useState } from 'react';
import { Bot, X, Maximize2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import AIAssistant from '../pages/AIAssistant';

export default function FloatingAIBubble() {
  const { aiChatOpen, setAiChatOpen, setCurrentPage } = useApp();
  const [pulse, setPulse] = useState(true);

  return (
    <div className="chat-bubble">
      {aiChatOpen ? (
        <div style={{
          width: 360, height: 520,
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 20,
          overflow: 'hidden', display: 'flex', flexDirection: 'column',
          boxShadow: '0 24px 60px rgba(0,0,0,0.15)',
          animation: 'bounceIn 0.3s ease',
        }}>
          {/* Header */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-green-soft)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg,#1A7A4A,#22A05F)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={15} color="white" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-h)' }}>CleanOS AI</div>
                <div style={{ fontSize: 10, color: 'var(--primary)' }}>● Online</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 5 }}>
              <button className="btn-icon" style={{ width: 26, height: 26 }} onClick={() => { setAiChatOpen(false); setCurrentPage('ai'); }} title="Open full page">
                <Maximize2 size={11} />
              </button>
              <button className="btn-icon" style={{ width: 26, height: 26 }} onClick={() => setAiChatOpen(false)}>
                <X size={11} />
              </button>
            </div>
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <AIAssistant inline={false} />
          </div>
        </div>
      ) : (
        <button
          onClick={() => { setAiChatOpen(true); setPulse(false); }}
          style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'linear-gradient(135deg, #1A7A4A, #22A05F)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 24px rgba(26,122,74,0.45)',
            transition: 'transform 0.2s', position: 'relative',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          <Bot size={22} color="white" />
          {pulse && (
            <span style={{
              position: 'absolute', top: 1, right: 1,
              width: 12, height: 12, borderRadius: '50%',
              background: '#22A05F', border: '2px solid white',
              animation: 'pulseGreen 1.5s infinite',
            }} />
          )}
        </button>
      )}
    </div>
  );
}
