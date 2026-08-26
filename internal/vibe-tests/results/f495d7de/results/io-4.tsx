import {useState} from 'react';

export default function QuantitySelector() {
  const [qty, setQty] = useState(1);
  const price = 29.99;

  return (
    <div style={{padding:20,border:'1px solid #e0e0e0',borderRadius:8,maxWidth:280}}>
      <p style={{fontWeight:500,margin:'0 0 4px'}}>Wireless Headphones</p>
      <p style={{color:'#666',margin:'0 0 12px',fontSize:14}}>${price.toFixed(2)} each</p>
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <button onClick={()=>setQty(Math.max(1,qty-1))} disabled={qty<=1} style={{width:32,height:32,borderRadius:4,border:'1px solid #ccc',background:'#fff',cursor:'pointer',fontSize:16}}>-</button>
        <input type="number" value={qty} onChange={e=>setQty(Math.max(1,Math.min(99,parseInt(e.target.value)||1)))} min={1} max={99} style={{width:48,textAlign:'center',padding:'4px',border:'1px solid #ccc',borderRadius:4}} aria-label="Quantity" />
        <button onClick={()=>setQty(Math.min(99,qty+1))} disabled={qty>=99} style={{width:32,height:32,borderRadius:4,border:'1px solid #ccc',background:'#fff',cursor:'pointer',fontSize:16}}>+</button>
      </div>
      <p style={{fontWeight:'bold',marginTop:12}}>Total: ${(qty*price).toFixed(2)}</p>
    </div>
  );
}
