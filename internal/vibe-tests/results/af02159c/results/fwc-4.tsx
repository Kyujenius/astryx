import {useState} from 'react';

export default function DeleteConfirmation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{fontFamily: 'system-ui, sans-serif', padding: 24}}>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: '8px 16px', background: '#dc2626', color: '#fff',
          border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500,
        }}
      >
        Delete Item
      </button>
      {isOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
        >
          <div style={{background: '#fff', borderRadius: 12, padding: 24, maxWidth: 400, width: '90%', boxShadow: '0 8px 32px rgba(0,0,0,0.2)'}}>
            <h2 id="dialog-title" style={{margin: '0 0 8px', fontSize: 18, fontWeight: 600}}>
              Are you sure you want to delete this item?
            </h2>
            <p style={{color: '#666', margin: '0 0 20px', fontSize: 14}}>
              This action cannot be undone. The item will be permanently removed.
            </p>
            <div style={{display: 'flex', gap: 8, justifyContent: 'flex-end'}}>
              <button
                onClick={() => setIsOpen(false)}
                style={{padding: '8px 16px', border: '1px solid #ccc', borderRadius: 6, background: '#fff', cursor: 'pointer'}}
              >
                Cancel
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{padding: '8px 16px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500}}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
