// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

const navItems = ['Home', 'About', 'Services', 'Contact'];

export default function ResponsiveNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header style={{fontFamily: 'system-ui'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #e5e5e5'}}>
        <h1 style={{fontSize: 18, fontWeight: 700, margin: 0}}>Logo</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          style={{padding: 8, border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: 20}}
        >
          {isOpen ? '\u2715' : '\u2630'}
        </button>
      </div>
      {isOpen && (
        <nav style={{padding: 16, borderBottom: '1px solid #e5e5e5'}}>
          {navItems.map((item) => (
            <a key={item} href="#" style={{display: 'block', padding: '8px 0', textDecoration: 'none', color: '#333', fontWeight: 500}}>{item}</a>
          ))}
        </nav>
      )}
    </header>
  );
}
