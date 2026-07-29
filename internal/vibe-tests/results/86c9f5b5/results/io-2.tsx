import {TextInput} from '@astryxdesign/core/TextInput';
import {Card} from '@astryxdesign/core/Card';
import {Text} from '@astryxdesign/core/Text';
import {Spinner} from '@astryxdesign/core/Spinner';
import {useState, useCallback, useRef} from 'react';

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

export default function Autocomplete({
  fetchSuggestions,
  onSelect,
  placeholder = 'Search...',
  label = 'Search',
}: AutocompleteProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const search = useCallback(async (value: string) => {
    if (value.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }
    setIsLoading(true);
    try {
      const results = await fetchSuggestions(value);
      setSuggestions(results);
      setIsOpen(results.length > 0);
    } finally {
      setIsLoading(false);
    }
  }, [fetchSuggestions]);

  const handleChange = (value: string) => {
    setQuery(value);
    setHighlightIndex(-1);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(value), 300);
  };

  const handleSelect = (item: Suggestion) => {
    setQuery(item.label);
    setIsOpen(false);
    onSelect(item);
  };

  return (
    <div className="relative w-full max-w-md">
      <TextInput
        label={label}
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        aria-expanded={isOpen}
        aria-autocomplete="list"
        role="combobox"
      />
      {isOpen && (
        <Card>
          <div className="absolute top-full left-0 right-0 z-10 mt-1 max-h-60 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center p-4">
                <Spinner size="small" label="Loading" />
              </div>
            ) : (
              suggestions.map((item, i) => (
                <div
                  key={item.id}
                  className={`p-2 cursor-pointer ${i === highlightIndex ? 'bg-gray-100' : ''}`}
                  role="option"
                  aria-selected={i === highlightIndex}
                  onClick={() => handleSelect(item)}
                >
                  <Text>{item.label}</Text>
                </div>
              ))
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
