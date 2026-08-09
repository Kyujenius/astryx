// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useEffect, useRef} from 'react';

const DATA = ['Apple', 'Application', 'Banana', 'Barcelona', 'Cherry', 'Chicago', 'Dragon fruit', 'Denver'];

export default function AutocompleteInput() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      const timer = setTimeout(() => {
        setResults(DATA.filter((item) => item.toLowerCase().includes(query.toLowerCase())));
        setIsOpen(true);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {setIsOpen(false);}
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div style={{padding: 16, maxWidth: 400, fontFamily: 'system-ui'}} ref={ref}>
      <label style={{display: 'block', fontWeight: 600, marginBottom: 4}}>Search</label>
      <input
        type="text"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setSelected(''); }}
        placeholder="Type to search..."
        style={{width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, boxSizing: 'border-box'}}
      />
      {isOpen && results.length > 0 && (
        <ul style={{listStyle: 'none', padding: 0, margin: 0, border: '1px solid #e5e7eb', borderRadius: 4, marginTop: 4, maxHeight: 200, overflowY: 'auto'}}>
          {results.map((item) => (
            <li key={item} onClick={() => { setSelected(item); setQuery(item); setIsOpen(false); }} style={{padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid #f3f4f6'}}>
              {item}
            </li>
          ))}
        </ul>
      )}
      {selected && <p style={{fontSize: 14, color: '#666', marginTop: 8}}>Selected: {selected}</p>}
    </div>
  );
}
