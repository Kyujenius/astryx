// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Typeahead} from '@astryxdesign/core/Typeahead';
import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';

type Suggestion = {id: string; label: string};

const DATA: Suggestion[] = [
  {id: '1', label: 'Apple'},
  {id: '2', label: 'Application'},
  {id: '3', label: 'Banana'},
  {id: '4', label: 'Barcelona'},
  {id: '5', label: 'Cherry'},
  {id: '6', label: 'Chicago'},
  {id: '7', label: 'Dragon fruit'},
  {id: '8', label: 'Denver'},
];

export default function AutocompleteInput() {
  const [selected, setSelected] = useState<Suggestion | null>(null);

  const searchSource = {
    search: async (query: string) => {
      await new Promise((r) => setTimeout(r, 150));
      return DATA.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()));
    },
    bootstrap: async () => DATA.slice(0, 5),
    getLabel: (item: Suggestion) => item.label,
    getKey: (item: Suggestion) => item.id,
  };

  return (
    <Stack gap={3} padding={4} maxWidth={400}>
      <Typeahead
        label="Search"
        searchSource={searchSource}
        value={selected}
        onChange={setSelected}
        placeholder="Type to search..."
        hasEntriesOnFocus
      />
      {selected && (
        <p className="text-sm text-gray-600">Selected: {selected.label}</p>
      )}
    </Stack>
  );
}
