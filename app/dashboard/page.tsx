"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface Message {
  id: number;
  created_at: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  projet: string;
}

export default function DashboardPage() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchMessages();
      else setLoading(false);
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthError('Identifiants incorrects.');
    } else {
      setSession(data.session);
      fetchMessages();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const fetchMessages = async () => {
    setLoading(true);
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
    if (data) setMessages(data);
    setLoading(false);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', backgroundColor: '#18181b',
    border: '1px solid #27272a', borderRadius: '6px', fontSize: '13px',
    color: '#f4f4f5', outline: 'none', boxSizing: 'border-box', marginBottom: '12px'
  };

  // ÉCRAN DE CONNEXION
  if (!session) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#09090b', color: '#f4f4f5', fontFamily: 'system-ui, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <form onSubmit={handleLogin} style={{ backgroundColor: '#121214', border: '1px solid #27272a', borderRadius: '12px', padding: '28px', maxWidth: '380px', width: '100%' }}>
          
          {/* Logo bien placé à l'intérieur du return */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <img 
              src="/logo-fatim.jpg" 
              alt="Fatim Dev Logo" 
              style={{ height: '220px', width: 'auto', borderRadius: '8px', border: '1px solid #27272a', objectFit: 'cover' }} 
            />
          </div>

          <h1 style={{ fontSize: '18px', fontWeight: 600, margin: '0 0 6px 0', textAlign: 'center' }}>Accès Espace Développeur</h1>
          <p style={{ fontSize: '12px', color: '#71717a', margin: '0 0 20px 0', textAlign: 'center' }}>Connectez-vous pour consulter vos demandes de devis.</p>
          
          <input type="email" required placeholder="Votre email" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" required placeholder="Mot de passe" style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} />
          
          {authError && <p style={{ color: '#ef4444', fontSize: '12px', margin: '0 0 12px 0' }}>{authError}</p>}
          
          <button type="submit" style={{ width: '100%', backgroundColor: '#f4f4f5', color: '#09090b', fontWeight: 600, padding: '10px', borderRadius: '6px', border: 'none', fontSize: '13px', cursor: 'pointer' }}>
            Se connecter
          </button>
        </form>
      </div>
    );
  }

  // DASHBOARD PROTÉGÉ
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#09090b', color: '#f4f4f5', fontFamily: 'system-ui, sans-serif', padding: '40px 24px', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #18181b', paddingBottom: '20px', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img src="/logo-fatim.jpg" alt="Fatim Dev" style={{ height: '54px', width: 'auto', borderRadius: '8px', border: '1px solid #27272a' }} />
            <div>
              <h1 style={{ fontSize: '19px', fontWeight: 600, margin: '0 0 4px 0' }}>Tableau de bord • Demandes reçues</h1>
              <p style={{ fontSize: '12px', color: '#71717a', margin: 0 }}>Connecté en tant que {session.user.email}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={fetchMessages} style={{ backgroundColor: '#18181b', color: '#e4e4e7', border: '1px solid #27272a', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>↻ Actualiser</button>
            <a href="/fatiha" style={{ backgroundColor: '#f4f4f5', color: '#09090b', fontWeight: 600, padding: '8px 12px', borderRadius: '6px', fontSize: '12px', textDecoration: 'none' }}>Mon profil ↗</a>
            <button onClick={handleLogout} style={{ backgroundColor: 'transparent', color: '#ef4444', border: '1px solid #27272a', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>Déconnexion</button>
          </div>
        </header>

        {loading ? (
          <p style={{ color: '#71717a', fontSize: '14px' }}>Chargement...</p>
        ) : messages.length === 0 ? (
          <div style={{ backgroundColor: '#121214', border: '1px solid #27272a', borderRadius: '12px', padding: '40px', textAlign: 'center', color: '#71717a', fontSize: '14px' }}>Aucune demande reçue.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {messages.map((msg) => (
              <div key={msg.id} style={{ backgroundColor: '#121214', border: '1px solid #27272a', borderRadius: '12px', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <span style={{ fontSize: '15px', fontWeight: 600 }}>{msg.prenom} {msg.nom}</span>
                    <div style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '2px' }}>📧 {msg.email} {msg.telephone && `• 📱 ${msg.telephone}`}</div>
                  </div>
                  <span style={{ fontSize: '11px', color: '#71717a', backgroundColor: '#18181b', padding: '4px 8px', borderRadius: '4px' }}>
                    {new Date(msg.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: '#d4d4d8', lineHeight: '1.6', backgroundColor: '#18181b', padding: '12px', borderRadius: '8px', margin: '0 0 14px 0', whiteSpace: 'pre-wrap' }}>{msg.projet}</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a href={`mailto:${msg.email}?subject=Suite à votre demande de projet`} style={{ fontSize: '12px', color: '#f4f4f5', backgroundColor: '#27272a', padding: '6px 12px', borderRadius: '6px', textDecoration: 'none' }}>✉️ Répondre par email</a>
                  {msg.telephone && (
                    <a href={`https://wa.me{msg.telephone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: '#052e16', backgroundColor: '#10b981', fontWeight: 600, padding: '6px 12px', borderRadius: '6px', textDecoration: 'none' }}>💬 Contacter sur WhatsApp</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
