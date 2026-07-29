import {Input} from '@/components/ui/input';
import {Card, CardContent} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {useState, useRef, useCallback} from 'react';

interface Suggestion {
  id: string;
  label: string;
}

interface AutocompleteProps {
  fetchSuggestions: (query: string) => Promise<Suggestion[]>;
  onSelect: (item: Suggestion) => void;
  placeholder?: string;
  label?: string;
}

export default function Autocomplete({fetchSuggestions, onSelect, placeholder, label = 'Search'}: AutocompleteProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const search = useCallback(async (value: string) => {
    if (value.length < 2) { setSuggestions([]); setIsOpen(false); return; }
    setIsLoading(true);
    try {
      const results = await fetchSuggestions(value);
      setSuggestions(results);
      setIsOpen(results.length > 0);
    } finally { setIsLoading(false); }
  }, [fetchSuggestions]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(value), 300);
  };

  return (
    <div className="relative w-full max-w-md">
      <Label>{label}</Label>
      <Input value={query} onChange={handleChange} placeholder={placeholder} role="combobox" aria-expanded={isOpen} />
      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-10 max-h-60 overflow-y-auto">
          <CardContent className="p-0">
            {isLoading ? (
              <p className="p-3 text-center text-muted-foreground">Loading...</p>
            ) : (
              suggestions.map((item) => (
                <div
                  key={item.id}
                  className="p-2 hover:bg-accent cursor-pointer"
                  role="option"
                  onClick={() => { setQuery(item.label); setIsOpen(false); onSelect(item); }}
                >
                  {item.label}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
