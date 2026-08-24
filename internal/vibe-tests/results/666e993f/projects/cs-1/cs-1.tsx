import {useState} from 'react';

const fruits = ['Apple', 'Banana', 'Mango', 'Peach', 'Strawberry'];
const ripenessLevels = ['Unripe', 'Nearly Ripe', 'Ripe', 'Overripe'];

export default function FruitPicker() {
  const [value, setValue] = useState('');

  return (
    <div style={{padding: '24px', maxWidth: '300px'}}>
      <label htmlFor="fruit-select" style={{display: 'block', marginBottom: '8px', fontWeight: 600}}>
        Fruit & Ripeness
      </label>
      <select
        id="fruit-select"
        value={value}
        onChange={e => setValue(e.target.value)}
        style={{width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '14px'}}
      >
        <option value="">Pick a fruit and ripeness</option>
        {fruits.map(fruit => (
          <optgroup key={fruit} label={fruit}>
            {ripenessLevels.map(r => (
              <option key={`${fruit}-${r}`} value={`${fruit}::${r}`}>{fruit} - {r}</option>
            ))}
          </optgroup>
        ))}
      </select>
      {value && <p style={{marginTop: '12px', fontSize: '14px', color: '#666'}}>Selected: {value.replace('::', ' - ')}</p>}
    </div>
  );
}
