import {useState} from 'react';
import {Selector} from '@astryxdesign/core/Selector';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

type Folder = {
  id: string;
  name: string;
  children?: Folder[];
};

const folderTree: Folder[] = [
  {id: '1', name: 'Documents', children: [
    {id: '1-1', name: 'Work', children: [
      {id: '1-1-1', name: 'Reports'},
      {id: '1-1-2', name: 'Presentations'},
    ]},
    {id: '1-2', name: 'Personal'},
  ]},
  {id: '2', name: 'Photos', children: [
    {id: '2-1', name: 'Vacation'},
    {id: '2-2', name: 'Family'},
  ]},
  {id: '3', name: 'Projects', children: [
    {id: '3-1', name: 'Alpha'},
    {id: '3-2', name: 'Beta'},
  ]},
];

function flattenFolders(folders: Folder[], prefix = ''): Array<{value: string; label: string}> {
  const result: Array<{value: string; label: string}> = [];
  for (const folder of folders) {
    const path = prefix ? `${prefix} / ${folder.name}` : folder.name;
    result.push({value: folder.id, label: path});
    if (folder.children) {
      result.push(...flattenFolders(folder.children, path));
    }
  }
  return result;
}

export default function ProjectDestinationPicker() {
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const options = flattenFolders(folderTree);

  return (
    <div className="flex flex-col gap-4 p-6 max-w-md">
      <Heading level={2}>Move to folder</Heading>
      <Selector
        label="Destination folder"
        placeholder="Search and select a folder..."
        hasSearch
        searchPlaceholder="Search folders..."
        options={options}
        value={selected}
        onChange={setSelected}
        emptySearchText="No matching folders"
      />
      {selected && (
        <Text type="supporting" color="secondary">
          Selected: {options.find(o => o.value === selected)?.label}
        </Text>
      )}
    </div>
  );
}
