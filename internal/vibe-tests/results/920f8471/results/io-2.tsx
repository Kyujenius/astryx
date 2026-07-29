import {useState, useRef, useCallback} from 'react';

interface Suggestion { id: string; label: string; }

export default function Autocomplete({
  fetchSuggestions, onSelect, placeholder = 'Search...',
}: {fetchSuggestions: (q: string) => Promise<Suggestion[]>; onSelect: (s: Suggestion) => void; placeholder?: string}) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const search = useCallback(async (value: string) => {
    if (value.length < 2) { setSuggestions([]); setIsOpen(false); return; }
    setIsLoading(true);
    try { const r = await fetchSuggestions(value); setSuggestions(r); setIsOpen(r.length > 0); }
    finally { setIsLoading(false); }
  }, [fetchSuggestions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setQuery(v);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(v), 300);
  };

  return (
    <div style={{position: 'relative', maxWidth: 400}}>
      <input
        value={query} onChange={handleChange} placeholder={placeholder}
        style={{width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4}}
        role="combobox" aria-expanded={isOpen}
      />
      {isOpen && (
        <div style={{position: 'absolute', top: '100%', left: 0, right: 0, border: '1px solid #e0e0e0', borderRadius: 4, backgroundColor: '#fff', zIndex: 10, marginTop: 4, maxHeight: 240, overflowY: 'auto'}}>
          {isLoading ? <p style={{padding: 12, textAlign: 'center'}}>Loading...</p> : (
            suggestions.map((s) => (
              <div key={s.id} onClick={() => { setQuery(s.label); setIsOpen(false); onSelect(s); }}
                style={{padding: '8px 12px', cursor: 'pointer'}} role="option">{s.label}</div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
