import {useState, useMemo} from 'react';
interface Todo {id:string;title:string;status:'Open'|'Closed';createdAt:string;updatedAt:string;pending?:boolean}
const PAGE=25;const now=()=>new Date().toISOString();let nid=31;
const init:Todo[]=Array.from({length:30},(_,i)=>({id:String(i+1),title:`Task ${i+1}`,status:i%3===0?'Closed':'Open' as any,createdAt:new Date(2024,0,i+1).toISOString(),updatedAt:new Date(2024,1,i+1).toISOString()}));
type SK='updatedAt'|'createdAt'|'title';
export default function TodoTracker() {
  const [todos,setTodos]=useState<Todo[]>(init);const [ft,setFt]=useState('');const [fs,setFs]=useState('');const [sk,setSk]=useState<SK>('updatedAt');const [sd,setSd]=useState(true);const [pg,setPg]=useState(1);const [sc,setSc]=useState(false);const [nt,setNt]=useState('');const [ei,setEi]=useState<string|null>(null);const [et,setEt]=useState('');const [di,setDi]=useState<string|null>(null);
  const list=useMemo(()=>{let r=todos;if(ft)r=r.filter(t=>t.title.toLowerCase().includes(ft.toLowerCase()));if(fs)r=r.filter(t=>t.status===fs);return[...r].sort((a,b)=>{const c=a[sk]<b[sk]?-1:a[sk]>b[sk]?1:0;return sd?-c:c})},[todos,ft,fs,sk,sd]);
  const tp=Math.max(1,Math.ceil(list.length/PAGE));const pg2=list.slice((pg-1)*PAGE,pg*PAGE);
  const sty={input:{padding:'8px 12px',borderRadius:6,border:'1px solid #ccc',fontSize:14} as const,btn:{padding:'8px 16px',borderRadius:6,border:'none',cursor:'pointer',fontSize:14} as const};
  return (
    <div style={{fontFamily:'system-ui'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
        <h2 style={{fontSize:24,fontWeight:700,margin:0}}>TodoTracker</h2>
        <button onClick={()=>setSc(true)} style={{...sty.btn,background:'#0066cc',color:'white'}}>Create Todo</button>
      </div>
      <div style={{display:'flex',gap:8,marginBottom:16}}>
        <input placeholder="Filter by title..." value={ft} onChange={e=>setFt(e.target.value)} style={{...sty.input,flex:1}}/>
        <select value={fs} onChange={e=>setFs(e.target.value)} style={sty.input}><option value="">All</option><option>Open</option><option>Closed</option></select>
      </div>
      <table style={{width:'100%',borderCollapse:'collapse'}}>
        <thead><tr>{[{k:'title' as SK,l:'Title'},{k:'createdAt' as SK,l:'Created'},{k:'updatedAt' as SK,l:'Updated'}].map(h=><th key={h.k} onClick={()=>{if(sk===h.k)setSd(!sd);else{setSk(h.k);setSd(true)}}} style={{textAlign:'left',padding:'8px 12px',borderBottom:'2px solid #e5e7eb',fontSize:14,fontWeight:600,cursor:'pointer'}}>{h.l}{sk===h.k?(sd?' ↓':' ↑'):''}</th>)}<th style={{textAlign:'left',padding:'8px 12px',borderBottom:'2px solid #e5e7eb',fontSize:14,fontWeight:600}}>Status</th><th style={{textAlign:'left',padding:'8px 12px',borderBottom:'2px solid #e5e7eb',fontSize:14,fontWeight:600}}>Actions</th></tr></thead>
        <tbody>{pg2.map(t=><tr key={t.id} style={{opacity:t.pending?0.5:1}}>
          <td style={{padding:'8px 12px',borderBottom:'1px solid #f3f4f6'}}>{ei===t.id?<div style={{display:'flex',gap:4}}><input value={et} onChange={e=>setEt(e.target.value)} style={{...sty.input,height:28}}/><button onClick={()=>{if(et.trim()){setTodos(p=>p.map(x=>x.id===ei?{...x,title:et,updatedAt:now(),pending:true}:x));setTimeout(()=>setTodos(p=>p.map(x=>x.id===ei?{...x,pending:false}:x)),500);setEi(null)}}} style={{...sty.btn,background:'#0066cc',color:'white',padding:'4px 8px'}}>Save</button><button onClick={()=>setEi(null)} style={{...sty.btn,padding:'4px 8px'}}>Cancel</button></div>:<span style={{cursor:'pointer'}} onClick={()=>{setEi(t.id);setEt(t.title)}}>{t.title}{t.pending?' (pending)':''}</span>}</td>
          <td style={{padding:'8px 12px',borderBottom:'1px solid #f3f4f6'}}>{new Date(t.createdAt).toLocaleDateString()}</td>
          <td style={{padding:'8px 12px',borderBottom:'1px solid #f3f4f6'}}>{new Date(t.updatedAt).toLocaleDateString()}</td>
          <td style={{padding:'8px 12px',borderBottom:'1px solid #f3f4f6'}}><button onClick={()=>{setTodos(p=>p.map(x=>x.id===t.id?{...x,status:x.status==='Open'?'Closed':'Open',updatedAt:now(),pending:true}:x));setTimeout(()=>setTodos(p=>p.map(x=>x.id===t.id?{...x,pending:false}:x)),500)}} style={{...sty.btn,padding:'4px 12px',background:t.status==='Open'?'#e5e7eb':'transparent',border:'1px solid #ccc'}}>{t.status}</button></td>
          <td style={{padding:'8px 12px',borderBottom:'1px solid #f3f4f6'}}><button onClick={()=>setDi(t.id)} style={{...sty.btn,background:'#ef4444',color:'white',padding:'4px 12px'}}>Delete</button></td>
        </tr>)}</tbody>
      </table>
      <div style={{display:'flex',justifyContent:'center',gap:8,marginTop:16}}>
        <button disabled={pg<=1} onClick={()=>setPg(pg-1)} style={{...sty.btn,border:'1px solid #ccc',background:'white'}}>Prev</button>
        <span style={{alignSelf:'center',fontSize:14}}>Page {pg} of {tp}</span>
        <button disabled={pg>=tp} onClick={()=>setPg(pg+1)} style={{...sty.btn,border:'1px solid #ccc',background:'white'}}>Next</button>
      </div>
      {sc&&<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center'}} onClick={()=>setSc(false)}><div onClick={e=>e.stopPropagation()} style={{background:'white',borderRadius:12,padding:24,width:360}}>
        <h3 style={{margin:'0 0 16px',fontSize:18,fontWeight:600}}>Create Todo</h3>
        <input placeholder="Title" value={nt} onChange={e=>setNt(e.target.value)} style={{...sty.input,width:'100%',boxSizing:'border-box',marginBottom:12}}/>
        <div style={{display:'flex',gap:8}}><button onClick={()=>{if(nt.trim()){const t:Todo={id:String(nid++),title:nt,status:'Open',createdAt:now(),updatedAt:now(),pending:true};setTodos(p=>[t,...p]);setNt('');setSc(false);setTimeout(()=>setTodos(p=>p.map(x=>x.id===t.id?{...x,pending:false}:x)),500)}}} disabled={!nt.trim()} style={{...sty.btn,background:nt.trim()?'#0066cc':'#ccc',color:'white'}}>Create</button><button onClick={()=>setSc(false)} style={sty.btn}>Cancel</button></div>
      </div></div>}
      {di&&<div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{background:'white',borderRadius:12,padding:24,width:320}}>
        <h3 style={{margin:'0 0 8px',fontSize:18,fontWeight:600}}>Delete todo?</h3><p style={{color:'#666',marginBottom:16}}>This cannot be undone.</p>
        <div style={{display:'flex',gap:8}}><button onClick={()=>{setTodos(p=>p.map(t=>t.id===di?{...t,pending:true}:t));setTimeout(()=>setTodos(p=>p.filter(t=>t.id!==di)),500);setDi(null)}} style={{...sty.btn,background:'#ef4444',color:'white'}}>Delete</button><button onClick={()=>setDi(null)} style={sty.btn}>Cancel</button></div>
      </div></div>}
    </div>
  );
}
