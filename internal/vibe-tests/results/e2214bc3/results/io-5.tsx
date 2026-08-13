import {useState} from 'react';

export default function SupportTicketForm() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');

  const inputStyle = {width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14};

  return (
    <div style={{maxWidth: 400, margin: '0 auto', padding: 24, fontFamily: 'system-ui'}}>
      <h2 style={{marginBottom: 20}}>Submit a Support Ticket</h2>
      <div style={{marginBottom: 16}}>
        <label style={{display: 'block', fontWeight: 500, marginBottom: 4}}>Subject *</label>
        <input style={inputStyle} value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Brief summary" />
      </div>
      <div style={{marginBottom: 16}}>
        <label style={{display: 'block', fontWeight: 500, marginBottom: 4}}>Description *</label>
        <textarea style={{...inputStyle, minHeight: 120, resize: 'vertical'}} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your issue" maxLength={500} />
        <p style={{textAlign: 'right', fontSize: 12, color: '#6b7280', margin: '4px 0 0'}}>{description.length}/500</p>
      </div>
      <div style={{marginBottom: 16}}>
        <label style={{display: 'block', fontWeight: 500, marginBottom: 4}}>Priority *</label>
        <select style={inputStyle} value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">Select priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>
      <button
        disabled={!subject || !description || !priority}
        onClick={() => console.log({subject, description, priority})}
        style={{padding: '10px 20px', backgroundColor: (!subject || !description || !priority) ? '#9ca3af' : '#2563eb', color: 'white', border: 'none', borderRadius: 6, cursor: (!subject || !description || !priority) ? 'not-allowed' : 'pointer', fontWeight: 600}}
      >
        Submit Ticket
      </button>
    </div>
  );
}
