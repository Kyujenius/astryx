import {useState} from 'react';

type Label = {name: string; color: string; description: string};

const labels: Label[] = [
  {name: 'bug', color: '#d73a4a', description: 'Something is broken'},
  {name: 'enhancement', color: '#a2eeef', description: 'New feature'},
  {name: 'documentation', color: '#0075ca', description: 'Docs improvement'},
  {name: 'good first issue', color: '#7057ff', description: 'Good for newcomers'},
  {name: 'help wanted', color: '#008672', description: 'Extra attention needed'},
];

export default function LabelPicker() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set(['bug']));
  const [open, setOpen] = useState(false);

  const filtered = labels.filter(l => l.name.includes(search.toLowerCase()));
  const toggle = (name: string) => {
    setSelected(prev => { const n = new Set(prev); n.has(name) ? n.delete(name) : n.add(name); return n; });
  };

  return (
    <div style={{maxWidth: '280px', fontFamily: 'system-ui'}}>
      <button onClick={() => setOpen(!open)} style={{padding: '6px 12px', border: '1px solid #ccc', borderRadius: '6px', cursor: 'pointer', background: 'white'}}>
        Labels ({selected.size})
      </button>
      {open && (
        <div style={{marginTop: '8px', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden'}}>
          <div style={{padding: '8px'}}>
            <input placeholder="Filter labels" value={search} onChange={e => setSearch(e.target.value)} style={{width: '100%', padding: '6px 10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px'}} />
          </div>
          {filtered.map(label => (
            <div key={label.name} style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', cursor: 'pointer'}} onClick={() => toggle(label.name)}>
              <input type="checkbox" checked={selected.has(label.name)} readOnly style={{margin: 0}} />
              <span style={{width: '12px', height: '12px', borderRadius: '50%', background: label.color, flexShrink: 0}} />
              <span style={{fontSize: '14px'}}>{label.name}</span>
              <span style={{fontSize: '11px', color: '#666'}}>{label.description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
