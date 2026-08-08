// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

type Label = {name: string; color: string};

const LABELS: Label[] = [
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
    <div style={{width: '320px', display: 'flex', flexDirection: 'column', gap: '12px'}}>
      <h3 style={{margin: 0, fontSize: '18px', fontWeight: 600}}>Labels</h3>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Filter labels"
        style={{padding: '8px', borderRadius: '4px', border: '1px solid #ccc'}}
      />
      <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
        {filtered.map(label => (
          <label key={label.name} style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '4px 0'}}>
            <span style={{width: '12px', height: '12px', borderRadius: '50%', backgroundColor: label.color, border: '1px solid #ddd', flexShrink: 0}} />
            <input
              type="checkbox"
              checked={selected.has(label.name)}
              onChange={() => toggle(label.name)}
            />
            {label.name}
          </label>
        ))}
      </div>
      {selected.size > 0 && (
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '4px'}}>
          {[...selected].map(name => {
            const label = LABELS.find(l => l.name === name)!;
            return (
              <span key={name} style={{display: 'inline-block', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', backgroundColor: label.color, border: '1px solid #ddd'}}>
                {name}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
