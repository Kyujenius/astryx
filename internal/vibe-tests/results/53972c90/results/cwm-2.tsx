import * as React from 'react';
import {Input} from '../components/ui/input';
import {Checkbox} from '../components/ui/checkbox';
import {Label} from '../components/ui/label';

const labels = [
  {id: 'bug', name: 'bug', color: '#d73a4a', description: 'Something is broken'},
  {id: 'feature', name: 'feature', color: '#0075ca', description: 'New feature request'},
  {id: 'docs', name: 'documentation', color: '#0e8a16', description: 'Documentation improvements'},
  {id: 'help', name: 'help wanted', color: '#008672', description: 'Extra attention needed'},
  {id: 'wontfix', name: 'wontfix', color: '#ffffff', description: 'Will not be worked on'},
];

export default function LabelPicker() {
  const [search, setSearch] = React.useState('');
  const [selected, setSelected] = React.useState<string[]>([]);

  const filtered = labels.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-80 space-y-3 p-4">
      <h2 className="text-xl font-semibold">Apply Labels</h2>
      <Input
        placeholder="Filter labels"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="space-y-2">
        {filtered.map((label) => (
          <div key={label.id} className="flex items-start gap-2">
            <Checkbox
              id={label.id}
              checked={selected.includes(label.id)}
              onCheckedChange={() => toggle(label.id)}
            />
            <Label htmlFor={label.id} className="flex items-center gap-2 cursor-pointer">
              <span
                className="inline-block h-3.5 w-3.5 rounded-full border"
                style={{backgroundColor: label.color}}
              />
              <div>
                <span className="font-medium">{label.name}</span>
                <p className="text-xs text-muted-foreground">{label.description}</p>
              </div>
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
