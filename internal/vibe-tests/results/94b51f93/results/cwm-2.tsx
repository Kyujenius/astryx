// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

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
    <div style={{width: 280, border: '1px solid #e5e5e5', borderRadius: 8, padding: 12, fontFamily: 'system-ui'}}>
      <h3 style={{fontSize: 14, fontWeight: 600, marginBottom: 8}}>Labels</h3>
      <input
        placeholder="Filter labels"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{width: '100%', padding: '6px 10px', border: '1px solid #ccc', borderRadius: 4, marginBottom: 8}}
      />
      <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
        {filtered.map((label) => (
          <label key={label.id} style={{display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14}}>
            <input type="checkbox" checked={selected.includes(label.id)} onChange={() => toggle(label.id)} />
            <span style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: label.color, display: 'inline-block'}} />
            {label.name}
          </label>
        ))}
      </div>
      {selected.length > 0 && (
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8, paddingTop: 8, borderTop: '1px solid #e5e5e5'}}>
          {selected.map((id) => {
            const label = allLabels.find((l) => l.id === id);
            return label ? <span key={id} style={{fontSize: 12, padding: '2px 8px', borderRadius: 10, backgroundColor: '#f0f0f0'}}>{label.name}</span> : null;
          })}
        </div>
      )}
    </div>
  );
}
