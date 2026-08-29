import {useState} from 'react';
function str(pw:string){let s=0;if(pw.length>=8)s+=25;if(pw.length>=12)s+=15;if(/[a-z]/.test(pw)&&/[A-Z]/.test(pw))s+=20;if(/\d/.test(pw))s+=20;if(/[^a-zA-Z0-9]/.test(pw))s+=20;return{score:s,label:s<=25?'Weak':s<=50?'Fair':s<=75?'Good':'Strong',color:s<=25?'#ef4444':s<=50?'#f59e0b':s<=75?'#3b82f6':'#22c55e'};}
export default function PasswordInput() {
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const s = str(pw);
  return (
    <div style={{maxWidth:320,fontFamily:'system-ui'}}>
      <label style={{display:'block',marginBottom:4,fontWeight:600,fontSize:14}}>Password</label>
      <div style={{display:'flex',gap:8}}>
        <input type={show?'text':'password'} value={pw} onChange={e=>setPw(e.target.value)} placeholder="Enter password..." style={{flex:1,padding:'8px 12px',borderRadius:6,border:'1px solid #ccc',fontSize:14}}/>
        <button onClick={()=>setShow(!show)} style={{padding:'8px 12px',borderRadius:6,border:'1px solid #ccc',background:'white',cursor:'pointer',fontSize:14}}>{show?'Hide':'Show'}</button>
      </div>
      {pw&&(<div style={{marginTop:8}}><div style={{height:6,borderRadius:3,background:'#e5e7eb',overflow:'hidden'}}><div style={{height:'100%',width:`${s.score}%`,background:s.color,borderRadius:3,transition:'width 0.3s'}}/></div><p style={{fontSize:12,color:'#666',marginTop:4}}>{s.label}</p></div>)}
    </div>
  );
}
