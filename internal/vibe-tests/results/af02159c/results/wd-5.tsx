import {useState} from 'react';

export default function FeedbackForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => setSubmitted(true);

  return (
    <div style={{fontFamily: 'system-ui, sans-serif', padding: 24}}>
      <button
        onClick={() => setIsOpen(true)}
        style={{padding: '8px 16px', background: '#0066cc', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500}}
      >
        Leave Feedback
      </button>
      {isOpen && (
        <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}} role="dialog" aria-modal="true" aria-labelledby="fb-title">
          <div style={{background: '#fff', borderRadius: 12, padding: 24, maxWidth: 480, width: '90%', boxShadow: '0 8px 32px rgba(0,0,0,0.2)'}}>
            {submitted ? (
              <div style={{textAlign: 'center', padding: '32px 0'}}>
                <div style={{fontSize: 48, marginBottom: 12}}>✓</div>
                <h2 style={{margin: '0 0 8px'}}>Thank you!</h2>
                <p style={{color: '#666', marginBottom: 16}}>Your feedback has been submitted.</p>
                <button onClick={() => { setSubmitted(false); setIsOpen(false); }} style={{padding: '8px 16px', background: '#0066cc', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer'}}>Close</button>
              </div>
            ) : (
              <>
                <h2 id="fb-title" style={{margin: '0 0 16px', fontSize: 18, fontWeight: 600}}>Feedback</h2>
                <div style={{marginBottom: 12}}>
                  <label htmlFor="fb-title-input" style={{display: 'block', marginBottom: 4, fontSize: 14, fontWeight: 500}}>Title</label>
                  <input id="fb-title-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Brief summary" style={{width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 6, fontSize: 14}} />
                </div>
                <div style={{marginBottom: 16}}>
                  <label htmlFor="fb-comments" style={{display: 'block', marginBottom: 4, fontSize: 14, fontWeight: 500}}>Comments</label>
                  <textarea id="fb-comments" value={comments} onChange={(e) => setComments(e.target.value)} rows={5} placeholder="Tell us more..." style={{width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 6, fontSize: 14, resize: 'vertical'}} />
                </div>
                <div style={{display: 'flex', gap: 8, justifyContent: 'flex-end'}}>
                  <button onClick={() => setIsOpen(false)} style={{padding: '8px 16px', border: '1px solid #ccc', borderRadius: 6, background: '#fff', cursor: 'pointer'}}>Cancel</button>
                  <button onClick={handleSubmit} disabled={!title || !comments} style={{padding: '8px 16px', background: (!title || !comments) ? '#ccc' : '#0066cc', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500}}>Submit</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
