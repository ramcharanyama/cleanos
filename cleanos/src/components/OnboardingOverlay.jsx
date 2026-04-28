import { useState } from 'react';

const STEPS = [
  { icon: '🏪', title: 'Welcome to CleanOS', desc: "Your AI-powered laundry management system. Let's take a quick 3-step tour." },
  { icon: '⌨️', title: 'Keyboard Shortcuts', desc: 'Press N for New Order, D for Dashboard, O for Orders. Work faster every day!' },
  { icon: '🤖', title: 'Meet Your AI Assistant', desc: 'The green bot icon (bottom-right) is your AI. Ask it anything about your store!' },
];

export default function OnboardingOverlay() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(() => localStorage.getItem('cleanos_onboarded') === 'true');

  if (done) return null;

  const finish = () => { localStorage.setItem('cleanos_onboarded', 'true'); setDone(true); };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(17,24,39,0.65)', backdropFilter: 'blur(6px)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: 'var(--bg-card)', borderRadius: 24, padding: 40, maxWidth: 460, width: '100%', textAlign: 'center', boxShadow: '0 32px 80px rgba(0,0,0,0.2)', animation: 'bounceIn 0.4s ease' }}>
        <div style={{ fontSize: 56, marginBottom: 14 }}>{STEPS[step].icon}</div>
        <h2 style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, fontSize: 22, marginBottom: 10, color: 'var(--text-h)' }}>
          {STEPS[step].title}
        </h2>
        <div style={{ width: 40, height: 3, borderRadius: 2, background: 'var(--primary)', margin: '0 auto 16px' }} />
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 30, fontSize: 14 }}>{STEPS[step].desc}</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 28 }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{ width: i === step ? 22 : 7, height: 7, borderRadius: 100, background: i === step ? 'var(--primary)' : '#E5E7EB', transition: 'all 0.3s' }} />
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          {step < STEPS.length - 1 ? (
            <>
              <button className="btn-secondary" onClick={finish}>Skip</button>
              <button className="btn-primary" onClick={() => setStep(s => s + 1)}>Next →</button>
            </>
          ) : (
            <button className="btn-primary" style={{ padding: '12px 36px' }} onClick={finish}>🚀 Get Started</button>
          )}
        </div>
      </div>
    </div>
  );
}
