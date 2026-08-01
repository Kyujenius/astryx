import {useState} from 'react';

const labels = [
  {id: 'bug', name: 'bug', color: '#d73a4a', description: 'Something is broken'},
  {id: 'feature', name: 'feature', color: '#0075ca', description: 'New feature request'},
  {id: 'docs', name: 'documentation', color: '#0e8a16', description: 'Documentation improvements'},
  {id: 'help', name: 'help wanted', color: '#008672', description: 'Extra attention needed'},
  {id: 'wontfix', name: 'wontfix', color: '#ffffff', description: 'Will not be worked on'},
];

export default function LabelPicker() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = labels.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div style={{maxWidth: 320, padding: 16, fontFamily: 'system-ui, sans-serif'}}>
      <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 12}}>Apply Labels</h2>
      <input
        placeholder="Filter labels"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 6, marginBottom: 12}}
      />
      <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
        {filtered.map((label) => (
          <label key={label.id} style={{display: 'flex', alignItems: 'flex-start', gap: 8, cursor: 'pointer'}}>
            <input
              type="checkbox"
              checked={selected.includes(label.id)}
              onChange={() => toggle(label.id)}
              style={{marginTop: 3}}
            />
            <span
              style={{width: 14, height: 14, borderRadius: '50%', backgroundColor: label.color, border: '1px solid rgba(0,0,0,0.1)', flexShrink: 0, marginTop: 2}}
            />
            <div>
              <span style={{fontWeight: 500}}>{label.name}</span>
              <p style={{margin: 0, fontSize: 12, color: '#666'}}>{label.description}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
