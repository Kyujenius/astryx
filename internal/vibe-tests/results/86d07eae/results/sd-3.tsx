import {useState} from 'react';

export default function ValidationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = name.length > 0 && isEmailValid && password.length >= 8;

  return (
    <form onSubmit={(e) => e.preventDefault()} style={{maxWidth: 380, display: 'flex', flexDirection: 'column', gap: 16}}>
      <h2 style={{fontSize: 24, fontWeight: 700, margin: 0}}>Create Account</h2>
      <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
        <label htmlFor="name" style={{fontWeight: 500}}>Full name *</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4}}
        />
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
        <label htmlFor="email" style={{fontWeight: 500}}>Email *</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4}}
        />
        {email && !isEmailValid && (
          <p style={{color: '#dc2626', fontSize: 13, margin: 0}}>Enter a valid email address</p>
        )}
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
        <label htmlFor="password" style={{fontWeight: 500}}>Password *</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4}}
        />
        {password && password.length < 8 && (
          <p style={{color: '#dc2626', fontSize: 13, margin: 0}}>Must be at least 8 characters</p>
        )}
      </div>
      <button
        type="submit"
        disabled={!isFormValid}
        style={{padding: '10px 16px', background: isFormValid ? '#333' : '#999', color: '#fff', border: 'none', borderRadius: 6, cursor: isFormValid ? 'pointer' : 'not-allowed', fontWeight: 500}}
      >
        Create account
      </button>
    </form>
  );
}
