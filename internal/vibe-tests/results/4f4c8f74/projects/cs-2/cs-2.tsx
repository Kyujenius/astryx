import {useState} from 'react';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {ScrollArea} from '@/components/ui/scroll-area';
import {ChevronRight, Folder} from 'lucide-react';

interface FolderNode {
  id: string;
  name: string;
  children?: FolderNode[];
}

const folders: FolderNode[] = [
  {id: '1', name: 'Documents', children: [
    {id: '1a', name: 'Work', children: [{id: '1a1', name: 'Reports'}, {id: '1a2', name: 'Presentations'}]},
    {id: '1b', name: 'Personal'},
  ]},
  {id: '2', name: 'Projects', children: [{id: '2a', name: 'Design'}, {id: '2b', name: 'Engineering'}]},
  {id: '3', name: 'Archive'},
];

function FolderItem({node, depth, onSelect}: {node: FolderNode; depth: number; onSelect: (name: string) => void}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <button
        className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded hover:bg-accent"
        style={{paddingLeft: depth * 16 + 8}}
        onClick={() => node.children ? setExpanded(!expanded) : onSelect(node.name)}
        onKeyDown={e => e.key === 'Enter' && (node.children ? setExpanded(!expanded) : onSelect(node.name))}
      >
        {node.children && <ChevronRight className={`h-3 w-3 transition ${expanded ? 'rotate-90' : ''}`} />}
        <Folder className="h-4 w-4" />
        <span>{node.name}</span>
      </button>
      {expanded && node.children?.map(child => (
        <FolderItem key={child.id} node={child} depth={depth + 1} onSelect={onSelect} />
      ))}
    </div>
  );
}

export default function DestinationPicker() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('');

  const handleSelect = (name: string) => {
    setSelected(name);
    setOpen(false);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Destination</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {selected || 'Choose a folder...'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <div className="p-2">
            <Input placeholder="Search folders..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <ScrollArea className="h-64 p-2">
            {folders.map(f => <FolderItem key={f.id} node={f} depth={0} onSelect={handleSelect} />)}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
}
