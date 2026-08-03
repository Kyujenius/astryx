// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

const THEMES = [
  {id:'default',name:'Default',desc:'Clean and minimal',bg:'#ffffff',text:'#1a1a1a',accent:'#0066cc'},
  {id:'midnight',name:'Midnight',desc:'Dark purple ambiance',bg:'#1a0a2e',text:'#e8e0f0',accent:'#9b59b6'},
  {id:'forest',name:'Forest',desc:'Dark green serenity',bg:'#0a1f0a',text:'#d4edda',accent:'#28a745'},
];

export default function ThemeSwitcher() {
  const [active, setActive] = useState('default');

  return (
    <div style={{padding:24}}>
      <h2>Theme</h2>
      <p style={{color:'#666'}}>Choose a theme for your workspace.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:16,marginTop:16}}>
        {THEMES.map(t=>(
          <div key={t.id} style={{border:'1px solid #e0e0e0',borderRadius:8,padding:16}}>
            <div style={{width:'100%',height:80,borderRadius:8,background:t.bg,border:'1px solid #ddd',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <span style={{color:t.accent,fontWeight:600,fontSize:14}}>Aa</span>
            </div>
            <h3 style={{marginTop:12}}>{t.name}</h3>
            <p style={{color:'#999',fontSize:13}}>{t.desc}</p>
            <button onClick={()=>setActive(t.id)} disabled={active===t.id} style={{width:'100%',marginTop:8,padding:'8px 16px',border:'none',borderRadius:4,cursor:active===t.id?'default':'pointer',background:active===t.id?'#0066cc':'#f0f0f0',color:active===t.id?'#fff':'#333'}}>
              {active===t.id?'Active':'Apply'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
