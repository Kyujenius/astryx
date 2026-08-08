// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

export default function DeleteConfirmation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{padding: '8px 16px', borderRadius: '4px', background: '#dc2626', color: '#fff', border: 'none', cursor: 'pointer'}}
      >
        Delete item
      </button>
      {isOpen && (
        <div style={{position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
          <div style={{position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)'}} onClick={() => setIsOpen(false)} />
          <div style={{position: 'relative', background: '#fff', borderRadius: '8px', padding: '24px', maxWidth: '400px', width: '100%', boxShadow: '0 4px 24px rgba(0,0,0,0.2)'}}>
            <h2 style={{margin: '0 0 8px', fontSize: '18px', fontWeight: 600}}>Delete item</h2>
            <p style={{margin: '0 0 24px', color: '#666'}}>Are you sure you want to delete this item? This action cannot be undone.</p>
            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '8px'}}>
              <button
                onClick={() => setIsOpen(false)}
                style={{padding: '8px 16px', borderRadius: '4px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer'}}
              >
                Cancel
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{padding: '8px 16px', borderRadius: '4px', background: '#dc2626', color: '#fff', border: 'none', cursor: 'pointer'}}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
