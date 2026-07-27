import {TextInput} from '@astryxdesign/core/TextInput';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Button} from '@astryxdesign/core/Button';
import {Text} from '@astryxdesign/core/Text';
import {useState} from 'react';

const LABELS = [{name: 'bug', color: '#d73a4a', description: "Something isn't working"},{name: 'enhancement', color: '#a2eeef', description: 'New feature'},{name: 'documentation', color: '#0075ca', description: 'Docs'},{name: 'good first issue', color: '#7057ff', description: 'Newcomers'},{name: 'help wanted', color: '#008672', description: 'Attention needed'}];

export default function IssueLabelPicker() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const filtered = LABELS.filter(l => l.name.toLowerCase().includes(search.toLowerCase()));
  const toggle = (name: string) => setSelected(p => p.includes(name) ? p.filter(n => n !== name) : [...p, name]);
  return (
    <div className="w-80 bg-white border border-gray-200 rounded-lg shadow-sm p-3">
      <TextInput label="Filter labels" isLabelHidden placeholder="Filter labels" value={search} onChange={setSearch} />
      <div className="mt-3 divide-y divide-gray-100">{filtered.map(label => (<div key={label.name} className="flex items-center gap-2 py-2"><CheckboxInput label={label.name} isSelected={selected.includes(label.name)} onChange={() => toggle(label.name)} /><span className="w-3 h-3 rounded-full flex-shrink-0" style={{backgroundColor: label.color}} /><Text size="sm" color="secondary">{label.description}</Text></div>))}</div>
      {selected.length > 0 && <div className="mt-3 pt-3 border-t"><Button variant="ghost" size="sm" onPress={() => setSelected([])}>Clear all</Button></div>}
    </div>
  );
}
