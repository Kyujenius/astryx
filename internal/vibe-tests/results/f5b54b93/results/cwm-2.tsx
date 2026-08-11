// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Checkbox} from '@/components/ui/checkbox';
import {Badge} from '@/components/ui/badge';
import {Label} from '@/components/ui/label';

interface IssueLabel {
  id: string;
  name: string;
  color: string;
}

const allLabels: IssueLabel[] = [
  {id: '1', name: 'bug', color: '#d73a4a'},
  {id: '2', name: 'enhancement', color: '#a2eeef'},
  {id: '3', name: 'documentation', color: '#0075ca'},
  {id: '4', name: 'good first issue', color: '#7057ff'},
  {id: '5', name: 'help wanted', color: '#008672'},
  {id: '6', name: 'question', color: '#d876e3'},
];

export default function LabelPicker() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = allLabels.filter((l) => l.name.toLowerCase().includes(search.toLowerCase()));

  const toggle = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  return (
    <div className="w-72 border rounded-lg p-3 space-y-3">
      <h3 className="font-semibold text-sm">Labels</h3>
      <Input placeholder="Filter labels" value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="space-y-2">
        {filtered.map((label) => (
          <div key={label.id} className="flex items-center gap-2">
            <Checkbox
              id={label.id}
              checked={selected.includes(label.id)}
              onCheckedChange={() => toggle(label.id)}
            />
            <span className="w-3 h-3 rounded-full" style={{backgroundColor: label.color}} />
            <Label htmlFor={label.id} className="text-sm">{label.name}</Label>
          </div>
        ))}
      </div>
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-2 border-t">
          {selected.map((id) => {
            const label = allLabels.find((l) => l.id === id);
            return label ? <Badge key={id} variant="secondary">{label.name}</Badge> : null;
          })}
        </div>
      )}
    </div>
  );
}
