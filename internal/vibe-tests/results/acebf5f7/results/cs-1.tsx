import React, {useState} from 'react';

const fruits = ['Apple', 'Banana', 'Mango', 'Peach', 'Strawberry'];
const ripenessLevels = ['Unripe', 'Slightly Ripe', 'Ripe', 'Very Ripe'];

export default function FruitPicker() {
  const [fruit, setFruit] = useState('Apple');
  const [ripeness, setRipeness] = useState('Ripe');
  return (
    <div style={{maxWidth: 400, padding: 24, border: '1px solid #ddd', borderRadius: 8}}>
      <h2 style={{margin: '0 0 16px', fontSize: 20, fontWeight: 600}}>Fruit Picker</h2>
      <div style={{marginBottom: 16}}>
        <label htmlFor="fruit" style={{display: 'block', marginBottom: 4, fontWeight: 500}}>Fruit</label>
        <select id="fruit" value={fruit} onChange={e => setFruit(e.target.value)} style={{width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc'}}>
          {fruits.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>
      <div style={{marginBottom: 16}}>
        <label htmlFor="ripeness" style={{display: 'block', marginBottom: 4, fontWeight: 500}}>Ripeness</label>
        <select id="ripeness" value={ripeness} onChange={e => setRipeness(e.target.value)} style={{width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc'}}>
          {ripenessLevels.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      <p style={{color: '#666', fontSize: 14}}>Selected: {fruit} - {ripeness}</p>
    </div>
  );
}
