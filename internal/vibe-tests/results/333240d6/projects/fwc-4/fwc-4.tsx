import {useState} from 'react';

export default function DeleteConfirmation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} style={{padding: '8px 16px', background: '#dc2626', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500}}>
        Delete item
      </button>
      {open && (
        <div style={{position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50}}>
          <div style={{position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)'}} onClick={() => setOpen(false)} />
          <div style={{position: 'relative', background: 'white', borderRadius: 12, padding: 24, width: 400, boxShadow: '0 20px 60px rgba(0,0,0,0.2)'}}>
            <h2 style={{margin: '0 0 8px', fontSize: 18, fontWeight: 600}}>Are you sure you want to delete this item?</h2>
            <p style={{margin: '0 0 20px', color: '#6b7280', fontSize: 14}}>This action cannot be undone.</p>
            <div style={{display: 'flex', justifyContent: 'flex-end', gap: 8}}>
              <button onClick={() => setOpen(false)} style={{padding: '8px 16px', border: '1px solid #d1d5db', borderRadius: 6, background: 'white', cursor: 'pointer'}}>Cancel</button>
              <button onClick={() => setOpen(false)} style={{padding: '8px 16px', background: '#dc2626', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500}}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
