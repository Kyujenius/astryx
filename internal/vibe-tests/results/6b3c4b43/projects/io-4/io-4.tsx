import {useState} from 'react';
export default function QuantitySelector() {
  const [qty, setQty] = useState(1);
  const [up, setUp] = useState(false);
  const update = async(v:number) => {const c=Math.max(1,Math.min(99,v));setQty(c);setUp(true);try{await fetch('/api/cart/update',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({quantity:c})})}finally{setUp(false)}};
  return (
    <div style={{fontFamily:'system-ui'}}>
      <label style={{display:'block',marginBottom:4,fontWeight:600,fontSize:14}}>Quantity</label>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <button onClick={()=>update(qty-1)} disabled={qty<=1} style={{width:32,height:32,borderRadius:6,border:'1px solid #ccc',background:'white',cursor:'pointer',fontSize:16}}>-</button>
        <input type="number" value={qty} onChange={e=>update(Number(e.target.value))} min={1} max={99} style={{width:60,textAlign:'center',padding:'6px',borderRadius:6,border:'1px solid #ccc',fontSize:14}}/>
        <button onClick={()=>update(qty+1)} disabled={qty>=99} style={{width:32,height:32,borderRadius:6,border:'1px solid #ccc',background:'white',cursor:'pointer',fontSize:16}}>+</button>
      </div>
      {up&&<p style={{fontSize:12,color:'#666',marginTop:4}}>Updating cart...</p>}
    </div>
  );
}
