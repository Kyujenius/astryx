// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useEffect} from 'react';

const NAV = ['Dashboard','Analytics','Settings','Help'];

export default function ResponsiveSidebar() {
  const [sel, setSel] = useState('Dashboard');
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => { const c=()=>setMobile(window.innerWidth<768); c(); window.addEventListener('resize',c); return ()=>window.removeEventListener('resize',c); }, []);

  const navBtn = (item: string) => (
    <button key={item} onClick={()=>{setSel(item);setOpen(false);}} style={{display:'block',width:'100%',textAlign:'left',padding:'8px 16px',border:'none',borderRadius:4,cursor:'pointer',background:sel===item?'#0066cc':'transparent',color:sel===item?'#fff':'#333'}}>{item}</button>
  );

  if (mobile) {
    return (
      <div style={{minHeight:'100vh',position:'relative'}}>
        <div style={{padding:16}}><h2>{sel}</h2><p style={{color:'#666'}}>Content for {sel} goes here.</p></div>
        {open && <div style={{position:'fixed',bottom:0,left:0,right:0,background:'#fff',border:'1px solid #e0e0e0',borderRadius:'12px 12px 0 0',padding:16,boxShadow:'0 -4px 12px rgba(0,0,0,0.1)'}}>{NAV.map(navBtn)}</div>}
        <button onClick={()=>setOpen(!open)} style={{position:'fixed',bottom:16,right:16,background:'#0066cc',color:'#fff',border:'none',borderRadius:8,padding:'12px 20px',cursor:'pointer'}}>{open?'Close':'Menu'}</button>
      </div>
    );
  }

  return (
    <div style={{display:'flex',height:'100vh'}}>
      <aside style={{width:220,borderRight:'1px solid #e0e0e0',padding:16,display:'flex',flexDirection:'column',gap:4}}>{NAV.map(navBtn)}</aside>
      <main style={{flex:1,padding:24}}><h2>{sel}</h2><p style={{color:'#666'}}>Content for {sel} goes here.</p></main>
    </div>
  );
}
