import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Text} from '@astryxdesign/core/Text';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {useState} from 'react';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  dot: {
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  labelRow: {
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'var(--surface-hover)',
    },
  },
});

type Label = {
  name: string;
  color: string;
  description: string;
};

const availableLabels: Label[] = [
  {name: 'bug', color: '#d73a4a', description: 'Something is broken'},
  {name: 'enhancement', color: '#a2eeef', description: 'New feature request'},
  {name: 'documentation', color: '#0075ca', description: 'Docs improvements'},
  {name: 'good first issue', color: '#7057ff', description: 'Good for newcomers'},
  {name: 'help wanted', color: '#008672', description: 'Extra attention needed'},
  {name: 'duplicate', color: '#cfd3d7', description: 'Already exists'},
  {name: 'wontfix', color: '#ffffff', description: 'Will not be addressed'},
];

export default function LabelPicker() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set(['bug']));
  const [isOpen, setIsOpen] = useState(false);

  const filtered = availableLabels.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleLabel = (name: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <VStack gap="sm">
      <Button variant="outlined" onPress={() => setIsOpen(!isOpen)}>
        Labels ({selected.size})
      </Button>

      {isOpen && (
        <Card>
          <VStack gap="xs">
            <TextInput
              label="Filter labels"
              isLabelHidden
              placeholder="Filter labels"
              value={search}
              onChange={setSearch}
            />
            {filtered.map(label => (
              <HStack key={label.name} style={styles.labelRow}>
                <CheckboxInput
                  label={label.name}
                  isChecked={selected.has(label.name)}
                  onChange={() => toggleLabel(label.name)}
                />
                <div {...stylex.props(styles.dot)} style={{backgroundColor: label.color}} />
                <Text size="sm" color="secondary">{label.description}</Text>
              </HStack>
            ))}
          </VStack>
        </Card>
      )}
    </VStack>
  );
}
