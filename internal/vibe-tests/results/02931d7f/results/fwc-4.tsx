import {useState} from 'react';

export default function DeleteConfirmation() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    console.log('Item deleted');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{padding: '10px 20px', borderRadius: '8px', backgroundColor: '#ef4444', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 500}}
      >
        Delete item
      </button>
    );
  }

  return (
    <>
      <div style={{position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50}}>
        <div role="alertdialog" aria-labelledby="dialog-title" aria-describedby="dialog-desc" style={{backgroundColor: 'white', borderRadius: '12px', padding: '24px', maxWidth: '400px', width: '100%'}}>
          <h2 id="dialog-title" style={{fontSize: '18px', fontWeight: 600, margin: '0 0 8px'}}>Delete item</h2>
          <p id="dialog-desc" style={{color: '#6b7280', margin: '0 0 24px'}}>
            Are you sure you want to delete this item? This action cannot be undone.
          </p>
          <div style={{display: 'flex', justifyContent: 'flex-end', gap: '8px'}}>
            <button
              onClick={() => setIsOpen(false)}
              style={{padding: '8px 16px', borderRadius: '6px', border: '1px solid #d1d5db', backgroundColor: 'white', cursor: 'pointer'}}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              style={{padding: '8px 16px', borderRadius: '6px', backgroundColor: '#ef4444', color: 'white', border: 'none', cursor: 'pointer'}}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
