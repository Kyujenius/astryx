import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {useState} from 'react';

type Label = {name: string; color: string; description: string};

const labels: Label[] = [
  {name: 'bug', color: '#d73a4a', description: 'Something is broken'},
  {name: 'enhancement', color: '#a2eeef', description: 'New feature request'},
  {name: 'documentation', color: '#0075ca', description: 'Docs improvements'},
  {name: 'good first issue', color: '#7057ff', description: 'Good for newcomers'},
  {name: 'help wanted', color: '#008672', description: 'Extra attention needed'},
  {name: 'duplicate', color: '#cfd3d7', description: 'Already exists'},
];

export default function LabelPicker() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set(['bug']));
  const [open, setOpen] = useState(false);

  const filtered = labels.filter(l => l.name.toLowerCase().includes(search.toLowerCase()));

  const toggle = (name: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  return (
    <div className="max-w-xs space-y-2">
      <Button variant="outlined" onPress={() => setOpen(!open)}>
        Labels ({selected.size})
      </Button>
      {open && (
        <Card>
          <div className="space-y-2 p-3">
            <TextInput label="Filter" isLabelHidden placeholder="Filter labels" value={search} onChange={setSearch} />
            {filtered.map(label => (
              <div key={label.name} className="flex items-center gap-2 py-1 px-2 hover:bg-gray-50 rounded">
                <CheckboxInput label={label.name} isChecked={selected.has(label.name)} onChange={() => toggle(label.name)} />
                <span className="w-3 h-3 rounded-full flex-shrink-0" style={{backgroundColor: label.color}} />
                <span className="text-xs text-gray-500">{label.description}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
