import {useState} from 'react';

const MAX_CHARS = 500;

export default function SupportTicketForm() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');

  const isValid = subject.trim() && description.trim() && priority;
  const remaining = MAX_CHARS - description.length;

  const inputStyle = {width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '14px'};
  const labelStyle = {display: 'block', marginBottom: '4px', fontWeight: 600, fontSize: '14px'};

  return (
    <div style={{maxWidth: '500px', padding: '24px', fontFamily: 'system-ui'}}>
      <div style={{marginBottom: '16px'}}>
        <label style={labelStyle}>Subject *</label>
        <input style={inputStyle} value={subject} onChange={e => setSubject(e.target.value)} placeholder="Brief summary" />
      </div>
      <div style={{marginBottom: '16px'}}>
        <label style={labelStyle}>Description *</label>
        <textarea style={{...inputStyle, minHeight: '120px', resize: 'vertical'}} value={description} onChange={e => { if (e.target.value.length <= MAX_CHARS) setDescription(e.target.value); }} placeholder="Describe the issue" />
        <p style={{fontSize: '12px', color: '#666', marginTop: '4px'}}>{remaining} characters remaining</p>
      </div>
      <div style={{marginBottom: '16px'}}>
        <label style={labelStyle}>Priority *</label>
        <select style={inputStyle} value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="">Select priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>
      <button disabled={!isValid} style={{padding: '10px 20px', background: isValid ? '#2563eb' : '#9ca3af', color: 'white', border: 'none', borderRadius: '6px', cursor: isValid ? 'pointer' : 'not-allowed'}}>
        Submit Ticket
      </button>
    </div>
  );
}
