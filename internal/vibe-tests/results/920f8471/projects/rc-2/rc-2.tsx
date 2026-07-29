import {useState} from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ResponsiveSidebar({isOpen, onClose, children}: SidebarProps) {
  if (!isOpen) return null;
  return (
    <>
      <div onClick={onClose} style={{position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 40}} />
      <aside style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, width: 300,
        backgroundColor: '#fff', zIndex: 50, padding: 24, overflowY: 'auto',
        boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
      }}>
        <button onClick={onClose} style={{marginBottom: 16, cursor: 'pointer'}}>Close</button>
        {children}
      </aside>
    </>
  );
}
