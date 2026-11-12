"use client";
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../lib/supabase';

export default function ContactSection() {
  const params = useParams();
  const developerUsername = params?.username ? decodeURIComponent(params.username as string) : 'fatiha';

  const [formData, setFormData] = useState({ nom: '', prenom: '', email: '', telephone: '', projet: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const { error } = await supabase
      .from('messages')
      .insert([
        {
          developer_username: developerUsername,
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          telephone: formData.telephone,
          projet: formData.projet,
        },
      ]);

    if (error) {
      setErrorMsg(error.message);
      setStatus('error');
    } else {
      setStatus('success');
      setFormData({ nom: '', prenom: '', email: '', telephone: '', projet: '' });
    }
  };

  const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 12px', backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '6px', fontSize: '13px', color: '#f4f4f5', outline: 'none', boxSizing: 'border-box' };
  const labelStyle: React.CSSProperties = { fontSize: '11px', fontWeight: 500, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.05em' };

  return (
    <div style={{ flex: '1.3 1 360px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <section style={{ backgroundColor: '#121214', border: '1px solid #27272a', borderRadius: '12px', padding: '28px', boxSizing: 'border-box' }}>
        <header style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 4px 0' }}>Démarrer une collaboration</h2>
          <p style={{ fontSize: '12px', color: '#71717a', margin: 0 }}>Remplissez ce brief. Réponse garantie sous 24h ouvrées.</p>
        </header>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={labelStyle}>Nom</label>
              <input type="text" required placeholder="Bailly" style={inputStyle} value={formData.nom} onChange={(e) => setFormData({...formData, nom: e.target.value})} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={labelStyle}>Prénom</label>
              <input type="text" required placeholder="Marc" style={inputStyle} value={formData.prenom} onChange={(e) => setFormData({...formData, prenom: e.target.value})} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '14px' }}>
            <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={labelStyle}>Email pro</label>
              <input type="email" required placeholder="contact@entreprise.com" style={inputStyle} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={labelStyle}>Téléphone / WhatsApp</label>
              <input type="tel" placeholder="+228 90 00 00 00" style={inputStyle} value={formData.telephone} onChange={(e) => setFormData({...formData, telephone: e.target.value})} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
            <label style={labelStyle}>Détails du projet & Budget estimé</label>
            <textarea rows={4} required placeholder="Décrivez votre besoin..." style={{ ...inputStyle, resize: 'none' }} value={formData.projet} onChange={(e) => setFormData({...formData, projet: e.target.value})} />
          </div>

          <button type="submit" disabled={status === 'loading'} style={{ width: '100%', backgroundColor: '#f4f4f5', color: '#09090b', fontWeight: 600, padding: '12px', borderRadius: '6px', border: 'none', fontSize: '13px', cursor: 'pointer' }}>
            {status === 'loading' ? 'Enregistrement en cours...' : 'Envoyer la demande de devis'}
          </button>

          {status === 'success' && <p style={{ color: '#10b981', fontSize: '13px', marginTop: '14px', textAlign: 'center' }}>✓ Demande enregistrée et transmise avec succès !</p>}
          {status === 'error' && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '14px', textAlign: 'center' }}>✕ Erreur : {errorMsg}</p>}
        </form>
      </section>

      <section style={{ backgroundColor: '#121214', border: '1px solid #1f1f23', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ fontSize: '11px', fontWeight: 600, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 14px 0' }}>Comment nous travaillons ensemble</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
          <div><strong style={{ color: '#e4e4e7' }}>01. Analyse & Devis (24h) :</strong> <span style={{ color: '#71717a' }}>Étude de vos besoins et proposition chiffrée claire.</span></div>
          <div><strong style={{ color: '#e4e4e7' }}>02. Développement agile :</strong> <span style={{ color: '#71717a' }}>Suivi en temps réel avec lien de démonstration privé.</span></div>
          <div><strong style={{ color: '#e4e4e7' }}>03. Livraison & Support :</strong> <span style={{ color: '#71717a' }}>Mise en ligne, formation et maintenance incluse.</span></div>
        </div>
      </section>
    </div>
  );
}
