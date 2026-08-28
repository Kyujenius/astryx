import {useState, useRef, useEffect} from 'react';

type Folder = {id: string; name: string; children?: Folder[]};

const folderTree: Folder[] = [
  {id: '1', name: 'Documents', children: [
    {id: '1-1', name: 'Work', children: [{id: '1-1-1', name: 'Reports'}, {id: '1-1-2', name: 'Presentations'}]},
    {id: '1-2', name: 'Personal'},
  ]},
  {id: '2', name: 'Photos', children: [{id: '2-1', name: 'Vacation'}, {id: '2-2', name: 'Family'}]},
  {id: '3', name: 'Projects', children: [{id: '3-1', name: 'Alpha'}, {id: '3-2', name: 'Beta'}]},
];

function flatten(folders: Folder[], prefix = ''): Array<{id: string; path: string}> {
  const result: Array<{id: string; path: string}> = [];
  for (const f of folders) {
    const path = prefix ? `${prefix} / ${f.name}` : f.name;
    result.push({id: f.id, path});
    if (f.children) result.push(...flatten(f.children, path));
  }
  return result;
}

export default function ProjectDestinationPicker() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const [highlighted, setHighlighted] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const options = flatten(folderTree);
  const filtered = options.filter(o => o.path.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => { setHighlighted(0); }, [search]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlighted(h => Math.min(h + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlighted(h => Math.max(h - 1, 0)); }
    else if (e.key === 'Enter' && filtered[highlighted]) { setSelected(filtered[highlighted].id); setOpen(false); }
    else if (e.key === 'Escape') { setOpen(false); }
  };

  return (
    <div style={{padding: 24, maxWidth: 400, fontFamily: 'system-ui'}}>
      <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 16}}>Move to folder</h2>
      <button
        onClick={() => setOpen(!open)}
        onKeyDown={handleKeyDown}
        style={{width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 6, textAlign: 'left', cursor: 'pointer', background: 'white'}}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selected ? options.find(o => o.id === selected)?.path : 'Select a folder...'}
      </button>
      {open && (
        <div style={{border: '1px solid #ccc', borderRadius: 6, marginTop: 4, background: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
          <input
            type="text"
            placeholder="Search folders..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            style={{width: '100%', padding: '8px 12px', border: 'none', borderBottom: '1px solid #eee', outline: 'none', boxSizing: 'border-box'}}
          />
          <ul ref={listRef} role="listbox" style={{listStyle: 'none', margin: 0, padding: 4, maxHeight: 200, overflow: 'auto'}}>
            {filtered.length === 0 && <li style={{padding: '8px 12px', color: '#999'}}>No folders found</li>}
            {filtered.map((opt, i) => (
              <li
                key={opt.id}
                role="option"
                aria-selected={i === highlighted}
                onClick={() => { setSelected(opt.id); setOpen(false); }}
                style={{padding: '8px 12px', borderRadius: 4, cursor: 'pointer', background: i === highlighted ? '#f0f0f0' : 'transparent'}}
              >
                {opt.path}
              </li>
            ))}
          </ul>
        </div>
      )}
      {selected && <p style={{fontSize: 13, color: '#666', marginTop: 8}}>Selected: {options.find(o => o.id === selected)?.path}</p>}
    </div>
  );
}
