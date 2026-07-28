// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

export default function AppearanceSettings() {
  const [accentColor, setAccentColor] = useState('blue');
  const [borderRadius, setBorderRadius] = useState(8);
  const [spacingScale, setSpacingScale] = useState(1);

  const selectStyle: React.CSSProperties = {width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14, background: 'white'};
  const cardStyle: React.CSSProperties = {border: '1px solid #e5e7eb', borderRadius: 8, padding: 20, display: 'flex', flexDirection: 'column', gap: 12};

  return (
    <div style={{maxWidth: 480, margin: '32px auto', display: 'flex', flexDirection: 'column', gap: 24}}>
      <h1 style={{fontSize: 28, fontWeight: 700}}>Appearance</h1>
      <p style={{fontSize: 14, color: '#6b7280'}}>Customize how the app looks.</p>

      <div style={cardStyle}>
        <h3 style={{fontSize: 16, fontWeight: 600}}>Accent Color</h3>
        <select style={selectStyle} value={accentColor} onChange={e => setAccentColor(e.target.value)}>
          <option value="blue">Blue</option>
          <option value="purple">Purple</option>
          <option value="green">Green</option>
          <option value="amber">Amber</option>
        </select>
      </div>

      <div style={cardStyle}>
        <h3 style={{fontSize: 16, fontWeight: 600}}>Border Radius</h3>
        <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
          <input type="range" min={0} max={24} step={2} value={borderRadius} onChange={e => setBorderRadius(Number(e.target.value))} style={{flex: 1}} aria-label="Border radius" />
          <span style={{fontSize: 14, minWidth: 40}}>{borderRadius}px</span>
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={{fontSize: 16, fontWeight: 600}}>Spacing Scale</h3>
        <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
          <input type="range" min={0.5} max={2} step={0.25} value={spacingScale} onChange={e => setSpacingScale(Number(e.target.value))} style={{flex: 1}} aria-label="Spacing scale" />
          <span style={{fontSize: 14, minWidth: 40}}>{spacingScale}x</span>
        </div>
      </div>
    </div>
  );
}
