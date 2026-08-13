import {useState} from 'react';

const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];

export default function SupportTicketForm() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} style={{maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 16}}>
      <h2 style={{fontSize: 24, fontWeight: 700, margin: 0}}>Submit a Support Ticket</h2>
      <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
        <label htmlFor="subject" style={{fontWeight: 500}}>Subject *</label>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Brief description of your issue"
          required
          style={{padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4}}
        />
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
        <label htmlFor="description" style={{fontWeight: 500}}>Description *</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide details about the issue"
          rows={5}
          required
          style={{padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, resize: 'vertical'}}
        />
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
        <label htmlFor="priority" style={{fontWeight: 500}}>Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4}}
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
      <button type="submit" style={{padding: '10px 16px', background: '#333', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500}}>
        Submit ticket
      </button>
    </form>
  );
}
