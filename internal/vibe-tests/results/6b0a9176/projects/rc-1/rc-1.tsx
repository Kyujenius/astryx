// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

const LINKS = ['Home', 'About', 'Services', 'Contact'];

export default function ResponsiveNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{fontFamily: 'system-ui'}}>
      <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px', borderBottom: '1px solid #eee'}}>
        <span style={{fontSize: 20, fontWeight: 700}}>Brand</span>
        <nav style={{display: 'flex', gap: 16}}>{LINKS.map((l) => <a key={l} href="#" style={{textDecoration: 'none', color: '#333'}}>{l}</a>)}</nav>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{display: 'none', background: 'none', border: 'none', fontSize: 24, cursor: 'pointer'}}>☰</button>
      </header>
      {menuOpen && (
        <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 50}} onClick={() => setMenuOpen(false)}>
          <nav style={{width: 260, height: '100%', background: '#fff', padding: 24}} onClick={(e) => e.stopPropagation()}>
            {LINKS.map((l) => <a key={l} href="#" style={{display: 'block', padding: '12px 0', textDecoration: 'none', color: '#333'}}>{l}</a>)}
          </nav>
        </div>
      )}
      <main style={{padding: 24}}>
        <h1>Welcome</h1>
        <p>Navigation with hamburger on mobile.</p>
      </main>
    </div>
  );
}
