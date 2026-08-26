import {useState} from 'react';

export default function SettingsDashboard() {
  const [dark, setDark] = useState(false);
  const [notifs, setNotifs] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  const Toggle = ({checked, onChange, label}: {checked:boolean; onChange:(v:boolean)=>void; label:string}) => (
    <button onClick={()=>onChange(!checked)} role="switch" aria-checked={checked} aria-label={label}
      style={{width:44,height:24,borderRadius:12,border:'none',background:checked?'#0066cc':'#ccc',position:'relative',cursor:'pointer',transition:'background 0.2s'}}>
      <span style={{position:'absolute',top:2,left:checked?22:2,width:20,height:20,borderRadius:10,background:'#fff',transition:'left 0.2s'}} />
    </button>
  );

  return (
    <div style={{display:'flex',height:'100vh'}}>
      <aside style={{width:200,borderRight:'1px solid #e0e0e0',padding:16}}>
        <h3 style={{marginBottom:12}}>Settings</h3>
        {['General','Account','Notifications','Privacy'].map(s=><button key={s} style={{display:'block',width:'100%',textAlign:'left',padding:'8px 12px',border:'none',background:'none',cursor:'pointer',borderRadius:4}}>{s}</button>)}
      </aside>
      <main style={{flex:1}}>
        <header style={{padding:16,borderBottom:'1px solid #e0e0e0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h2 style={{margin:0}}>General Settings</h2>
          <button style={{padding:'8px 16px',background:'#0066cc',color:'#fff',border:'none',borderRadius:4,cursor:'pointer'}}>Save</button>
        </header>
        <div style={{padding:24}}>
          {[{label:'Dark Mode',desc:'Use dark theme',val:dark,set:setDark},{label:'Notifications',desc:'Push notifications',val:notifs,set:setNotifs},{label:'Auto-save',desc:'Save automatically',val:autoSave,set:setAutoSave}].map((item,i)=>(
            <div key={item.label}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 0'}}>
                <div><p style={{margin:0,fontWeight:500}}>{item.label}</p><p style={{margin:0,fontSize:13,color:'#666'}}>{item.desc}</p></div>
                <Toggle checked={item.val} onChange={item.set} label={item.label} />
              </div>
              {i<2 && <hr style={{border:'none',borderTop:'1px solid #eee'}} />}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
