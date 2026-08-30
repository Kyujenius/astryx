import React, {useState} from 'react';

export default function SupportTicketForm() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const inputStyle = {width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', fontSize: 14, boxSizing: 'border-box' as const};
  return (
    <div style={{maxWidth: 560, padding: 24, border: '1px solid #ddd', borderRadius: 8}}>
      <h2 style={{margin: '0 0 16px', fontSize: 20, fontWeight: 600}}>Submit a Support Ticket</h2>
      <div style={{marginBottom: 16}}><label style={{display: 'block', marginBottom: 4, fontWeight: 500}}>Subject *</label><input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Brief description" style={inputStyle} /></div>
      <div style={{marginBottom: 16}}>
        <label style={{display: 'block', marginBottom: 4, fontWeight: 500}}>Description *</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe your issue" rows={5} maxLength={2000} style={{...inputStyle, resize: 'vertical'}} />
        <p style={{textAlign: 'right', fontSize: 12, color: '#888', margin: '4px 0 0'}}>{description.length}/2000</p>
      </div>
      <div style={{marginBottom: 16}}><label style={{display: 'block', marginBottom: 4, fontWeight: 500}}>Priority</label><select value={priority} onChange={e => setPriority(e.target.value)} style={inputStyle}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="urgent">Urgent</option></select></div>
      <div style={{display: 'flex', justifyContent: 'flex-end', gap: 8}}>
        <button style={{padding: '8px 16px', border: 'none', background: 'transparent', cursor: 'pointer'}}>Cancel</button>
        <button style={{padding: '8px 16px', border: 'none', background: '#3b82f6', color: 'white', borderRadius: 4, cursor: 'pointer'}}>Submit Ticket</button>
      </div>
    </div>
  );
}
