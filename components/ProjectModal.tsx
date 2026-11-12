"use client";
import React from 'react';

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  techs: string[];
  videoUrl: string;
}

export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  if (!project) return null;

  return (
    <div 
      onClick={onClose} // Permet aussi de fermer en cliquant sur le fond noir autour
      style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', zIndex: 50 }}
    >
      <div 
        onClick={(e) => e.stopPropagation()} // Empêche la fermeture quand on clique dans la fenêtre
        style={{ backgroundColor: '#121214', border: '1px solid #27272a', borderRadius: '16px', maxWidth: '1050px', width: '92vw', padding: '28px', color: '#f4f4f5', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.9)' }}
      >
        {/* En-tête */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
          <div>
            <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{project.category}</span>
            <h3 style={{ fontSize: '20px', fontWeight: 600, margin: '4px 0 0 0' }}>{project.title}</h3>
          </div>
          <button onClick={onClose} style={{ backgroundColor: '#27272a', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Fermer ✕</button>
        </div>

        {/* Lecteur Vidéo Grand Format */}
        <video 
          src={project.videoUrl} 
          controls 
          autoPlay 
          muted 
          loop 
          style={{ maxHeight: '65vh', width: '100%', borderRadius: '10px', backgroundColor: '#000', marginBottom: '20px', border: '1px solid #27272a' }} 
        />

        {/* Description et Technos */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <p style={{ fontSize: '14px', color: '#a1a1aa', lineHeight: '1.6', margin: 0, flex: '1 1 500px' }}>{project.description}</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {project.techs.map(t => (
              <span key={t} style={{ fontSize: '12px', backgroundColor: '#18181b', border: '1px solid #27272a', padding: '5px 10px', borderRadius: '6px', color: '#e4e4e7' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
