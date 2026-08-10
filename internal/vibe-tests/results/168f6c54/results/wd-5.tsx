// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

export default function FeedbackDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [comments, setComments] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTitle('');
    setComments('');
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSubmitted(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{padding: '10px 20px', borderRadius: 6, background: '#2563eb', color: 'white', border: 'none', fontSize: 14, cursor: 'pointer'}}
      >
        Give Feedback
      </button>
      {isOpen && (
        <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
          <div style={{background: 'white', borderRadius: 12, padding: 24, width: 480, maxWidth: '90vw'}}>
            {isSubmitted ? (
              <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
                <h3 style={{margin: 0, fontSize: 18}}>Thank you!</h3>
                <p style={{margin: 0, color: '#6b7280'}}>Your feedback has been submitted successfully.</p>
                <button onClick={handleClose} style={{padding: '8px 16px', borderRadius: 6, border: '1px solid #d1d5db', background: 'white', cursor: 'pointer'}}>Close</button>
              </div>
            ) : (
              <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
                <h3 style={{margin: 0, fontSize: 18}}>Submit Feedback</h3>
                <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
                  <label style={{fontWeight: 500, fontSize: 14}}>Title *</label>
                  <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Brief summary..." style={{padding: '8px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14}} />
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
                  <label style={{fontWeight: 500, fontSize: 14}}>Comments</label>
                  <textarea value={comments} onChange={e => setComments(e.target.value)} placeholder="Tell us more..." rows={5} style={{padding: '8px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14, resize: 'vertical'}} />
                </div>
                <button onClick={handleSubmit} disabled={title === '' || comments === ''} style={{padding: '10px 16px', borderRadius: 6, background: '#2563eb', color: 'white', border: 'none', fontSize: 14, cursor: 'pointer', opacity: (title === '' || comments === '') ? 0.5 : 1}}>Submit</button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
