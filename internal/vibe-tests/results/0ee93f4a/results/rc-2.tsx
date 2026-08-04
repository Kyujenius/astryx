// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';
import {useState} from 'react';

const filters = ['All', 'Electronics', 'Clothing', 'Books', 'Home'];

export default function ResponsiveSidebar() {
  const [selected, setSelected] = useState('All');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const filterButtons = filters.map((filter) => (
    <button
      key={filter}
      onClick={() => { setSelected(filter); setIsSheetOpen(false); }}
      style={{
        display: 'block', width: '100%', textAlign: 'left',
        padding: '10px 16px', border: 'none', borderRadius: 8, cursor: 'pointer',
        background: selected === filter ? '#0064e0' : 'transparent',
        color: selected === filter ? '#fff' : '#333', fontWeight: 500
      }}
    >{filter}</button>
  ));

  return (
    <div style={{display: 'flex', minHeight: '100vh'}}>
      <aside style={{width: 240, borderRight: '1px solid #e0e0e0', padding: 16, display: 'flex', flexDirection: 'column', gap: 8}}>
        <h3 style={{fontSize: 18, fontWeight: 600, margin: '0 0 8px'}}>Filters</h3>
        {filterButtons}
      </aside>
      <main style={{flex: 1, padding: 24}}>
        <button
          onClick={() => setIsSheetOpen(true)}
          style={{display: 'none', padding: '8px 16px', borderRadius: 8, border: '1px solid #ccc', background: '#fff', cursor: 'pointer', marginBottom: 16}}
        >Filters</button>
        <h2 style={{fontSize: 24, fontWeight: 700, marginBottom: 16}}>Products: {selected}</h2>
        <p style={{color: '#666'}}>Showing items in the {selected} category.</p>
        <div style={{border: '1px solid #e0e0e0', borderRadius: 12, padding: 16, marginTop: 16}}>
          <p>Product listing content goes here.</p>
        </div>
      </main>
      {isSheetOpen && (
        <div style={{position: 'fixed', inset: 0, zIndex: 1000}}>
          <div onClick={() => setIsSheetOpen(false)} style={{position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)'}} />
          <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderRadius: '16px 16px 0 0', padding: 24, maxHeight: '50vh'}}>
            <h3 style={{fontSize: 18, fontWeight: 600, marginBottom: 12}}>Filters</h3>
            {filterButtons}
          </div>
        </div>
      )}
    </div>
  );
}
