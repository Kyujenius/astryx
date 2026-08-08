// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Checkbox} from '@/components/ui/checkbox';
import {Badge} from '@/components/ui/badge';
import {Label} from '@/components/ui/label';

type LabelData = {name: string; color: string};

const LABELS: LabelData[] = [
  {name: 'bug', color: '#d73a4a'},
  {name: 'enhancement', color: '#a2eeef'},
  {name: 'documentation', color: '#0075ca'},
  {name: 'good first issue', color: '#7057ff'},
  {name: 'help wanted', color: '#008672'},
  {name: 'wontfix', color: '#ffffff'},
  {name: 'duplicate', color: '#cfd3d7'},
];

export default function IssueLabelPicker() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = LABELS.filter(l => l.name.toLowerCase().includes(search.toLowerCase()));

  const toggle = (name: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(name)) {next.delete(name);}
      else {next.add(name);}
      return next;
    });
  };

  return (
    <div className="w-80 space-y-3">
      <h3 className="text-lg font-semibold">Labels</h3>
      <Input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Filter labels"
      />
      <div className="space-y-1">
        {filtered.map(label => (
          <div key={label.name} className="flex items-center gap-2 py-1">
            <span className="w-3 h-3 rounded-full shrink-0" style={{backgroundColor: label.color}} />
            <Checkbox
              id={`label-${label.name}`}
              checked={selected.has(label.name)}
              onCheckedChange={() => toggle(label.name)}
            />
            <Label htmlFor={`label-${label.name}`} className="cursor-pointer">{label.name}</Label>
          </div>
        ))}
      </div>
      {selected.size > 0 && (
        <div className="flex flex-wrap gap-1 pt-2">
          {[...selected].map(name => {
            const label = LABELS.find(l => l.name === name)!;
            return (
              <Badge key={name} style={{backgroundColor: label.color, color: '#000'}}>
                {name}
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
