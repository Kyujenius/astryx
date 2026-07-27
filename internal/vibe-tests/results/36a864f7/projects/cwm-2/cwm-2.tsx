import {useState} from 'react';
const LABELS = [{name: 'bug', color: '#d73a4a', description: "Something isn't working"},{name: 'enhancement', color: '#a2eeef', description: 'New feature'},{name: 'documentation', color: '#0075ca', description: 'Docs'},{name: 'good first issue', color: '#7057ff', description: 'Newcomers'},{name: 'help wanted', color: '#008672', description: 'Attention needed'}];
export default function IssueLabelPicker() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const filtered = LABELS.filter(l => l.name.includes(search.toLowerCase()));
  const toggle = (name: string) => setSelected(p => p.includes(name) ? p.filter(n => n !== name) : [...p, name]);
  return (<div style={{width: 320, border: '1px solid #ddd', borderRadius: 8, padding: 12}}><input placeholder="Filter labels" value={search} onChange={e => setSearch(e.target.value)} style={{width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4}} /><div style={{marginTop: 12}}>{filtered.map(label => (<div key={label.name} style={{display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid #f0f0f0'}}><input type="checkbox" checked={selected.includes(label.name)} onChange={() => toggle(label.name)} /><span style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: label.color, display: 'inline-block'}} /><span style={{fontSize: 14, fontWeight: 500}}>{label.name}</span><span style={{fontSize: 12, color: '#666', marginLeft: 'auto'}}>{label.description}</span></div>))}</div>{selected.length > 0 && <button onClick={() => setSelected([])} style={{marginTop: 8, fontSize: 12, background: 'none', border: 'none', color: '#0070f3', cursor: 'pointer'}}>Clear all</button>}</div>);
}
