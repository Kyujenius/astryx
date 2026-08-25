import {useState, useEffect} from 'react';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

const allFruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon'];

export default function AutocompleteInput() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (query.length > 0) {
      const timer = setTimeout(() => {
        const results = allFruits.filter((f) => f.toLowerCase().includes(query.toLowerCase()));
        setSuggestions(results);
        setIsOpen(results.length > 0);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query]);

  return (
    <div className="space-y-2 p-6 max-w-sm relative">
      <Label htmlFor="search">Search Fruits</Label>
      <Input id="search" value={query} onChange={(e) => { setQuery(e.target.value); setSelected(''); }} placeholder="Type to search..." autoComplete="off" />
      {isOpen && (
        <ul className="absolute z-10 w-full bg-background border rounded-md shadow-md mt-1 max-h-48 overflow-y-auto" role="listbox">
          {suggestions.map((s) => (
            <li key={s} role="option" className="px-3 py-2 cursor-pointer hover:bg-muted text-sm" onClick={() => { setSelected(s); setQuery(s); setIsOpen(false); }}>
              {s}
            </li>
          ))}
        </ul>
      )}
      {selected && <p className="text-sm text-muted-foreground">Selected: {selected}</p>}
    </div>
  );
}
