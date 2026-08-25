import {useState} from 'react';

export default function ValidatedForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isNameValid = name.trim().length > 0;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 8;
  const isFormValid = isNameValid && isEmailValid && isPasswordValid;

  const inputStyle = {width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', marginTop: 4};

  return (
    <div style={{padding: 24, maxWidth: 400}}>
      <h2 style={{fontSize: 24, marginBottom: 16}}>Create Account</h2>
      <div style={{marginBottom: 12}}>
        <label style={{fontWeight: 500}}>Full Name *</label>
        <input value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} required />
        {name && !isNameValid && <p style={{color: '#d32f2f', fontSize: 12, marginTop: 4}}>Name is required</p>}
      </div>
      <div style={{marginBottom: 12}}>
        <label style={{fontWeight: 500}}>Email *</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} required />
        {email && !isEmailValid && <p style={{color: '#d32f2f', fontSize: 12, marginTop: 4}}>Enter a valid email</p>}
      </div>
      <div style={{marginBottom: 16}}>
        <label style={{fontWeight: 500}}>Password *</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} required />
        {password && !isPasswordValid && <p style={{color: '#d32f2f', fontSize: 12, marginTop: 4}}>At least 8 characters</p>}
      </div>
      <button disabled={!isFormValid} style={{padding: '10px 20px', borderRadius: 4, border: 'none', backgroundColor: isFormValid ? '#1976d2' : '#ccc', color: '#fff', cursor: isFormValid ? 'pointer' : 'not-allowed', width: '100%'}}>
        Create Account
      </button>
    </div>
  );
}
