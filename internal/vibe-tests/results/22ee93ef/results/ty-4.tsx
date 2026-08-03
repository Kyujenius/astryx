// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

const input = {width:'100%',padding:'8px 12px',border:'1px solid #ccc',borderRadius:4,fontSize:14};

export default function SettingsPage() {
  const [profile, setProfile] = useState({name:'',email:''});
  const [notif, setNotif] = useState({freq:''});
  const [sec, setSec] = useState({cur:'',newP:''});

  return (
    <div style={{maxWidth:560,margin:'0 auto',padding:32}}>
      <h1>Settings</h1>
      <section style={{marginTop:32}}>
        <h2>Profile</h2>
        <p style={{color:'#666',fontSize:14}}>Update your personal information.</p>
        <div style={{display:'flex',flexDirection:'column',gap:12,marginTop:12}}>
          <label>Display Name<input style={input} value={profile.name} onChange={e=>setProfile(s=>({...s,name:e.target.value}))} /></label>
          <label>Email<input style={input} type="email" value={profile.email} onChange={e=>setProfile(s=>({...s,email:e.target.value}))} /></label>
        </div>
      </section>
      <hr style={{margin:'24px 0',border:'none',borderTop:'1px solid #e0e0e0'}} />
      <section>
        <h2>Notifications</h2>
        <p style={{color:'#666',fontSize:14}}>Control notification frequency.</p>
        <label style={{display:'block',marginTop:12}}>Email Digest Frequency<input style={input} placeholder="daily, weekly" value={notif.freq} onChange={e=>setNotif(s=>({...s,freq:e.target.value}))} /></label>
      </section>
      <hr style={{margin:'24px 0',border:'none',borderTop:'1px solid #e0e0e0'}} />
      <section>
        <h2>Security</h2>
        <p style={{color:'#666',fontSize:14}}>Manage your password.</p>
        <div style={{display:'flex',flexDirection:'column',gap:12,marginTop:12}}>
          <label>Current Password<input style={input} type="password" value={sec.cur} onChange={e=>setSec(s=>({...s,cur:e.target.value}))} /></label>
          <label>New Password<input style={input} type="password" value={sec.newP} onChange={e=>setSec(s=>({...s,newP:e.target.value}))} /></label>
        </div>
      </section>
    </div>
  );
}
