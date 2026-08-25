import {useState} from 'react';
import {Typeahead} from '@astryxdesign/core/Typeahead';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';

interface Suggestion { id: string; label: string; }

const allSuggestions: Suggestion[] = [
  {id: '1', label: 'Apple'}, {id: '2', label: 'Banana'}, {id: '3', label: 'Cherry'},
  {id: '4', label: 'Date'}, {id: '5', label: 'Elderberry'}, {id: '6', label: 'Fig'},
  {id: '7', label: 'Grape'}, {id: '8', label: 'Honeydew'}, {id: '9', label: 'Kiwi'},
  {id: '10', label: 'Lemon'},
];

export default function AutocompleteInput() {
  const [selected, setSelected] = useState<Suggestion | null>(null);

  const searchSource = {
    search: async (query: string) => {
      await new Promise((r) => setTimeout(r, 200));
      return allSuggestions.filter((s) => s.label.toLowerCase().includes(query.toLowerCase()));
    },
    bootstrap: async () => allSuggestions.slice(0, 5),
    getLabel: (item: Suggestion) => item.label,
    getKey: (item: Suggestion) => item.id,
  };

  return (
    <div className="max-w-sm mx-auto">
      <VStack gap={4} padding={4}>
        <Heading level={2}>Search Fruits</Heading>
        <Typeahead label="Search fruits" searchSource={searchSource} value={selected} onChange={setSelected} placeholder="Type to search..." hasEntriesOnFocus debounceMs={200} />
      </VStack>
    </div>
  );
}
