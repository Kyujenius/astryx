import {useState, useCallback} from 'react';
import {Popover} from '@astryxdesign/core/Popover';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TreeList} from '@astryxdesign/core/TreeList';
import {Button} from '@astryxdesign/core/Button';
import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';

const folders = [
  {id: '1', label: 'Documents', children: [
    {id: '1a', label: 'Work', children: [{id: '1a1', label: 'Reports'}, {id: '1a2', label: 'Slides'}]},
    {id: '1b', label: 'Personal'},
  ]},
  {id: '2', label: 'Projects', children: [{id: '2a', label: 'Frontend'}, {id: '2b', label: 'Backend'}]},
  {id: '3', label: 'Shared'},
];

export default function DestinationPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const content = (
    <Stack direction="vertical" gap={2} padding={2}>
      <TextInput label="Search" value={search} onChange={setSearch} placeholder="Filter..." />
      <TreeList items={folders} />
    </Stack>
  );

  return (
    <div className="max-w-sm">
      <Text type="label">Destination</Text>
      <Popover content={content} isOpen={isOpen} onOpenChange={setIsOpen} width={300} label="Pick folder">
        <Button label={selected || 'Choose folder...'} variant="secondary" onClick={() => setIsOpen(true)} />
      </Popover>
    </div>
  );
}
