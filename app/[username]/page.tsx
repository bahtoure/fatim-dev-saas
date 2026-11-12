"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import ProjectModal, { Project } from '../../components/ProjectModal';
import ContactSection from '../../components/ContactSection';

interface ProfileData {
  username: string;
  email: string;
  full_name: string;
  job_title: string;
  avatar_url: string;
  whatsapp: string;
  tech_stack: string[];
  services: { title: string; desc: string }[];
  projects: Project[];
}

export default function DynamicProfilePage() {
  const params = useParams();
  const usernameParam = params?.username ? decodeURIComponent(params.username as string).toLowerCase() : '';

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!usernameParam) return;
    supabase
      .from('profiles')
      .select('*')
      .eq('username', usernameParam)
      .single()
      .then(({ data }) => {
        if (data) setProfile(data);
        setLoading(false);
      });
  }, [usernameParam]);

  if (loading) {
    return <div style={{ minHeight: '100vh', backgroundColor: '#09090b', color: '#71717a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>Chargement du profil...</div>;
  }

  if (!profile) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#09090b', color: '#f4f4f5', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', gap: '16px' }}>
        <h1 style={{ fontSize: '20px', margin: 0 }}>Profil « {usernameParam} » introuvable</h1>
        <a href="/" style={{ fontSize: '13px', color: '#10b981', textDecoration: 'underline' }}>← Retour à l'accueil</a>
      </div>
    );
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#09090b', color: '#f4f4f5', fontFamily: 'system-ui, sans-serif', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '32px 24px', boxSizing: 'border-box' }}>
      
      {/* Barre supérieure */}
      <nav style={{ maxWidth: '960px', width: '100%', margin: '0 auto 28px auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#f4f4f5' }}>
          <img src="/logo-fatim.jpg" alt="Fatim Dev" style={{ height: '150px', borderRadius: '8px', border: '1px solid #27272a' }} />
        </a>
        <a href="/dashboard" style={{ fontSize: '12px', color: '#a1a1aa', textDecoration: 'none', backgroundColor: '#18181b', padding: '8px 12px', borderRadius: '6px', border: '1px solid #27272a' }}>Espace Pro →</a>
      </nav>

      <main style={{ maxWidth: '960px', width: '100%', margin: 'auto', display: 'flex', flexWrap: 'wrap', gap: '48px', alignItems: 'start' }}>
        
        {/* COLONNE GAUCHE DYNAMIQUE */}
        <section style={{ flex: '1.1 1 350px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img src={profile.avatar_url || '/profil.jpeg'} alt={profile.full_name} style={{ height: '84px', width: '84px', borderRadius: '14px', objectFit: 'cover', border: '1px solid #27272a' }} />
            <div>
              <h1 style={{ fontSize: '21px', fontWeight: 600, margin: '0 0 4px 0' }}>{profile.full_name}</h1>
              <p style={{ fontSize: '13px', color: '#a1a1aa', margin: '0 0 6px 0' }}>{profile.job_title}</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '3px 10px', borderRadius: '20px' }}>
                <span style={{ height: '6px', width: '6px', backgroundColor: '#10b981', borderRadius: '50%' }}></span>
                <span style={{ color: '#10b981', fontSize: '11px', fontWeight: 600 }}>Disponible pour nouveaux projets</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {profile.whatsapp && (
              <a 
                href={"https://wa.me/" + profile.whatsapp}
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ flex: 1, minWidth: '150px', backgroundColor: '#10b981', color: '#052e16', fontWeight: 600, fontSize: '12px', padding: '10px 14px', borderRadius: '8px', textDecoration: 'none', textAlign: 'center' }}
              >
                💬 Discuter sur WhatsApp
              </a>

            )}
            <button onClick={handleCopyEmail} type="button" style={{ flex: 1, minWidth: '150px', backgroundColor: '#18181b', color: '#e4e4e7', border: '1px solid #27272a', fontWeight: 500, fontSize: '12px', padding: '10px 14px', borderRadius: '8px', cursor: 'pointer' }}>
              {copied ? '✓ Email copié !' : '📋 Copier mon email'}
            </button>
          </div>

          {profile.projects && profile.projects.length > 0 && (
            <div style={{ borderTop: '1px solid #18181b', paddingTop: '18px' }}>
              <h3 style={{ fontSize: '11px', fontWeight: 600, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px 0' }}>Projets réalisés (Cliquez pour voir la démo)</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {profile.projects.map((proj) => (
                  <button key={proj.id} onClick={() => setSelectedProject(proj)} style={{ textAlign: 'left', backgroundColor: '#121214', border: '1px solid #27272a', padding: '14px', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#f4f4f5' }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '3px' }}>{proj.title}</div>
                      <div style={{ fontSize: '11px', color: '#a1a1aa' }}>{proj.category} • {proj.techs?.join(', ')}</div>
                    </div>
                    <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 500 }}>▶ Démo</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {profile.tech_stack && profile.tech_stack.length > 0 && (
            <div>
              <h3 style={{ fontSize: '11px', fontWeight: 600, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 10px 0' }}>Technologies maîtrisées</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {profile.tech_stack.map((t) => <span key={t} style={{ fontSize: '12px', color: '#e4e4e7', backgroundColor: '#18181b', border: '1px solid #27272a', padding: '4px 10px', borderRadius: '6px' }}>{t}</span>)}
              </div>
            </div>
          )}

          {profile.services && profile.services.length > 0 && (
            <div style={{ borderTop: '1px solid #18181b', paddingTop: '18px' }}>
              <h3 style={{ fontSize: '11px', fontWeight: 600, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px 0' }}>Mes Services</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {profile.services.map((s, i) => (
                  <div key={i} style={{ backgroundColor: '#121214', border: '1px solid #1f1f23', padding: '12px', borderRadius: '8px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 500, marginBottom: '2px' }}>{s.title}</div>
                    <div style={{ fontSize: '12px', color: '#71717a' }}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* COLONNE DROITE */}
        <ContactSection />
      </main>

      <footer style={{ width: '100%', textAlign: 'center', borderTop: '1px solid #18181b', paddingTop: '24px', marginTop: '48px' }}>
        <p style={{ fontSize: '11px', color: '#52525b', textTransform: 'uppercase', margin: 0 }}>Propulsé par Fatim Dev SaaS</p>
      </footer>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
