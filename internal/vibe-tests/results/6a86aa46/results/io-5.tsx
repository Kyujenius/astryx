import { useState } from 'react';

export default function SupportTicketForm() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');

  const isValid = subject.trim().length > 0 && description.trim().length > 0 && priority !== '';

  return (
    <form onSubmit={(e) => { e.preventDefault(); alert(`Ticket submitted: ${subject}`); }} style={{ maxWidth: 500, padding: 16 }}>
      <h2 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>Submit a Support Ticket</h2>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="subject" style={{ display: 'block', fontWeight: 500, marginBottom: 4 }}>Subject *</label>
        <input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Brief description" style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, boxSizing: 'border-box' }} />
      </div>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="description" style={{ display: 'block', fontWeight: 500, marginBottom: 4 }}>Description *</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your issue..." rows={5} maxLength={500} style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, boxSizing: 'border-box', resize: 'vertical' }} />
        <p style={{ textAlign: 'right', fontSize: 12, color: '#666', margin: '4px 0 0' }}>{description.length}/500</p>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="priority" style={{ display: 'block', fontWeight: 500, marginBottom: 4 }}>Priority *</label>
        <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4 }}>
          <option value="">Select priority...</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>
      <button type="submit" disabled={!isValid} style={{ padding: '10px 20px', background: isValid ? '#0066cc' : '#ccc', color: 'white', border: 'none', borderRadius: 4, cursor: isValid ? 'pointer' : 'not-allowed' }}>Submit Ticket</button>
    </form>
  );
}
