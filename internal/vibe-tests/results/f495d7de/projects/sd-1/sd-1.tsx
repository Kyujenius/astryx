import {useState, useEffect} from 'react';

type State = 'loading' | 'error' | 'data';

export default function DashboardWidget() {
  const [state, setState] = useState<State>('loading');

  useEffect(() => {
    const t = setTimeout(() => setState('error'), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{padding:20,border:'1px solid #e0e0e0',borderRadius:8,maxWidth:300}}>
      <h3 style={{margin:'0 0 12px'}}>Revenue</h3>
      {state === 'loading' && (
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          <div style={{height:20,width:'60%',background:'#eee',borderRadius:4,animation:'pulse 1.5s infinite'}} />
          <div style={{height:60,width:'100%',background:'#eee',borderRadius:4}} />
          <div style={{height:14,width:'40%',background:'#eee',borderRadius:4}} />
        </div>
      )}
      {state === 'error' && (
        <div>
          <p style={{color:'#d32f2f',marginBottom:8}}>Failed to load data.</p>
          <button onClick={()=>setState('loading')} style={{padding:'6px 12px',border:'1px solid #ccc',borderRadius:4,background:'#fff',cursor:'pointer'}}>Retry</button>
        </div>
      )}
      {state === 'data' && (
        <div>
          <p style={{fontSize:24,fontWeight:'bold',margin:'0 0 4px'}}>$12,450</p>
          <p style={{color:'#666',margin:0}}>+12% from last month</p>
        </div>
      )}
    </div>
  );
}
