"use client";

import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    projet: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // C'est ici que nous appellerons notre action serveur pour enregistrer les données plus tard
    try {
      console.log("Données reçues :", formData);
      // Simulation d'envoi réseau
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus('success');
      setFormData({ nom: '', prenom: '', email: '', projet: '' });
    } catch (error) {
      setStatus('error');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    backgroundColor: '#18181b',
    border: '1px solid #27272a',
    borderRadius: '6px',
    fontSize: '13px',
    color: '#f4f4f5',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: status === 'loading' ? '#71717a' : '#f4f4f5',
    color: '#09090b',
    fontWeight: 500,
    padding: '12px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '13px',
    cursor: status === 'loading' ? 'not-allowed' : 'pointer',
    marginTop: '8px',
    transition: 'background-color 0.2s'
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: 0 }}>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '11px', fontWeight: 500, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nom</label>
          <input 
            type="text" 
            required 
            placeholder="Bailly" 
            style={inputStyle} 
            value={formData.nom}
            onChange={(e) => setFormData({...formData, nom: e.target.value})}
          />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '11px', fontWeight: 500, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Prénom</label>
          <input 
            type="text" 
            required 
            placeholder="Marc" 
            style={inputStyle} 
            value={formData.prenom}
            onChange={(e) => setFormData({...formData, prenom: e.target.value})}
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
        <label style={{ fontSize: '11px', fontWeight: 500, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Adresse email pro</label>
        <input 
          type="email" 
          required 
          placeholder="m.bailly@entreprise.com" 
          style={inputStyle} 
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
        <label style={{ fontSize: '11px', fontWeight: 500, color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cahier des charges / Objectifs</label>
        <textarea 
          rows={5} 
          required 
          placeholder="Présentez votre entreprise, l'objectif de l'application et les fonctionnalités indispensables..." 
          style={{ ...inputStyle, resize: 'none', lineHeight: '1.5' }}
          value={formData.projet}
          onChange={(e) => setFormData({...formData, projet: e.target.value})}
        />
      </div>

      <button type="submit" disabled={status === 'loading'} style={buttonStyle}>
        {status === 'loading' ? 'Envoi en cours...' : 'Soumettre le brief projet'}
      </button>

      {status === 'success' && (
        <p style={{ color: '#10b981', fontSize: '12px', marginTop: '12px', textAlign: 'center' }}>
          ✓ Votre message a été envoyé avec succès !
        </p>
      )}
    </form>
  );
}
