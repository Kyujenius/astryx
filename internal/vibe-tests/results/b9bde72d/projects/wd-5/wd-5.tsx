// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useRef, useEffect} from 'react';

export default function FeedbackForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {dialogRef.current?.showModal();}
    else {dialogRef.current?.close();}
  }, [isOpen]);

  const handleSubmit = () => { setSubmitted(true); setTitle(''); setComments(''); };

  return (
    <div style={{padding: 16, fontFamily: 'system-ui'}}>
      <button onClick={() => { setIsOpen(true); setSubmitted(false); }} style={{padding: '8px 16px', backgroundColor: '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer'}}>
        Give Feedback
      </button>
      <dialog ref={dialogRef} onClose={() => setIsOpen(false)} style={{padding: 24, borderRadius: 8, border: '1px solid #e5e7eb', maxWidth: 500, width: '90%'}}>
        {submitted ? (
          <div style={{textAlign: 'center'}}>
            <h3 style={{fontSize: 20, fontWeight: 600}}>Thank you!</h3>
            <p style={{color: '#666', margin: '8px 0'}}>Your feedback has been submitted.</p>
            <button onClick={() => setIsOpen(false)} style={{padding: '8px 16px', border: '1px solid #ccc', borderRadius: 4, cursor: 'pointer'}}>Close</button>
          </div>
        ) : (
          <>
            <h3 style={{fontSize: 20, fontWeight: 600, marginBottom: 16}}>Submit Feedback</h3>
            <div style={{marginBottom: 12}}>
              <label style={{display: 'block', fontWeight: 500, marginBottom: 4}}>Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Brief summary" style={{width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, boxSizing: 'border-box'}} />
            </div>
            <div style={{marginBottom: 12}}>
              <label style={{display: 'block', fontWeight: 500, marginBottom: 4}}>Comments</label>
              <textarea value={comments} onChange={(e) => setComments(e.target.value)} placeholder="Tell us more..." rows={4} style={{width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, boxSizing: 'border-box', resize: 'vertical'}} />
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', gap: 8}}>
              <button onClick={() => setIsOpen(false)} style={{padding: '8px 16px', border: '1px solid #ccc', borderRadius: 4, cursor: 'pointer'}}>Cancel</button>
              <button disabled={!title || !comments} onClick={handleSubmit} style={{padding: '8px 16px', backgroundColor: title && comments ? '#0066cc' : '#ccc', color: '#fff', border: 'none', borderRadius: 4, cursor: title && comments ? 'pointer' : 'not-allowed'}}>Submit</button>
            </div>
          </>
        )}
      </dialog>
    </div>
  );
}
