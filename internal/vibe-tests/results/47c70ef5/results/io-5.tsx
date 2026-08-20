import {useState} from 'react';

const MAX_DESCRIPTION = 500;

export default function SupportTicketForm() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const charCount = description.length;
  const isOverLimit = charCount > MAX_DESCRIPTION;

  return (
    <form onSubmit={(e) => { e.preventDefault(); console.log({subject, description, priority}); }} style={{display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480, padding: 16}}>
      <label style={{fontSize: 14, fontWeight: 500}}>
        Subject *
        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Brief summary of the issue" required style={{display: 'block', width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 6, marginTop: 4}} />
      </label>
      <label style={{fontSize: 14, fontWeight: 500}}>
        Description *
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the issue in detail..." rows={5} required style={{display: 'block', width: '100%', padding: '8px 12px', border: `1px solid ${isOverLimit ? '#dc2626' : '#ccc'}`, borderRadius: 6, marginTop: 4, resize: 'vertical'}} />
        <span style={{fontSize: 12, color: isOverLimit ? '#dc2626' : '#666', float: 'right'}}>{charCount}/{MAX_DESCRIPTION}</span>
      </label>
      <label style={{fontSize: 14, fontWeight: 500}}>
        Priority
        <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{display: 'block', width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 6, marginTop: 4}}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </label>
      <div style={{textAlign: 'right'}}>
        <button type="submit" disabled={!subject.trim() || !description.trim() || isOverLimit} style={{padding: '8px 20px', background: '#0066cc', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', opacity: (!subject.trim() || !description.trim() || isOverLimit) ? 0.5 : 1}}>Submit Ticket</button>
      </div>
    </form>
  );
}
