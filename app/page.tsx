"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [usernameInput, setUsernameInput] = useState('');
  const router = useRouter();

  const handleExplore = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = usernameInput.trim().toLowerCase() || 'fatiha';
    router.push(`/${encodeURIComponent(cleanName)}`);
  };

  const techs = ['Next.js', 'React', 'Django', 'Laravel', 'TypeScript', 'PostgreSQL', 'API REST', 'Architecture SaaS'];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#09090b', color: '#f4f4f5', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '24px 32px', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
      
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        @keyframes floatOrb1 {
          0%, 100% { transform: translate(-50%, 0) scale(1); }
          50% { transform: translate(-45%, 25px) scale(1.12); }
        }
        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, -20px) scale(1.15); }
        }
        @keyframes textGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes dotPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.8); }
          50% { transform: scale(1.2); box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
        }
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 200%; }
        }

        .bg-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridMove 8s linear infinite;
          mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
          pointer-events: none;
        }
        .gradient-text {
          background: linear-gradient(90deg, #10b981, #34d399, #06b6d4, #10b981);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textGradient 4s ease infinite;
        }
        .anim-1 { animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-2 { opacity: 0; animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards; }
        .anim-3 { opacity: 0; animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards; }
        .anim-4 { opacity: 0; animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.45s forwards; }

        .feature-card {
          background-color: rgba(18, 18, 20, 0.8);
          backdrop-filter: blur(8px);
          border: 1px solid #27272a;
          padding: 22px;
          border-radius: 12px;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: #10b981;
          box-shadow: 0 20px 30px -15px rgba(16, 185, 129, 0.25);
        }
        .btn-shimmer {
          position: relative; overflow: hidden;
          background-color: #10b981; color: #052e16;
          font-weight: 700; font-size: 13px; padding: 10px 20px;
          border-radius: 7px; border: none; cursor: pointer;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }
        .btn-shimmer:hover {
          background-color: #34d399;
          transform: scale(1.04);
        }
        .btn-shimmer::after {
          content: ''; position: absolute; top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
          transform: skewX(-20deg);
          animation: shimmer 3s infinite;
        }
        .marquee-track {
          display: flex; width: max-content;
          animation: marquee 22s linear infinite;
        }
      `}</style>

      {/* Grille animée + Orbes flottantes */}
      <div className="bg-grid" />
      <div style={{ position: 'absolute', top: '-100px', left: '50%', width: '550px', height: '320px', background: 'radial-gradient(circle, rgba(16,185,129,0.22) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', animation: 'floatOrb1 7s infinite ease-in-out' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '400px', height: '300px', background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', animation: 'floatOrb2 9s infinite ease-in-out' }} />

      {/* Barre de navigation */}
      <header className="anim-1" style={{ maxWidth: '1040px', width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/logo-fatim1.jpg" alt="Fatim Dev Logo" style={{ height: '256px', width: 'auto', borderRadius: '8px', border: '1px solid #27272a', objectFit: 'cover' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 700, fontSize: '16px', letterSpacing: '-0.02em' }}> </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <a href="/fatiha" style={{ fontSize: '13px', color: '#a1a1aa', textDecoration: 'none', padding: '8px 12px' }}>Mon profil</a>
          <a href="/dashboard" style={{ fontSize: '13px', backgroundColor: '#18181b', color: '#f4f4f5', border: '1px solid #27272a', padding: '8px 14px', borderRadius: '8px', textDecoration: 'none', fontWeight: 500 }}>Espace Développeur →</a>
        </div>
      </header>

      {/* Section Héro */}
      <main style={{ maxWidth: '760px', width: '100%', margin: 'auto', textAlign: 'center', padding: '40px 0', position: 'relative', zIndex: 10 }}>
        
        <div className="anim-1" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10b981', fontSize: '12px', fontWeight: 600, padding: '5px 14px', borderRadius: '20px', marginBottom: '24px' }}>
          <span>✨</span> La vitrine B2B pensée pour tous
        </div>

        <h1 className="anim-2" style={{ fontSize: 'clamp(32px, 5vw, 50px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: '1.15', margin: '0 0 20px 0' }}>
          Présentez vos projets et recevez vos <span className="gradient-text">demandes de devis</span> en un lien.
        </h1>

        <p className="anim-3" style={{ fontSize: '15px', color: '#a1a1aa', lineHeight: '1.6', maxWidth: '560px', margin: '0 auto 36px auto' }}>
          Fini les portfolios complexes. Affichez vos démonstrations vidéo, votre stack technique et convertissez vos visiteurs directement via WhatsApp ou formulaire qualifié.
        </p>

        {/* Barre interactive */}
        <form onSubmit={handleExplore} className="anim-3" style={{ display: 'flex', maxWidth: '450px', margin: '0 auto 44px auto', backgroundColor: '#121214', border: '1px solid #27272a', borderRadius: '10px', padding: '6px', boxShadow: '0 15px 35px -10px rgba(0,0,0,0.8)' }}>
          <span style={{ color: '#71717a', fontSize: '13px', padding: '10px 4px 10px 12px', userSelect: 'none' }}>Un réseau pour tous</span>
          <input type="text" onChange={(e) => setUsernameInput(e.target.value)} style={{ flex: 1, backgroundColor: 'transparent', border: 'none', color: '#f4f4f5', fontSize: '13px', outline: 'none', minWidth: '80px' }} />
          <button type="submit" className="btn-shimmer">Voir la page</button>
        </form>

        {/* Bandeau défilant infini (Marquee) */}
        <div className="anim-4" style={{ overflow: 'hidden', maxWidth: '640px', margin: '0 auto 48px auto', borderTop: '1px solid #18181b', borderBottom: '1px solid #18181b', padding: '12px 0', maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
          <div className="marquee-track">
            {[...techs, ...techs].map((tech, idx) => (
              <span key={idx} style={{ fontSize: '12px', color: '#71717a', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', marginRight: '32px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#10b981' }}>•</span> {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 3 Cartes avec effet de rebond au survol */}
        <div className="anim-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '18px', textAlign: 'left' }}>
          <div className="feature-card">
            <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px', color: '#f4f4f5' }}>🎥 Démos Vidéo HD</div>
            <p style={{ fontSize: '12px', color: '#71717a', margin: 0, lineHeight: '1.5' }}>Montrez vos applications locales en action sans même avoir besoin de les héberger.</p>
          </div>
          <div className="feature-card">
            <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px', color: '#f4f4f5' }}>⚡ Contact Instantané</div>
            <p style={{ fontSize: '12px', color: '#71717a', margin: 0, lineHeight: '1.5' }}>Connexion directe via WhatsApp et formulaire de brief structuré pour vos clients.</p>
          </div>
          <div className="feature-card">
            <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px', color: '#f4f4f5' }}>🔒 Dashboard Privé</div>
            <p style={{ fontSize: '12px', color: '#71717a', margin: 0, lineHeight: '1.5' }}>Centralisez toutes vos demandes de projets dans un espace sécurisé.</p>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer style={{ maxWidth: '1040px', width: '100%', margin: '0 auto', borderTop: '1px solid #18181b', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#52525b', flexWrap: 'wrap', gap: '10px', position: 'relative', zIndex: 10 }}>
        <span>© 2026 Fatim Dev • Conçu par Fatiha BAH-TOURE</span>
        <span>Tel: +228 92599026</span>
      </footer>

    </div>
  );
}