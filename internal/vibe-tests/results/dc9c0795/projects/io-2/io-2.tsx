import {useState, useEffect} from 'react';
import {Command, CommandInput, CommandItem, CommandList, CommandEmpty} from '@/components/ui/command';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Button} from '@/components/ui/button';

const mockData = ['React', 'TypeScript', 'JavaScript', 'Python', 'Rust', 'Go', 'Ruby', 'Swift'];

export default function AutocompleteInput() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query) {
        setSuggestions(mockData.filter(item => item.toLowerCase().includes(query.toLowerCase())));
      } else {
        setSuggestions(mockData.slice(0, 5));
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="max-w-sm mx-auto p-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-left font-normal" aria-label="Search languages">
            {value || 'Search languages...'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Type to search..." value={query} onValueChange={setQuery} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {suggestions.map(item => (
                <CommandItem
                  key={item}
                  onSelect={() => {
                    setValue(item);
                    setOpen(false);
                  }}
                >
                  {item}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
