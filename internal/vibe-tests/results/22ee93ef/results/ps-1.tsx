// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

const NAV = ['General','Notifications','Privacy','Appearance','Integrations'];

export default function SettingsDashboard() {
  const [active, setActive] = useState('General');

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100vh'}}>
      <header style={{borderBottom:'1px solid #e0e0e0',padding:'16px 24px'}}><h1 style={{margin:0}}>Settings</h1></header>
      <div style={{display:'flex',flex:1}}>
        <nav style={{width:200,borderRight:'1px solid #e0e0e0',padding:16,display:'flex',flexDirection:'column',gap:4}}>
          {NAV.map(item=>(
            <button key={item} onClick={()=>setActive(item)} style={{textAlign:'left',padding:'8px 12px',border:'none',borderRadius:4,cursor:'pointer',background:active===item?'#0066cc':'transparent',color:active===item?'#fff':'#333'}}>{item}</button>
          ))}
        </nav>
        <main style={{flex:1,padding:24}}>
          <h2>{active}</h2>
          <section style={{marginTop:24}}><h3>Profile</h3><p style={{color:'#666'}}>Manage your profile.</p></section>
          <section style={{marginTop:24}}><h3>Account</h3><p style={{color:'#666'}}>Update account settings.</p></section>
          <section style={{marginTop:24}}><h3>Preferences</h3><p style={{color:'#666'}}>Customize your experience.</p></section>
        </main>
      </div>
    </div>
  );
}
