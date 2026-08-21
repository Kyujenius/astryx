import {useState} from 'react';

export default function FeedbackDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{fontFamily: 'system-ui'}}>
      <button onClick={() => setIsOpen(true)} style={{padding: '8px 16px', background: '#0066cc', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer'}}>Give Feedback</button>
      {isOpen && (
        <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
          <div role="dialog" aria-labelledby="dialog-title" aria-modal="true" style={{background: 'white', borderRadius: '8px', padding: '24px', maxWidth: '480px', width: '90%'}}>
            <h2 id="dialog-title" style={{marginBottom: '16px'}}>{submitted ? 'Thank You!' : 'Submit Feedback'}</h2>
            {submitted ? (
              <div>
                <p>Your feedback has been submitted successfully.</p>
                <button onClick={() => { setSubmitted(false); setTitle(''); setComments(''); setIsOpen(false); }} style={{marginTop: '16px', padding: '8px 16px', background: '#0066cc', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer'}}>Close</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                <div>
                  <label htmlFor="fb-title" style={{display: 'block', marginBottom: '4px', fontWeight: 500}}>Title</label>
                  <input id="fb-title" value={title} onChange={e => setTitle(e.target.value)} required style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box'}} />
                </div>
                <div>
                  <label htmlFor="fb-comments" style={{display: 'block', marginBottom: '4px', fontWeight: 500}}>Comments</label>
                  <textarea id="fb-comments" value={comments} onChange={e => setComments(e.target.value)} rows={5} required style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', resize: 'vertical'}} />
                </div>
                <button type="submit" style={{padding: '8px 16px', background: '#0066cc', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer'}}>Submit</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
