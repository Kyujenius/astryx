import {useState} from 'react';

export default function DeleteConfirmation() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div style={{fontFamily: 'system-ui'}}>
      <button onClick={() => setIsOpen(true)} style={{padding: '8px 16px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer'}}>
        Delete item
      </button>
      {isOpen && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
          <div style={{backgroundColor: 'white', borderRadius: 8, padding: 24, maxWidth: 400, width: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.15)'}}>
            <h2 style={{margin: '0 0 8px', fontSize: 18, fontWeight: 600}}>Delete item</h2>
            <p style={{margin: '0 0 24px', color: '#666'}}>Are you sure you want to delete this item?</p>
            <div style={{display: 'flex', justifyContent: 'flex-end', gap: 8}}>
              <button onClick={() => setIsOpen(false)} style={{padding: '8px 16px', border: '1px solid #ccc', borderRadius: 4, backgroundColor: 'white', cursor: 'pointer'}}>Cancel</button>
              <button onClick={() => setIsOpen(false)} style={{padding: '8px 16px', border: 'none', borderRadius: 4, backgroundColor: '#dc2626', color: 'white', cursor: 'pointer'}}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
