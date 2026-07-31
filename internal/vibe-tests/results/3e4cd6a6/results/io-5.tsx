import {useState} from 'react';

export default function SupportTicketForm() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div style={{display: 'flex', flexDirection: 'column', gap: 16, padding: 24}}>
        <h2 style={{margin: 0}}>Ticket Submitted</h2>
        <p>Your support ticket has been received.</p>
        <button onClick={() => { setSubmitted(false); setSubject(''); setDescription(''); setPriority(''); }} style={{padding: '8px 16px', border: '1px solid #ccc', borderRadius: 6, cursor: 'pointer', background: 'white'}}>Submit Another</button>
      </div>
    );
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 16, padding: 24, maxWidth: 560}}>
      <h2 style={{margin: 0}}>Submit a Support Ticket</h2>
      <label style={{display: 'flex', flexDirection: 'column', gap: 4}}>
        Subject *
        <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Brief description of your issue" style={{padding: 10, border: '1px solid #ccc', borderRadius: 6}} />
      </label>
      <label style={{display: 'flex', flexDirection: 'column', gap: 4}}>
        Description *
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Provide as much detail as possible..." rows={6} maxLength={2000} style={{padding: 10, border: '1px solid #ccc', borderRadius: 6, resize: 'vertical'}} />
        <span style={{fontSize: 12, color: '#666', alignSelf: 'flex-end'}}>{description.length}/2000</span>
      </label>
      <label style={{display: 'flex', flexDirection: 'column', gap: 4}}>
        Priority *
        <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{padding: 10, border: '1px solid #ccc', borderRadius: 6}}>
          <option value="">Select priority level</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </label>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <button onClick={() => setSubmitted(true)} disabled={!subject || !description || !priority} style={{padding: '10px 20px', background: (!subject || !description || !priority) ? '#ccc' : '#0066cc', color: 'white', border: 'none', borderRadius: 6, cursor: (!subject || !description || !priority) ? 'not-allowed' : 'pointer'}}>Submit Ticket</button>
      </div>
    </div>
  );
}
