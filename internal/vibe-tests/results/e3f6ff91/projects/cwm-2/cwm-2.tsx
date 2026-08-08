// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Stack} from '@astryxdesign/core/Stack';
import {TextInput} from '@astryxdesign/core/TextInput';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Badge} from '@astryxdesign/core/Badge';
import {Heading} from '@astryxdesign/core/Heading';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  labelRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    flexShrink: 0,
  },
});

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
    <Stack gap={3} maxWidth={320}>
      <Heading level={3}>Labels</Heading>
      <TextInput
        label="Filter labels"
        isLabelHidden
        value={search}
        onChange={setSearch}
        placeholder="Filter labels"
        hasClear
      />
      <Stack gap={1}>
        {filtered.map(label => (
          <CheckboxInput
            key={label.name}
            label={label.name}
            value={selected.has(label.name)}
            onChange={() => toggle(label.name)}
            labelIcon={() => (
              <div {...stylex.props(styles.dot)} style={{backgroundColor: label.color}} />
            )}
          />
        ))}
      </Stack>
      {selected.size > 0 && (
        <Stack direction="horizontal" gap={1} wrap="wrap">
          {[...selected].map(name => {
            const label = LABELS.find(l => l.name === name)!;
            return <Badge key={name} variant={label.variant} label={name} />;
          })}
        </Stack>
      )}
    </Stack>
  );
}
