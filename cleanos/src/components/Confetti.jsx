import { useEffect, useRef } from 'react';

const COLORS = ['#1A7A4A', '#22A05F', '#10B981', '#F59E0B', '#3B82F6', '#8B5CF6', '#EF4444'];
const rnd = (a, b) => a + Math.random() * (b - a);

export default function Confetti({ active }) {
  const canvasRef = useRef();

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = Array.from({ length: 110 }, () => ({
      x: rnd(0, canvas.width), y: rnd(-180, -5),
      size: rnd(6, 14), color: COLORS[Math.floor(Math.random() * COLORS.length)],
      speed: rnd(3, 9), rotation: rnd(0, 360), rotSpeed: rnd(-5, 5),
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        p.y += p.speed;
        p.x += Math.sin(p.rotation * Math.PI / 180);
        p.rotation += p.rotSpeed;
        if (p.y > canvas.height) { p.y = -20; p.x = rnd(0, canvas.width); }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.85;
        if (p.shape === 'rect') ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        else { ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill(); }
        ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [active]);

  if (!active) return null;
  return (
    <div className="confetti-container">
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', top: '38%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', animation: 'bounceIn 0.4s ease', background: 'white', borderRadius: 24, padding: '32px 48px', boxShadow: '0 24px 60px rgba(0,0,0,0.18)', zIndex: 9999 }}>
        <div style={{ fontSize: 52, marginBottom: 10 }}>🎉</div>
        <div style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 26, fontWeight: 800, color: 'var(--primary)', marginBottom: 6 }}>Order Delivered!</div>
        <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>Customer has been notified</div>
      </div>
    </div>
  );
}
