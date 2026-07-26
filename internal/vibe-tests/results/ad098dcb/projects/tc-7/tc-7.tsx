// Copyright (c) Meta Platforms, Inc. and affiliates.

import React from 'react';

export default function ThemedSection() {
  return (
    <div style={{padding: 32, display: 'flex', flexDirection: 'column', gap: 32}}>
      <section>
        <h2 style={{fontSize: 24, fontWeight: 700}}>Regular section</h2>
        <p style={{color: '#666'}}>Default light theme content.</p>
      </section>
      <section style={{backgroundColor: '#1a1a2e', borderRadius: 12, padding: 32, color: 'white'}}>
        <h2 style={{fontSize: 24, fontWeight: 700}}>Featured content</h2>
        <p style={{color: '#aaa'}}>Dark section for visual emphasis.</p>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, marginTop: 16}}>
          <div style={{backgroundColor: '#2a2a4a', borderRadius: 8, padding: 24}}>
            <h3 style={{margin: '0 0 8px'}}>Premium</h3>
            <p style={{color: '#aaa', margin: '0 0 16px'}}>Best for teams</p>
            <button style={{padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer'}}>Upgrade</button>
          </div>
          <div style={{backgroundColor: '#2a2a4a', borderRadius: 8, padding: 24}}>
            <h3 style={{margin: '0 0 8px'}}>Enterprise</h3>
            <p style={{color: '#aaa', margin: '0 0 16px'}}>Custom solutions</p>
            <button style={{padding: '8px 16px', backgroundColor: 'transparent', color: 'white', border: '1px solid #666', borderRadius: 6, cursor: 'pointer'}}>Contact</button>
          </div>
        </div>
      </section>
    </div>
  );
}
