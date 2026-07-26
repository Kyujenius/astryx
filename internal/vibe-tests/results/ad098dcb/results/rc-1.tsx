// Copyright (c) Meta Platforms, Inc. and affiliates.

import React, {useState} from 'react';

const NAV_ITEMS = [{label: 'Home', href: '/'}, {label: 'Products', href: '/products'}, {label: 'About', href: '/about'}, {label: 'Contact', href: '/contact'}];

export default function ResponsiveNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <header style={{borderBottom: '1px solid #eee'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 16, maxWidth: 1200, margin: '0 auto'}}>
          <span style={{fontSize: 20, fontWeight: 700}}>MyApp</span>
          <nav style={{display: 'flex', gap: 24}}>{NAV_ITEMS.map(item => <a key={item.href} href={item.href} style={{color: '#666', textDecoration: 'none'}}>{item.label}</a>)}</nav>
          <button onClick={() => setIsOpen(!isOpen)} style={{display: 'none', background: 'none', border: 'none', fontSize: 24, cursor: 'pointer'}} className="mobile-toggle">&#9776;</button>
        </div>
      </header>
      {isOpen && (
        <div style={{position: 'fixed', inset: 0, zIndex: 100}}>
          <div onClick={() => setIsOpen(false)} style={{position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)'}} />
          <nav style={{position: 'absolute', top: 0, left: 0, bottom: 0, width: 280, backgroundColor: 'white', padding: 24, display: 'flex', flexDirection: 'column', gap: 16}}>
            <button onClick={() => setIsOpen(false)} style={{alignSelf: 'flex-end', background: 'none', border: 'none', fontSize: 24, cursor: 'pointer'}}>&times;</button>
            {NAV_ITEMS.map(item => <a key={item.href} href={item.href} style={{fontSize: 18, textDecoration: 'none', color: '#333'}}>{item.label}</a>)}
          </nav>
        </div>
      )}
      <main style={{padding: 32}}><h1 style={{fontSize: 32, fontWeight: 700}}>Welcome</h1></main>
    </div>
  );
}
