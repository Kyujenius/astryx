import {useState, useCallback} from 'react';
interface Suggestion { id: string; label: string; }
export default function AutocompleteInput() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const onInput = useCallback(async (value: string) => {
    setQuery(value);
    if (!value.trim()) { setItems([]); setOpen(false); return; }
    try { const res = await fetch(`https://api.example.com/search?q=${encodeURIComponent(value)}`); const data = await res.json(); setItems(data.results.map((r: any) => ({id: r.id, label: r.name}))); setOpen(true); } catch { setItems([]); }
  }, []);
  return (<div style={{maxWidth: 400, margin: '0 auto', padding: 24}}><h2 style={{fontSize: 20, marginBottom: 12}}>Search</h2><div style={{position: 'relative'}}><input placeholder="Type to search..." value={query} onChange={e => onInput(e.target.value)} onBlur={() => setTimeout(() => setOpen(false), 200)} style={{width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4}} />{open && items.length > 0 && (<div style={{position: 'absolute', top: '100%', left: 0, right: 0, border: '1px solid #ddd', borderRadius: 4, backgroundColor: 'white', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', zIndex: 10}}>{items.map(item => (<div key={item.id} onClick={() => { setQuery(item.label); setOpen(false); }} style={{padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0'}}>{item.label}</div>))}</div>)}</div></div>);
}
