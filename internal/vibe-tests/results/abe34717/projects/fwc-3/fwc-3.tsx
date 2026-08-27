import {useState} from 'react';

function getStrength(password: string) {
  if (password.length < 6) return {level: 'Weak', color: '#ef4444', width: '33%'};
  if (password.length < 10) return {level: 'Medium', color: '#eab308', width: '66%'};
  return {level: 'Strong', color: '#22c55e', width: '100%'};
}

export default function PasswordInput() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const strength = getStrength(password);

  return (
    <div style={{padding: 16, fontFamily: 'system-ui', maxWidth: 400}}>
      <label style={{display: 'block', marginBottom: 4, fontWeight: 500}}>Password</label>
      <div style={{display: 'flex', gap: 8}}>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter password"
          style={{flex: 1, padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4}}
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          style={{padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, background: '#fff', cursor: 'pointer'}}
        >{showPassword ? 'Hide' : 'Show'}</button>
      </div>
      {password && (
        <div style={{marginTop: 8}}>
          <div style={{height: 6, background: '#e5e7eb', borderRadius: 3}}>
            <div style={{height: '100%', background: strength.color, borderRadius: 3, width: strength.width, transition: 'width 0.3s'}} />
          </div>
          <span style={{fontSize: 12, color: '#6b7280'}}>{strength.level}</span>
        </div>
      )}
    </div>
  );
}
