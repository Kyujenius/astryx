// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

const NAV_ITEMS = ['Home', 'About', 'Contact'];

export default function ResponsiveNav() {
  const [current, setCurrent] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <nav style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', height: '56px', borderBottom: '1px solid #e5e7eb'}}>
        <span style={{fontSize: '18px', fontWeight: 700}}>MyApp</span>
        <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
          {NAV_ITEMS.map(item => (
            <button
              key={item}
              onClick={() => setCurrent(item)}
              style={{background: 'none', border: 'none', cursor: 'pointer', fontWeight: current === item ? 600 : 400, color: current === item ? '#000' : '#666'}}
            >
              {item}
            </button>
          ))}
          <button style={{padding: '6px 12px', borderRadius: '4px', background: '#0066cc', color: '#fff', border: 'none', cursor: 'pointer'}}>
            Sign in
          </button>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{display: 'none', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer'}}
        >
          ☰
        </button>
      </nav>
      {menuOpen && (
        <div style={{padding: '16px', borderBottom: '1px solid #e5e7eb'}}>
          {NAV_ITEMS.map(item => (
            <button
              key={item}
              onClick={() => {setCurrent(item); setMenuOpen(false);}}
              style={{display: 'block', width: '100%', textAlign: 'left', padding: '8px 0', background: 'none', border: 'none', cursor: 'pointer', fontWeight: current === item ? 600 : 400}}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
