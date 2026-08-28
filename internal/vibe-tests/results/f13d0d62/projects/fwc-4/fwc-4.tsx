import {useState, useEffect, useRef} from 'react';

export default function DeleteConfirmation() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen]);

  return (
    <div style={{padding: 24, fontFamily: 'system-ui'}}>
      <button
        onClick={() => setIsOpen(true)}
        style={{padding: '8px 16px', background: '#dc2626', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500}}
      >
        Delete item
      </button>

      {isOpen && (
        <div style={{position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
          <div style={{position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)'}} />
          <div
            ref={dialogRef}
            role="alertdialog"
            aria-labelledby="dialog-title"
            aria-describedby="dialog-desc"
            style={{position: 'relative', background: 'white', borderRadius: 12, padding: 24, maxWidth: 400, width: '90%', boxShadow: '0 8px 32px rgba(0,0,0,0.2)'}}
          >
            <h2 id="dialog-title" style={{margin: '0 0 8px', fontSize: 18, fontWeight: 600}}>
              Are you sure you want to delete this item?
            </h2>
            <p id="dialog-desc" style={{margin: '0 0 24px', color: '#666'}}>
              This action cannot be undone. The item and all associated data will be permanently removed.
            </p>
            <div style={{display: 'flex', gap: 8, justifyContent: 'flex-end'}}>
              <button
                onClick={() => setIsOpen(false)}
                style={{padding: '8px 16px', background: 'transparent', border: '1px solid #ccc', borderRadius: 6, cursor: 'pointer'}}
              >
                Cancel
              </button>
              <button
                onClick={() => setIsOpen(false)}
                style={{padding: '8px 16px', background: '#dc2626', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500}}
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
