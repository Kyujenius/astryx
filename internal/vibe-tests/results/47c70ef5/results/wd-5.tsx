import {useState} from 'react';

interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {title: string; comments: string}) => void;
}

export default function FeedbackForm({isOpen, onClose, onSubmit}: FeedbackFormProps) {
  const [title, setTitle] = useState('');
  const [comments, setComments] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit({title, comments});
    setTitle('');
    setComments('');
    onClose();
  };

  return (
    <div style={{position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', zIndex: 1000}}>
      <div style={{background: '#fff', borderRadius: 12, padding: 24, width: 480, maxWidth: '90vw'}}>
        <h2 style={{margin: '0 0 16px', fontSize: 20}}>Send Feedback</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <label style={{fontSize: 14, fontWeight: 500}}>
            Title *
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Brief summary" style={{display: 'block', width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 6, marginTop: 4}} />
          </label>
          <label style={{fontSize: 14, fontWeight: 500}}>
            Comments
            <textarea value={comments} onChange={(e) => setComments(e.target.value)} placeholder="Tell us what you think..." rows={5} style={{display: 'block', width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 6, marginTop: 4, resize: 'vertical'}} />
          </label>
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16}}>
          <button onClick={onClose} style={{padding: '8px 16px', border: 'none', background: 'transparent', cursor: 'pointer'}}>Cancel</button>
          <button onClick={handleSubmit} disabled={!title.trim()} style={{padding: '8px 16px', border: 'none', background: '#0066cc', color: '#fff', borderRadius: 6, cursor: 'pointer', opacity: title.trim() ? 1 : 0.5}}>Submit</button>
        </div>
      </div>
    </div>
  );
}
