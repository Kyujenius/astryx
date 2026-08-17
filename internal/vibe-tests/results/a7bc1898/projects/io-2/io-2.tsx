import {useState, useEffect, useRef} from 'react';

const mockData = ['React', 'TypeScript', 'JavaScript', 'Python', 'Rust', 'Go', 'Ruby', 'Swift'];

export default function AutocompleteInput() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        setSuggestions(mockData.filter(item => item.toLowerCase().includes(query.toLowerCase())));
        setIsOpen(true);
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  const select = (item: string) => {
    setValue(item);
    setQuery(item);
    setIsOpen(false);
  };

  return (
    <div style={{maxWidth: 320, margin: '0 auto', position: 'relative'}}>
      <label htmlFor="search" style={{display: 'block', marginBottom: 4, fontWeight: 500, fontSize: 14}}>Search languages</label>
      <input
        id="search"
        ref={inputRef}
        type="text"
        value={query}
        onChange={e => { setQuery(e.target.value); setValue(''); }}
        onFocus={() => query && setIsOpen(true)}
        placeholder="Type to search..."
        role="combobox"
        aria-expanded={isOpen}
        aria-autocomplete="list"
        style={{width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 14}}
      />
      {isOpen && suggestions.length > 0 && (
        <ul role="listbox" style={{position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1px solid #ddd', borderRadius: 6, marginTop: 4, listStyle: 'none', padding: 4, maxHeight: 200, overflow: 'auto', zIndex: 10}}>
          {suggestions.map(item => (
            <li
              key={item}
              role="option"
              aria-selected={item === value}
              onClick={() => select(item)}
              style={{padding: '8px 12px', cursor: 'pointer', borderRadius: 4, background: item === value ? '#f0f7ff' : 'transparent', fontSize: 14}}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
