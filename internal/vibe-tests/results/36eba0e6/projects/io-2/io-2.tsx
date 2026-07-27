import {Typeahead} from '@astryxdesign/core/Typeahead';
import {Heading} from '@astryxdesign/core/Heading';
import {useState, useCallback} from 'react';

interface Suggestion { id: string; label: string; }
export default function AutocompleteInput() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const onInputChange = useCallback(async (value: string) => {
    if (!value.trim()) { setItems([]); return; }
    setLoading(true);
    try { const res = await fetch(`https://api.example.com/search?q=${encodeURIComponent(value)}`); const data = await res.json(); setItems(data.results.map((r: any) => ({id: r.id, label: r.name}))); } catch { setItems([]); } finally { setLoading(false); }
  }, []);
  return (<div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow"><Heading level={2}>Search</Heading><div className="mt-4"><Typeahead label="Search items" value={query} onChange={setQuery} onInputChange={onInputChange} items={items} isLoading={loading} placeholder="Type to search..." /></div></div>);
}
