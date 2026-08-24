import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Checkbox} from '@/components/ui/checkbox';
import {useState} from 'react';

type Label = {name: string; color: string; description: string};

const labels: Label[] = [
  {name: 'bug', color: '#d73a4a', description: 'Something is broken'},
  {name: 'enhancement', color: '#a2eeef', description: 'New feature'},
  {name: 'documentation', color: '#0075ca', description: 'Docs improvement'},
  {name: 'good first issue', color: '#7057ff', description: 'Good for newcomers'},
  {name: 'help wanted', color: '#008672', description: 'Extra attention needed'},
];

export default function LabelPicker() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set(['bug']));
  const [open, setOpen] = useState(false);

  const filtered = labels.filter(l => l.name.includes(search.toLowerCase()));

  const toggle = (name: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  return (
    <div className="max-w-xs space-y-2">
      <Button variant="outline" onClick={() => setOpen(!open)}>Labels ({selected.size})</Button>
      {open && (
        <Card>
          <CardContent className="p-3 space-y-2">
            <Input placeholder="Filter labels" value={search} onChange={e => setSearch(e.target.value)} />
            {filtered.map(label => (
              <div key={label.name} className="flex items-center gap-2 py-1">
                <Checkbox checked={selected.has(label.name)} onCheckedChange={() => toggle(label.name)} id={label.name} />
                <span className="w-3 h-3 rounded-full" style={{backgroundColor: label.color}} />
                <label htmlFor={label.name} className="text-sm">{label.name}</label>
                <span className="text-xs text-muted-foreground">{label.description}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
