import {useState, useRef, useEffect} from 'react';

interface FolderNode { id: string; name: string; children?: FolderNode[]; }

const folders: FolderNode[] = [
  {id: '1', name: 'Documents', children: [
    {id: '1a', name: 'Work', children: [{id: '1a1', name: 'Reports'}, {id: '1a2', name: 'Presentations'}]},
    {id: '1b', name: 'Personal'},
  ]},
  {id: '2', name: 'Projects', children: [{id: '2a', name: 'Frontend'}, {id: '2b', name: 'Backend'}]},
  {id: '3', name: 'Archive'},
];

function FolderTree({items, depth, onSelect}: {items: FolderNode[]; depth: number; onSelect: (name: string) => void}) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  return (
    <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
      {items.map(item => (
        <li key={item.id}>
          <button
            onClick={() => item.children ? setExpanded(s => {const n = new Set(s); n.has(item.id) ? n.delete(item.id) : n.add(item.id); return n;}) : onSelect(item.name)}
            style={{display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', paddingLeft: depth * 20 + 8, width: '100%', border: 'none', background: 'none', cursor: 'pointer', borderRadius: 4, fontSize: 14}}
            onMouseEnter={e => (e.currentTarget.style.background = '#f3f4f6')}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}
          >
            {item.children && <span style={{fontSize: 10}}>{expanded.has(item.id) ? '▼' : '▶'}</span>}
            <span>📁</span>
            <span>{item.name}</span>
          </button>
          {item.children && expanded.has(item.id) && <FolderTree items={item.children} depth={depth + 1} onSelect={onSelect} />}
        </li>
      ))}
    </ul>
  );
}

export default function DestinationPicker() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{position: 'relative', width: 300}}>
      <label style={{display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4}}>Destination</label>
      <button onClick={() => setOpen(!open)} style={{width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, textAlign: 'left', background: 'white', cursor: 'pointer'}}>
        {selected || 'Choose a folder...'}
      </button>
      {open && (
        <div style={{position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4, border: '1px solid #d1d5db', borderRadius: 8, background: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10, padding: 8}}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{width: '100%', padding: '6px 10px', border: '1px solid #e5e7eb', borderRadius: 4, marginBottom: 8, fontSize: 14}} />
          <div style={{maxHeight: 240, overflow: 'auto'}}>
            <FolderTree items={folders} depth={0} onSelect={name => { setSelected(name); setOpen(false); }} />
          </div>
        </div>
      )}
    </div>
  );
}
