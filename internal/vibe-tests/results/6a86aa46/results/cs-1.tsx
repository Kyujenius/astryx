import { useState } from 'react';

const fruits = ['Apple', 'Banana', 'Mango', 'Strawberry'];
const ripenessLevels = ['Unripe', 'Ripe', 'Overripe'];

type Selection = { fruit: string; ripeness: string };

export default function FruitPicker() {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState<Selection>({ fruit: 'Apple', ripeness: 'Ripe' });

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="dialog"
        style={{ padding: '8px 16px', border: '1px solid #ccc', borderRadius: 4, cursor: 'pointer', background: 'white', minWidth: 200, textAlign: 'left' }}
      >
        {selection.fruit} — {selection.ripeness}
        <span style={{ float: 'right' }}>▼</span>
      </button>
      {open && (
        <div role="dialog" aria-label="Fruit picker" style={{ position: 'absolute', top: '100%', left: 0, marginTop: 4, padding: 16, border: '1px solid #ccc', borderRadius: 8, background: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10 }}>
          <p style={{ fontWeight: 500, marginBottom: 8, fontSize: 14 }}>Select fruit and ripeness</p>
          <div role="grid" aria-label="Fruit ripeness grid" style={{ display: 'grid', gridTemplateColumns: `100px repeat(${ripenessLevels.length}, 80px)`, gap: 4 }}>
            <div role="columnheader" />
            {ripenessLevels.map((r) => (
              <div key={r} role="columnheader" style={{ fontSize: 12, textAlign: 'center', color: '#666' }}>{r}</div>
            ))}
            {fruits.map((fruit) => (
              <div key={fruit} role="row" style={{ display: 'contents' }}>
                <div role="rowheader" style={{ fontSize: 14, fontWeight: 500, padding: '4px 0' }}>{fruit}</div>
                {ripenessLevels.map((ripeness) => {
                  const isSelected = selection.fruit === fruit && selection.ripeness === ripeness;
                  return (
                    <button
                      key={ripeness}
                      role="gridcell"
                      aria-selected={isSelected}
                      onClick={() => { setSelection({ fruit, ripeness }); setOpen(false); }}
                      style={{ padding: 8, border: isSelected ? '2px solid #0066cc' : '1px solid #ddd', borderRadius: 4, background: isSelected ? '#e6f0ff' : 'white', cursor: 'pointer', fontSize: 12 }}
                    >
                      {isSelected ? '✓' : ''}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
