import {useState} from 'react';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Checkbox} from '@/components/ui/checkbox';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';

const allTags = ['Frontend', 'Backend', 'Design', 'DevOps', 'Mobile'];

interface Result {
  id: string;
  name: string;
  tags: string[];
}

const data: Result[] = [
  {id: '1', name: 'Auth Service', tags: ['Backend', 'DevOps']},
  {id: '2', name: 'Dashboard UI', tags: ['Frontend', 'Design']},
  {id: '3', name: 'Mobile App', tags: ['Mobile', 'Frontend']},
  {id: '4', name: 'API Gateway', tags: ['Backend']},
  {id: '5', name: 'Design System', tags: ['Frontend', 'Design']},
];

export default function FilterableResults() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filtered = selectedTags.length === 0
    ? data
    : data.filter(item => item.tags.some(t => selectedTags.includes(t)));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" aria-label="Filter by tags">
              {selectedTags.length === 0 ? 'Filter by tags' : `${selectedTags.length} selected`}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            <div className="space-y-2">
              {allTags.map(tag => (
                <label key={tag} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={() => toggleTag(tag)}
                  />
                  {tag}
                </label>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        {selectedTags.map(tag => (
          <Badge key={tag} variant="secondary">{tag}</Badge>
        ))}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Tags</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.tags.join(', ')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
