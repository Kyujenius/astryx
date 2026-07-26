// Copyright (c) Meta Platforms, Inc. and affiliates.

import React, {useState} from 'react';

export default function DeleteConfirmation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)} style={{backgroundColor: '#dc2626', color: 'white', padding: '8px 16px', border: 'none', borderRadius: 6, cursor: 'pointer'}}>Delete item</button>
      {isOpen && (
        <div style={{position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000}}>
          <div style={{backgroundColor: 'white', borderRadius: 8, padding: 24, maxWidth: 400, width: '90%', boxShadow: '0 4px 12px rgba(0,0,0,0.15)'}}>
            <h2 style={{margin: '0 0 8px', fontSize: 18, fontWeight: 600}}>Delete item</h2>
            <p style={{margin: '0 0 24px', color: '#666'}}>Are you sure you want to delete this item? This action cannot be undone.</p>
            <div style={{display: 'flex', justifyContent: 'flex-end', gap: 8}}>
              <button onClick={() => setIsOpen(false)} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: 6, cursor: 'pointer', backgroundColor: 'white'}}>Cancel</button>
              <button onClick={() => { console.log('deleted'); setIsOpen(false); }} style={{padding: '8px 16px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer'}}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
