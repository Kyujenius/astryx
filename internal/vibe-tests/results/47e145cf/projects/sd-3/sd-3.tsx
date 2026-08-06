import {useState} from 'react';

export default function ValidatedForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const isValid = name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && message.trim();

  return (
    <form style={{maxWidth: 400, fontFamily: 'system-ui'}} onSubmit={e => { e.preventDefault(); alert('Submitted'); }}>
      <div style={{marginBottom: 12}}><label style={{display: 'block', marginBottom: 4, fontWeight: 600}}>Name *</label><input style={{width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4}} value={name} onChange={e => setName(e.target.value)} /></div>
      <div style={{marginBottom: 12}}><label style={{display: 'block', marginBottom: 4, fontWeight: 600}}>Email *</label><input type="email" style={{width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4}} value={email} onChange={e => setEmail(e.target.value)} /></div>
      <div style={{marginBottom: 12}}><label style={{display: 'block', marginBottom: 4, fontWeight: 600}}>Message *</label><input style={{width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4}} value={message} onChange={e => setMessage(e.target.value)} /></div>
      <button type="submit" disabled={!isValid} style={{padding: '10px 20px', backgroundColor: isValid ? '#0066cc' : '#ccc', color: '#fff', border: 'none', borderRadius: 4}}>Submit</button>
    </form>
  );
}