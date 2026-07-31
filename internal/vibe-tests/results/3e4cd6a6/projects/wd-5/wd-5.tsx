import {useState} from 'react';

export default function FeedbackForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <>
      <button onClick={() => setIsOpen(true)} style={{padding: '8px 16px', background: '#0066cc', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer'}}>Give Feedback</button>
      {isOpen && (
        <div style={{position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}} role="dialog" aria-label="Feedback form">
          <div style={{background: 'white', borderRadius: 12, padding: 24, width: 400, maxWidth: '90vw'}}>
            <h2 style={{margin: '0 0 16px'}}>Send Feedback</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
              <label>
                Title
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Brief summary" style={{display: 'block', width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4, marginTop: 4}} />
              </label>
              <label>
                Description
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Tell us more..." rows={5} style={{display: 'block', width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4, marginTop: 4, resize: 'vertical'}} />
              </label>
              <div style={{display: 'flex', gap: 8, justifyContent: 'flex-end'}}>
                <button onClick={() => setIsOpen(false)} style={{padding: '8px 16px', background: 'transparent', border: '1px solid #ccc', borderRadius: 6, cursor: 'pointer'}}>Cancel</button>
                <button onClick={() => { setIsOpen(false); setTitle(''); setDescription(''); }} style={{padding: '8px 16px', background: '#0066cc', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer'}}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
