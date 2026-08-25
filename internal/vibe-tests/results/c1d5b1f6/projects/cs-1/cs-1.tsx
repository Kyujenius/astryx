import {useState} from 'react';

const fruits = ['Apple', 'Banana', 'Cherry', 'Mango', 'Peach'];
const ripenessLevels = ['Unripe', 'Nearly Ripe', 'Ripe', 'Overripe'];

export default function FruitPicker() {
  const [fruit, setFruit] = useState('');
  const [ripeness, setRipeness] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const display = fruit && ripeness ? `${fruit} - ${ripeness}` : 'Select fruit and ripeness';

  return (
    <div style={{padding: 24, maxWidth: 500}}>
      <label style={{display: 'block', marginBottom: 8, fontWeight: 'bold'}}>Fruit Picker</label>
      <button onClick={() => setIsOpen(!isOpen)} style={{padding: '8px 16px', border: '1px solid #ccc', borderRadius: 4, cursor: 'pointer', width: '100%', textAlign: 'left'}}>
        {display}
      </button>
      {isOpen && (
        <div style={{border: '1px solid #ccc', borderRadius: 4, marginTop: 4, padding: 8}} role="grid">
          <div style={{display: 'grid', gridTemplateColumns: `100px repeat(${ripenessLevels.length}, 1fr)`, gap: 4}}>
            <div />
            {ripenessLevels.map((level) => (
              <div key={level} style={{textAlign: 'center', fontSize: 12, fontWeight: 'bold', padding: 4}}>{level}</div>
            ))}
            {fruits.map((f) => (
              <>
                <div key={`label-${f}`} style={{display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 500}}>{f}</div>
                {ripenessLevels.map((level) => {
                  const isSelected = fruit === f && ripeness === level;
                  return (
                    <button
                      key={`${f}-${level}`}
                      role="gridcell"
                      onClick={() => { setFruit(f); setRipeness(level); setIsOpen(false); }}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFruit(f); setRipeness(level); setIsOpen(false); }}}
                      style={{padding: 8, border: isSelected ? '2px solid #1976d2' : '1px solid #e0e0e0', borderRadius: 4, backgroundColor: isSelected ? '#e3f2fd' : '#fff', cursor: 'pointer'}}
                    >
                      {isSelected ? '\u2713' : '\u00A0'}
                    </button>
                  );
                })}
              </>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
