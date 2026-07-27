import {Typeahead} from '@astryxdesign/core/Typeahead';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Card} from '@astryxdesign/core/Card';
import {useState, useCallback} from 'react';

interface Suggestion { id: string; label: string; }

export default function AutocompleteInput() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSuggestions = useCallback(async (value: string) => {
    if (!value.trim()) { setSuggestions([]); return; }
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.example.com/search?q=${encodeURIComponent(value)}`);
      const data = await response.json();
      setSuggestions(data.results.map((r: any) => ({id: r.id, label: r.name})));
    } catch { setSuggestions([]); }
    finally { setIsLoading(false); }
  }, []);

  return (<Card><Stack gap="md"><Heading level={2}>Search</Heading><Typeahead label="Search for items" value={query} onChange={setQuery} onInputChange={fetchSuggestions} items={suggestions} isLoading={isLoading} placeholder="Type to search..." /></Stack></Card>);
}
