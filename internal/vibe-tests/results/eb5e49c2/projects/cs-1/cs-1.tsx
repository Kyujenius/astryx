import {useState, useRef, useEffect} from 'react';

const fruits = ['Apple', 'Banana', 'Mango', 'Peach', 'Strawberry'];
const ripenessLevels = ['Unripe', 'Slightly Ripe', 'Ripe', 'Overripe'];

export default function FruitPicker() {
  const [fruit, setFruit] = useState('Apple');
  const [ripeness, setRipeness] = useState('Ripe');
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{position: 'relative', display: 'inline-block'}}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{padding: '8px 16px', border: '1px solid #ccc', borderRadius: 6, cursor: 'pointer', minWidth: 200, textAlign: 'left'}}
      >
        {fruit} - {ripeness}
      </button>
      {isOpen && (
        <div style={{position: 'absolute', top: '100%', left: 0, marginTop: 4, background: '#fff', border: '1px solid #ccc', borderRadius: 6, padding: 16, zIndex: 10, minWidth: 220}}>
          <fieldset style={{border: 'none', padding: 0, margin: '0 0 12px 0'}}>
            <legend style={{fontWeight: 600, marginBottom: 8}}>Fruit</legend>
            {fruits.map((f) => (
              <label key={f} style={{display: 'block', padding: '4px 0', cursor: 'pointer'}}>
                <input type="radio" name="fruit" value={f} checked={fruit === f} onChange={() => setFruit(f)} style={{marginRight: 8}} />
                {f}
              </label>
            ))}
          </fieldset>
          <fieldset style={{border: 'none', padding: 0, margin: 0}}>
            <legend style={{fontWeight: 600, marginBottom: 8}}>Ripeness</legend>
            {ripenessLevels.map((r) => (
              <label key={r} style={{display: 'block', padding: '4px 0', cursor: 'pointer'}}>
                <input type="radio" name="ripeness" value={r} checked={ripeness === r} onChange={() => { setRipeness(r); setIsOpen(false); }} style={{marginRight: 8}} />
                {r}
              </label>
            ))}
          </fieldset>
        </div>
      )}
    </div>
  );
}
