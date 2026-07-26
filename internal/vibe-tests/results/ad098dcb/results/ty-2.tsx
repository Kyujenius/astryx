// Copyright (c) Meta Platforms, Inc. and affiliates.

import React from 'react';

export default function BlogPostHeader() {
  return (
    <header style={{maxWidth: 720, margin: '0 auto', padding: '48px 16px', display: 'flex', flexDirection: 'column', gap: 16}}>
      <span style={{display: 'inline-block', padding: '4px 12px', backgroundColor: '#eff6ff', color: '#2563eb', borderRadius: 12, fontSize: 12, fontWeight: 500, width: 'fit-content'}}>Design Systems</span>
      <h1 style={{fontSize: 40, fontWeight: 800, lineHeight: 1.1, margin: 0}}>The Future of Component Architecture in Modern Web Applications</h1>
      <p style={{fontSize: 20, color: '#666', margin: 0}}>How compositional patterns and design tokens reshape UI development at scale.</p>
      <div style={{display: 'flex', alignItems: 'center', gap: 12, paddingTop: 8}}>
        <div style={{width: 40, height: 40, borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 14}}>SC</div>
        <div>
          <div style={{fontSize: 14, fontWeight: 500}}>Sarah Chen</div>
          <div style={{fontSize: 12, color: '#999'}}>July 26, 2026</div>
        </div>
      </div>
    </header>
  );
}
