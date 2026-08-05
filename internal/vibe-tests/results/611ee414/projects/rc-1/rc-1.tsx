// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

const navItems = ['Home', 'Products', 'About', 'Contact'];

export default function ResponsiveNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={{fontFamily: 'sans-serif'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px', borderBottom: '1px solid #e0e0e0'}}>
        <strong style={{fontSize: 18}}>Brand</strong>
        <div style={{display: 'flex', gap: 8}}>
          {navItems.map((item) => (
            <a key={item} href="#" style={{padding: '8px 12px', textDecoration: 'none', color: '#333', borderRadius: 4}}>{item}</a>
          ))}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} style={{display: 'none', background: 'none', border: 'none', fontSize: 24, cursor: 'pointer'}} className="hamburger">☰</button>
      </div>
      {isOpen && (
        <div style={{padding: '8px 24px', borderBottom: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', gap: 4}}>
          {navItems.map((item) => (
            <a key={item} href="#" onClick={() => setIsOpen(false)} style={{padding: '8px 0', textDecoration: 'none', color: '#333'}}>{item}</a>
          ))}
        </div>
      )}
    </nav>
  );
}