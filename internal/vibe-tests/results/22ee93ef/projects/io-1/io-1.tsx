// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [error, setError] = useState('');

  const submit = async () => {
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){setError('Enter a valid email');setStatus('error');return;}
    setStatus('loading');setError('');
    try{const r=await fetch('/api/subscribe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email})});if(!r.ok){throw new Error();}setStatus('success');}
    catch{setError('Something went wrong');setStatus('error');}
  };

  return (
    <div style={{border:'1px solid #e0e0e0',borderRadius:8,padding:24,maxWidth:360}}>
      <div style={{display:'flex',flexDirection:'column',gap:12}}>
        <label style={{fontWeight:500}}>Email address
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" disabled={status==='loading'||status==='success'} style={{display:'block',width:'100%',padding:'8px 12px',border:`1px solid ${status==='error'?'#dc3545':'#ccc'}`,borderRadius:4,marginTop:4}} />
        </label>
        {error&&<p style={{color:'#dc3545',fontSize:13,margin:0}}>{error}</p>}
        <button onClick={submit} disabled={status==='loading'||status==='success'} style={{background:'#0066cc',color:'#fff',border:'none',borderRadius:4,padding:'10px 20px',cursor:'pointer',opacity:status==='loading'?0.7:1}}>
          {status==='loading'?'Subscribing...':status==='success'?'Subscribed':'Subscribe'}
        </button>
        {status==='success'&&<p style={{color:'#28a745',fontSize:13}}>You have been subscribed.</p>}
      </div>
    </div>
  );
}
