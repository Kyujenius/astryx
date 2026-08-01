import {TextInput} from '@astryxdesign/core/TextInput';
import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {CheckboxList} from '@astryxdesign/core/CheckboxList';
import {CheckboxListItem} from '@astryxdesign/core/CheckboxList';
import {useState} from 'react';

const labels = [
  {id: 'bug', name: 'bug', color: '#d73a4a', description: 'Something is broken'},
  {id: 'feature', name: 'feature', color: '#0075ca', description: 'New feature request'},
  {id: 'docs', name: 'documentation', color: '#0e8a16', description: 'Documentation improvements'},
  {id: 'help', name: 'help wanted', color: '#008672', description: 'Extra attention needed'},
  {id: 'wontfix', name: 'wontfix', color: '#ffffff', description: 'Will not be worked on'},
];

export default function LabelPicker() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = labels.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Stack gap={3} padding={4} maxWidth={320}>
      <Text type="display-3">Apply Labels</Text>
      <TextInput
        label="Filter labels"
        value={search}
        onChange={setSearch}
        isLabelHidden
      />
      <CheckboxList value={selected} onChange={setSelected}>
        {filtered.map((label) => (
          <CheckboxListItem key={label.id} value={label.id}>
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-3.5 w-3.5 rounded-full border border-black/10"
                style={{backgroundColor: label.color}}
              />
              <div>
                <Text type="body" weight="medium">{label.name}</Text>
                <Text type="supporting" color="secondary">{label.description}</Text>
              </div>
            </div>
          </CheckboxListItem>
        ))}
      </CheckboxList>
    </Stack>
  );
}
