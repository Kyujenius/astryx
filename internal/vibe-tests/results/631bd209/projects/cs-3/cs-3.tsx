import {useState} from 'react';
import {DateTimeInput} from '@astryxdesign/core/DateTimeInput';
import {Button} from '@astryxdesign/core/Button';
import {Popover} from '@astryxdesign/core/Popover';
import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {HStack} from '@astryxdesign/core/HStack';

const PRESETS = [
  {label: 'Today', getValue: () => new Date().toISOString()},
  {label: 'Tomorrow', getValue: () => {const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString();}},
  {label: 'Next week', getValue: () => {const d = new Date(); d.setDate(d.getDate() + 7); return d.toISOString();}},
];

export default function DeadlinePicker() {
  const [deadline, setDeadline] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [tempValue, setTempValue] = useState<string | undefined>(undefined);

  const handlePreset = (getValue: () => string) => {
    setTempValue(getValue());
  };

  const handleApply = () => {
    setDeadline(tempValue);
    setIsOpen(false);
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      placement="below"
      content={
        <Stack gap="md">
          <Text>Quick presets</Text>
          <HStack gap="sm">
            {PRESETS.map((preset) => (
              <Button
                key={preset.label}
                variant="outlined"
                size="sm"
                onPress={() => handlePreset(preset.getValue)}
              >
                {preset.label}
              </Button>
            ))}
          </HStack>
          <DateTimeInput
            label="Custom date and time"
            value={tempValue}
            onChange={setTempValue}
            hasClear
          />
          <HStack gap="sm">
            <Button variant="filled" onPress={handleApply}>Apply</Button>
            <Button variant="outlined" onPress={() => setIsOpen(false)}>Cancel</Button>
          </HStack>
        </Stack>
      }
    >
      <Button variant="outlined">
        {deadline ? `Due: ${new Date(deadline).toLocaleDateString()}` : 'Set deadline'}
      </Button>
    </Popover>
  );
}
