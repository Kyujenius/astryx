// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Badge} from '@astryxdesign/core/Badge';
import {Heading} from '@astryxdesign/core/Heading';

type Label = {name: string; color: string; variant: 'blue' | 'green' | 'orange' | 'purple' | 'red' | 'teal' | 'yellow'};

const LABELS: Label[] = [
  {name: 'bug', color: '#d73a4a', variant: 'red'},
  {name: 'enhancement', color: '#a2eeef', variant: 'teal'},
  {name: 'documentation', color: '#0075ca', variant: 'blue'},
  {name: 'good first issue', color: '#7057ff', variant: 'purple'},
  {name: 'help wanted', color: '#008672', variant: 'green'},
  {name: 'wontfix', color: '#ffffff', variant: 'yellow'},
  {name: 'duplicate', color: '#cfd3d7', variant: 'orange'},
];

export default function IssueLabelPicker() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = LABELS.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()),
  );

  const toggle = (name: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(name)) {next.delete(name);}
      else {next.add(name);}
      return next;
    });
  };

  return (
    <div className="w-80 flex flex-col gap-3">
      <Heading level={3}>Labels</Heading>
      <TextInput
        label="Filter labels"
        isLabelHidden
        value={search}
        onChange={setSearch}
        placeholder="Filter labels"
        hasClear
      />
      <div className="flex flex-col gap-1">
        {filtered.map(label => (
          <div key={label.name} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{backgroundColor: label.color}}
            />
            <CheckboxInput
              label={label.name}
              value={selected.has(label.name)}
              onChange={() => toggle(label.name)}
            />
          </div>
        ))}
      </div>
      {selected.size > 0 && (
        <div className="flex flex-wrap gap-1">
          {[...selected].map(name => {
            const label = LABELS.find(l => l.name === name)!;
            return <Badge key={name} variant={label.variant} label={name} />;
          })}
        </div>
      )}
    </div>
  );
}
