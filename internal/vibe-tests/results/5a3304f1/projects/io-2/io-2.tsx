import {TextInput} from '@astryxdesign/core/TextInput';
import {Card} from '@astryxdesign/core/Card';
import {Text} from '@astryxdesign/core/Text';
import {Spinner} from '@astryxdesign/core/Spinner';
import stylex from '@stylexjs/stylex';
import {useState, useCallback, useRef, useEffect} from 'react';

const styles = stylex.create({
  container: {
    position: 'relative',
    width: '100%',
    maxWidth: 400,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 10,
    marginTop: 4,
    maxHeight: 240,
    overflowY: 'auto',
  },
  option: {
    padding: '8px 12px',
    cursor: 'pointer',
  },
  optionHighlighted: {
    backgroundColor: '#f0f0f0',
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  noResults: {
    padding: 12,
    textAlign: 'center',
  },
});

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && highlightIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[highlightIndex]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div {...stylex.props(styles.container)} onKeyDown={handleKeyDown}>
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
        <Card xstyle={styles.dropdown} role="listbox">
          {isLoading ? (
            <div {...stylex.props(styles.loading)}>
              <Spinner size="small" label="Loading suggestions" />
            </div>
          ) : suggestions.length === 0 ? (
            <div {...stylex.props(styles.noResults)}>
              <Text>No results found</Text>
            </div>
          ) : (
            suggestions.map((item, i) => (
              <div
                key={item.id}
                {...stylex.props(styles.option, i === highlightIndex && styles.optionHighlighted)}
                role="option"
                aria-selected={i === highlightIndex}
                onClick={() => handleSelect(item)}
              >
                <Text>{item.label}</Text>
              </div>
            ))
          )}
        </Card>
      )}
    </div>
  );
}
