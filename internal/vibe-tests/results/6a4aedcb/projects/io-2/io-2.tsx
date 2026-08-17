import {useState} from 'react';
import {Typeahead} from '@astryxdesign/core/Typeahead';

interface Suggestion {
  id: string;
  label: string;
}

const mockData: Suggestion[] = [
  {id: '1', label: 'React'},
  {id: '2', label: 'TypeScript'},
  {id: '3', label: 'JavaScript'},
  {id: '4', label: 'Python'},
  {id: '5', label: 'Rust'},
  {id: '6', label: 'Go'},
];

export default function AutocompleteInput() {
  const [value, setValue] = useState<Suggestion | null>(null);

  const searchSource = {
    search: async (query: string) => {
      await new Promise(resolve => setTimeout(resolve, 150));
      return mockData.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase())
      );
    },
    bootstrap: async () => mockData.slice(0, 5),
    getKey: (item: Suggestion) => item.id,
    getLabel: (item: Suggestion) => item.label,
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <Typeahead
        label="Search languages"
        searchSource={searchSource}
        value={value}
        onChange={setValue}
        placeholder="Type to search..."
        hasEntriesOnFocus
        hasClear
      />
    </div>
  );
}
