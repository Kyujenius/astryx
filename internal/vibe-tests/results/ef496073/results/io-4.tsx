import {useState} from 'react';

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);
  const pricePerItem = 29.99;
  const handleChange = (val: number) => setQuantity(Math.min(99, Math.max(1, val)));

  return (
    <div style={{maxWidth: 320, border: '1px solid #e5e7eb', borderRadius: 8, padding: 24, fontFamily: 'system-ui'}}>
      <p style={{fontWeight: 600, marginBottom: 4}}>Premium Widget</p>
      <p style={{fontSize: 14, color: '#666', marginBottom: 16}}>${pricePerItem.toFixed(2)} each</p>
      <label style={{display: 'block', marginBottom: 4, fontSize: 14, fontWeight: 500}}>Quantity</label>
      <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16}}>
        <button onClick={() => handleChange(quantity - 1)} disabled={quantity <= 1} style={{width: 36, height: 36, border: '1px solid #ccc', borderRadius: 4, backgroundColor: 'white', cursor: quantity > 1 ? 'pointer' : 'default'}}>-</button>
        <input type="number" value={quantity} onChange={(e) => handleChange(parseInt(e.target.value) || 1)} min={1} max={99} style={{width: 60, textAlign: 'center', padding: 8, border: '1px solid #ccc', borderRadius: 4}} />
        <button onClick={() => handleChange(quantity + 1)} disabled={quantity >= 99} style={{width: 36, height: 36, border: '1px solid #ccc', borderRadius: 4, backgroundColor: 'white', cursor: quantity < 99 ? 'pointer' : 'default'}}>+</button>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 16}}>
        <span>Total:</span>
        <span style={{fontWeight: 600}}>${(quantity * pricePerItem).toFixed(2)}</span>
      </div>
      <button style={{width: '100%', padding: '10px 16px', border: 'none', borderRadius: 4, backgroundColor: '#2563eb', color: 'white', cursor: 'pointer', fontWeight: 500}}>Add to cart</button>
    </div>
  );
}
