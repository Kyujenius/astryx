import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {useState} from 'react';

const LABELS = [
  {name: 'bug', color: '#d73a4a', description: "Something isn't working"},
  {name: 'enhancement', color: '#a2eeef', description: 'New feature or request'},
  {name: 'documentation', color: '#0075ca', description: 'Docs improvements'},
  {name: 'good first issue', color: '#7057ff', description: 'Good for newcomers'},
  {name: 'help wanted', color: '#008672', description: 'Extra attention needed'},
];

export default function IssueLabelPicker() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const filtered = LABELS.filter(l => l.name.toLowerCase().includes(search.toLowerCase()));
  const toggleLabel = (name: string) => setSelected(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]);

  return (
    <Card>
      <Stack gap="md">
        <TextInput label="Filter labels" isLabelHidden placeholder="Filter labels" value={search} onChange={setSearch} />
        <Stack gap="xs">
          {filtered.map(label => (
            <Stack key={label.name} direction="horizontal" gap="sm" align="center">
              <CheckboxInput label={label.name} isSelected={selected.includes(label.name)} onChange={() => toggleLabel(label.name)} />
              <span style={{width: 14, height: 14, borderRadius: '50%', backgroundColor: label.color, display: 'inline-block'}} />
              <Text size="sm" color="secondary">{label.description}</Text>
            </Stack>
          ))}
        </Stack>
        <Button variant="default" onPress={() => setSelected([])}>Clear selection</Button>
      </Stack>
    </Card>
  );
}
