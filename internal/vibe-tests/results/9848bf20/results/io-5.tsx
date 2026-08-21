import {useState} from 'react';

export default function SupportTicketForm() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await fetch('/api/tickets', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({subject, description, priority}),
    });
    setIsSubmitting(false);
  };

  return (
    <div style={{padding: '24px', maxWidth: '500px', fontFamily: 'system-ui'}}>
      <h2 style={{marginBottom: '16px'}}>Submit a Support Ticket</h2>
      <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
        <div>
          <label htmlFor="subject" style={{display: 'block', marginBottom: '4px', fontWeight: 500}}>Subject *</label>
          <input id="subject" value={subject} onChange={e => setSubject(e.target.value)} required placeholder="Brief description of the issue" style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box'}} />
        </div>
        <div>
          <label htmlFor="desc" style={{display: 'block', marginBottom: '4px', fontWeight: 500}}>Description *</label>
          <textarea id="desc" value={description} onChange={e => setDescription(e.target.value)} rows={5} maxLength={500} required placeholder="Describe your issue in detail" style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', resize: 'vertical'}} />
          <span style={{display: 'block', textAlign: 'right', fontSize: '12px', color: '#666'}}>{description.length}/500</span>
        </div>
        <div>
          <label htmlFor="priority" style={{display: 'block', marginBottom: '4px', fontWeight: 500}}>Priority</label>
          <select id="priority" value={priority} onChange={e => setPriority(e.target.value)} style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        <button type="submit" disabled={isSubmitting} style={{padding: '10px', background: '#0066cc', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer'}}>{isSubmitting ? 'Submitting...' : 'Submit Ticket'}</button>
      </form>
    </div>
  );
}
