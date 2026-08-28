import {useState} from 'react';
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from '@/components/ui/command';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Button} from '@/components/ui/button';

type Folder = {id: string; name: string; children?: Folder[]};

const folderTree: Folder[] = [
  {id: '1', name: 'Documents', children: [
    {id: '1-1', name: 'Work', children: [{id: '1-1-1', name: 'Reports'}, {id: '1-1-2', name: 'Presentations'}]},
    {id: '1-2', name: 'Personal'},
  ]},
  {id: '2', name: 'Photos', children: [{id: '2-1', name: 'Vacation'}, {id: '2-2', name: 'Family'}]},
  {id: '3', name: 'Projects', children: [{id: '3-1', name: 'Alpha'}, {id: '3-2', name: 'Beta'}]},
];

function flatten(folders: Folder[], prefix = ''): Array<{id: string; path: string}> {
  const result: Array<{id: string; path: string}> = [];
  for (const f of folders) {
    const path = prefix ? `${prefix} / ${f.name}` : f.name;
    result.push({id: f.id, path});
    if (f.children) result.push(...flatten(f.children, path));
  }
  return result;
}

export default function ProjectDestinationPicker() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const options = flatten(folderTree);

  return (
    <div className="flex flex-col gap-4 p-6 max-w-md">
      <h2 className="text-xl font-semibold">Move to folder</h2>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start w-full">
            {selected ? options.find(o => o.id === selected)?.path : 'Select a folder...'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <Command>
            <CommandInput placeholder="Search folders..." />
            <CommandList>
              <CommandEmpty>No folders found.</CommandEmpty>
              <CommandGroup>
                {options.map(opt => (
                  <CommandItem
                    key={opt.id}
                    value={opt.path}
                    onSelect={() => { setSelected(opt.id); setOpen(false); }}
                  >
                    {opt.path}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {selected && (
        <p className="text-sm text-muted-foreground">
          Selected: {options.find(o => o.id === selected)?.path}
        </p>
      )}
    </div>
  );
}
