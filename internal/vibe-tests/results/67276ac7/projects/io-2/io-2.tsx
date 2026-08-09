// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from '@/components/ui/command';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Button} from '@/components/ui/button';

const DATA = [
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
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('');

  return (
    <div className="p-4 max-w-sm space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {selected || 'Search...'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Type to search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {DATA.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.label}
                    onSelect={(val) => { setSelected(val); setOpen(false); }}
                  >
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {selected && <p className="text-sm text-muted-foreground">Selected: {selected}</p>}
    </div>
  );
}
