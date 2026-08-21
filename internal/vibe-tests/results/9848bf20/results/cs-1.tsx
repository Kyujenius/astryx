import {useState} from 'react';

const fruits = ['Apple', 'Banana', 'Mango', 'Strawberry'];
const ripenessLevels = ['Unripe', 'Almost Ripe', 'Ripe', 'Overripe'];

export default function FruitPicker() {
  const [fruit, setFruit] = useState('Apple');
  const [ripeness, setRipeness] = useState('Ripe');

  return (
    <div style={{padding: '24px', maxWidth: '400px', fontFamily: 'system-ui'}}>
      <h2 style={{marginBottom: '16px'}}>Fruit Picker</h2>
      <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
        <div>
          <label htmlFor="fruit" style={{display: 'block', marginBottom: '4px', fontWeight: 500}}>Fruit</label>
          <select id="fruit" value={fruit} onChange={e => setFruit(e.target.value)} style={{width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}>
            {fruits.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="ripeness" style={{display: 'block', marginBottom: '4px', fontWeight: 500}}>Ripeness</label>
          <select id="ripeness" value={ripeness} onChange={e => setRipeness(e.target.value)} style={{width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}>
            {ripenessLevels.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>
      <p style={{marginTop: '16px', color: '#666'}}>Selected: {fruit} - {ripeness}</p>
    </div>
  );
}
