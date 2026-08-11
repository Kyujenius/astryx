// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Stack} from '@astryxdesign/core/Stack';
import {TextInput} from '@astryxdesign/core/TextInput';
import {CheckboxList, CheckboxListItem} from '@astryxdesign/core/CheckboxList';
import {Badge} from '@astryxdesign/core/Badge';
import {Heading} from '@astryxdesign/core/Heading';

interface Label {
  id: string;
  name: string;
  color: string;
}

const allLabels: Label[] = [
  {id: '1', name: 'bug', color: '#d73a4a'},
  {id: '2', name: 'enhancement', color: '#a2eeef'},
  {id: '3', name: 'documentation', color: '#0075ca'},
  {id: '4', name: 'good first issue', color: '#7057ff'},
  {id: '5', name: 'help wanted', color: '#008672'},
  {id: '6', name: 'question', color: '#d876e3'},
];

export default function LabelPicker() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = allLabels.filter((label) =>
    label.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Stack gap={3}>
      <Heading level={3}>Labels</Heading>
      <TextInput
        label="Filter labels"
        isLabelHidden
        value={search}
        onChange={setSearch}
        placeholder="Filter labels"
        hasClear
      />
      <CheckboxList
        label="Select labels"
        isLabelHidden
        value={selected}
        onChange={setSelected}
      >
        {filtered.map((label) => (
          <CheckboxListItem
            key={label.id}
            value={label.id}
            label={label.name}
            startContent={
              <span
                style={{
                  display: 'inline-block',
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: label.color,
                }}
              />
            }
          />
        ))}
      </CheckboxList>
      {selected.length > 0 && (
        <Stack direction="horizontal" gap={1}>
          {selected.map((id) => {
            const label = allLabels.find((l) => l.id === id);
            return label ? <Badge key={id} label={label.name} /> : null;
          })}
        </Stack>
      )}
    </Stack>
  );
}
