import React from 'react';

function SidebarContent() {
  return (
    <div>
      <h3 style={{fontWeight: 600, marginBottom: 12}}>Filters</h3>
      {['All Items', 'Active', 'Archived', 'Starred'].map(label => <button key={label} style={{display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: 4}}>{label}</button>)}
      <p style={{color: '#888', fontSize: 14, marginTop: 12}}>4 categories</p>
    </div>
  );
}

export default function ResponsiveSidebar() {
  return (
    <div style={{display: 'flex', minHeight: '100vh'}}>
      <aside style={{width: 260, borderRight: '1px solid #eee', padding: 16}}><SidebarContent /></aside>
      <main style={{flex: 1, padding: 24}}>
        <h1 style={{fontSize: 24, fontWeight: 700}}>Content Area</h1>
        <p style={{color: '#888', marginTop: 8}}>Main content goes here. On mobile, sidebar filters appear as a bottom sheet.</p>
        <div style={{marginTop: 16, padding: 16, border: '1px solid #ddd', borderRadius: 8}}>Example content card with details and information.</div>
      </main>
    </div>
  );
}
