import {useState, useEffect} from 'react';

const allFruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon'];

export default function AutocompleteInput() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (query.length > 0 && !selected) {
      const timer = setTimeout(() => {
        const results = allFruits.filter((f) => f.toLowerCase().includes(query.toLowerCase()));
        setSuggestions(results);
        setIsOpen(results.length > 0);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
    }
  }, [query, selected]);

  return (
    <div style={{padding: 24, maxWidth: 400, position: 'relative'}}>
      <label htmlFor="autocomplete" style={{display: 'block', marginBottom: 4, fontWeight: 500}}>Search Fruits</label>
      <input
        id="autocomplete"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setSelected(''); }}
        placeholder="Type to search..."
        autoComplete="off"
        role="combobox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        style={{width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc'}}
      />
      {isOpen && (
        <ul role="listbox" style={{position: 'absolute', width: '100%', listStyle: 'none', margin: 0, padding: 0, border: '1px solid #ccc', borderRadius: 4, backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', maxHeight: 200, overflowY: 'auto', zIndex: 10}}>
          {suggestions.map((s) => (
            <li key={s} role="option" onClick={() => { setSelected(s); setQuery(s); setIsOpen(false); }} style={{padding: '8px 12px', cursor: 'pointer'}}>{s}</li>
          ))}
        </ul>
      )}
      {selected && <p style={{marginTop: 8, color: '#666', fontSize: 14}}>Selected: {selected}</p>}
    </div>
  );
}
