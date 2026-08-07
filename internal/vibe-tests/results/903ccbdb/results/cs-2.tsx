import {useState, useCallback} from 'react';
import {Popover} from '@astryxdesign/core/Popover';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TreeList} from '@astryxdesign/core/TreeList';
import {Button} from '@astryxdesign/core/Button';
import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';

interface FolderNode {
  id: string;
  label: string;
  children?: FolderNode[];
  isExpanded?: boolean;
}

const folders: FolderNode[] = [
  {id: '1', label: 'Documents', children: [
    {id: '1a', label: 'Work', children: [
      {id: '1a1', label: 'Reports'},
      {id: '1a2', label: 'Presentations'},
    ]},
    {id: '1b', label: 'Personal'},
  ]},
  {id: '2', label: 'Projects', children: [
    {id: '2a', label: 'Design System'},
    {id: '2b', label: 'Marketing Site'},
  ]},
  {id: '3', label: 'Archive'},
];

export default function DestinationPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const filterItems = useCallback((items: FolderNode[], query: string): FolderNode[] => {
    if (!query) return items;
    return items.reduce<FolderNode[]>((acc, item) => {
      if (item.label.toLowerCase().includes(query.toLowerCase())) {
        acc.push(item);
      } else if (item.children) {
        const filtered = filterItems(item.children, query);
        if (filtered.length > 0) {
          acc.push({...item, children: filtered, isExpanded: true});
        }
      }
      return acc;
    }, []);
  }, []);

  const filteredFolders = filterItems(folders, search);

  const handleSelect = useCallback((id: string, label: string) => {
    setSelected(label);
    setIsOpen(false);
    setSearch('');
  }, []);

  const content = (
    <Stack direction="vertical" gap={2} padding={2}>
      <TextInput
        label="Search destinations"
        value={search}
        onChange={setSearch}
        placeholder="Filter folders..."
      />
      <TreeList
        items={filteredFolders.map(f => ({
          ...f,
          isExpanded: true,
        }))}
      />
    </Stack>
  );

  return (
    <Stack direction="vertical" gap={2}>
      <Text type="label">Destination</Text>
      <Popover
        content={content}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        width={320}
        label="Choose destination folder"
      >
        <Button
          label={selected || 'Choose a folder...'}
          variant="secondary"
          onClick={() => setIsOpen(true)}
        />
      </Popover>
    </Stack>
  );
}
