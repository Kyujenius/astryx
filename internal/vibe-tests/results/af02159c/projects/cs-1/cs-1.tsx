import {useState} from 'react';

const fruits = ['Apple', 'Banana', 'Mango', 'Strawberry'];
const ripenessLevels = ['Unripe', 'Ripe', 'Very Ripe'];

export default function FruitPicker() {
  const [fruit, setFruit] = useState('Apple');
  const [ripeness, setRipeness] = useState('Ripe');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{fontFamily: 'system-ui, sans-serif', padding: 24, maxWidth: 400}}>
      <label style={{display: 'block', marginBottom: 8, fontWeight: 600}}>Fruit & Ripeness</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%', padding: '8px 12px', border: '1px solid #ccc',
          borderRadius: 6, background: '#fff', cursor: 'pointer', textAlign: 'left',
        }}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {fruit} — {ripeness}
      </button>
      {isOpen && (
        <div style={{border: '1px solid #e0e0e0', borderRadius: 6, marginTop: 4, padding: 12, background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
          <div style={{display: 'grid', gridTemplateColumns: `repeat(${fruits.length}, 1fr)`, gap: 8}} role="grid" aria-label="Fruit and ripeness selection">
            {fruits.map((f) => (
              <div key={f} role="row">
                <div style={{fontWeight: 500, marginBottom: 4, fontSize: 14}}>{f}</div>
                {ripenessLevels.map((r) => (
                  <button
                    key={r}
                    role="gridcell"
                    onClick={() => { setFruit(f); setRipeness(r); setIsOpen(false); }}
                    style={{
                      display: 'block', width: '100%', padding: '4px 8px',
                      border: fruit === f && ripeness === r ? '2px solid #0066cc' : '1px solid transparent',
                      borderRadius: 4, background: fruit === f && ripeness === r ? '#e6f0ff' : 'transparent',
                      cursor: 'pointer', fontSize: 13, textAlign: 'left', marginBottom: 2,
                    }}
                    aria-selected={fruit === f && ripeness === r}
                  >
                    {r}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
