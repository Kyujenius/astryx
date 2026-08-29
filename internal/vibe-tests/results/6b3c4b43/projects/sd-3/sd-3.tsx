import {useState} from 'react';
export default function ValidatedForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [agreed, setAgreed] = useState(false);
  const ev = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const ok = name.trim().length>0 && ev && role.length>0 && agreed;
  return (
    <div style={{maxWidth:400,fontFamily:'system-ui'}}>
      <h2 style={{fontSize:24,fontWeight:700,marginBottom:16}}>Registration</h2>
      <div style={{display:'flex',flexDirection:'column',gap:16}}>
        <div><label style={{display:'block',marginBottom:4,fontWeight:600,fontSize:14}}>Full name *</label><input value={name} onChange={e=>setName(e.target.value)} style={{width:'100%',padding:'8px 12px',borderRadius:6,border:'1px solid #ccc',fontSize:14,boxSizing:'border-box'}}/></div>
        <div><label style={{display:'block',marginBottom:4,fontWeight:600,fontSize:14}}>Email *</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',padding:'8px 12px',borderRadius:6,border:'1px solid #ccc',fontSize:14,boxSizing:'border-box'}}/>{email&&!ev&&<p style={{color:'#ef4444',fontSize:12,marginTop:4}}>Enter a valid email</p>}</div>
        <div><label style={{display:'block',marginBottom:4,fontWeight:600,fontSize:14}}>Role *</label><select value={role} onChange={e=>setRole(e.target.value)} style={{width:'100%',padding:'8px 12px',borderRadius:6,border:'1px solid #ccc',fontSize:14}}><option value="">Select...</option><option>Developer</option><option>Designer</option><option>Manager</option><option>Other</option></select></div>
        <label style={{display:'flex',alignItems:'center',gap:8,fontSize:14}}><input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)}/>I agree to the terms and conditions</label>
        <button disabled={!ok} onClick={()=>alert('Submitted!')} style={{padding:'10px 20px',borderRadius:6,background:ok?'#0066cc':'#ccc',color:'white',border:'none',cursor:ok?'pointer':'not-allowed',fontSize:14}}>Submit</button>
      </div>
    </div>
  );
}
