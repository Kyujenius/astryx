import {useState} from 'react';
const plans = [{name:'Starter',m:9,a:7,f:['5 projects','10 GB storage','Email support']},{name:'Pro',m:29,a:23,f:['Unlimited projects','100 GB storage','Priority support','API access'],pop:true},{name:'Enterprise',m:99,a:79,f:['Unlimited everything','1 TB storage','Dedicated support','Custom integrations','SLA']}];
export default function PricingTable() {
  const [b, setB] = useState<'m'|'a'>('m');
  return (
    <div style={{fontFamily:'system-ui',textAlign:'center'}}>
      <h2 style={{fontSize:28,fontWeight:700}}>Pricing</h2>
      <p style={{color:'#666',marginBottom:16}}>Choose the plan that fits your needs</p>
      <div style={{display:'inline-flex',gap:4,border:'1px solid #ddd',borderRadius:8,padding:4,marginBottom:24}}>
        <button onClick={()=>setB('m')} style={{padding:'6px 16px',borderRadius:6,border:'none',background:b==='m'?'#0066cc':'transparent',color:b==='m'?'white':'#333',cursor:'pointer'}}>Monthly</button>
        <button onClick={()=>setB('a')} style={{padding:'6px 16px',borderRadius:6,border:'none',background:b==='a'?'#0066cc':'transparent',color:b==='a'?'white':'#333',cursor:'pointer'}}>Annual</button>
      </div>
      <div style={{display:'flex',gap:24,justifyContent:'center',flexWrap:'wrap'}}>
        {plans.map(p=>(
          <div key={p.name} style={{border:p.pop?'2px solid #0066cc':'1px solid #ddd',borderRadius:12,padding:24,width:260,textAlign:'left'}}>
            <div style={{display:'flex',alignItems:'center',gap:8}}><h3 style={{fontSize:20,fontWeight:600}}>{p.name}</h3>{p.pop&&<span style={{background:'#e0f0ff',color:'#0066cc',padding:'2px 8px',borderRadius:10,fontSize:12}}>Popular</span>}</div>
            <div style={{marginTop:8}}><span style={{fontSize:32,fontWeight:700}}>${b==='m'?p.m:p.a}</span><span style={{color:'#666'}}>/mo</span></div>
            {b==='a'&&<p style={{fontSize:12,color:'#666'}}>Save {Math.round((1-p.a/p.m)*100)}%</p>}
            <hr style={{margin:'16px 0',border:'none',borderTop:'1px solid #eee'}}/>
            <ul style={{listStyle:'none',padding:0,margin:'0 0 16px'}}>{p.f.map(f=><li key={f} style={{padding:'4px 0',fontSize:14}}>{f}</li>)}</ul>
            <button style={{width:'100%',padding:'10px 0',borderRadius:6,border:p.pop?'none':'1px solid #ddd',background:p.pop?'#0066cc':'white',color:p.pop?'white':'#333',cursor:'pointer',fontSize:14}}>Get {p.name}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
