import {useState} from 'react';
import {ComplexSelector} from '@astryxdesign/core/ComplexSelector';
import {DateInput} from '@astryxdesign/core/DateInput';
import {TimeInput} from '@astryxdesign/core/TimeInput';
import {Button} from '@astryxdesign/core/Button';
import {Stack} from '@astryxdesign/core/Stack';
import {HStack} from '@astryxdesign/core/HStack';
import {SegmentedControl, SegmentedControlItem} from '@astryxdesign/core/SegmentedControl';

type DeadlinePreset = 'today' | 'tomorrow' | 'next-week' | 'custom';

function getPresetDate(preset: DeadlinePreset): string {
  const now = new Date();
  switch (preset) {
    case 'today':
      return now.toISOString().split('T')[0];
    case 'tomorrow': {
      const d = new Date(now);
      d.setDate(d.getDate() + 1);
      return d.toISOString().split('T')[0];
    }
    case 'next-week': {
      const d = new Date(now);
      d.setDate(d.getDate() + 7);
      return d.toISOString().split('T')[0];
    }
    default:
      return '';
  }
}

export default function DeadlinePicker() {
  const [deadline, setDeadline] = useState<string>('');
  const [mode, setMode] = useState<DeadlinePreset>('today');
  const [customDate, setCustomDate] = useState<string | undefined>(undefined);
  const [customTime, setCustomTime] = useState<string | undefined>(undefined);

  const displayLabel = deadline
    ? `Due: ${deadline}`
    : undefined;

  return (
    <ComplexSelector
      label="Deadline"
      value={deadline}
      onChange={setDeadline}
      triggerLabel={displayLabel}
      placeholder="Set a deadline"
    >
      {(value, onChange, close) => (
        <Stack gap={3} padding={3}>
          <SegmentedControl
            label="Deadline preset"
            value={mode}
            onChange={(v) => setMode(v as DeadlinePreset)}
          >
            <SegmentedControlItem value="today" label="Today" />
            <SegmentedControlItem value="tomorrow" label="Tomorrow" />
            <SegmentedControlItem value="next-week" label="Next week" />
            <SegmentedControlItem value="custom" label="Custom" />
          </SegmentedControl>

          {mode === 'custom' ? (
            <Stack gap={2}>
              <DateInput
                label="Date"
                value={customDate}
                onChange={setCustomDate}
              />
              <TimeInput
                label="Time"
                value={customTime}
                onChange={setCustomTime}
              />
            </Stack>
          ) : null}

          <HStack gap={2} hAlign="end">
            <Button
              label="Cancel"
              variant="ghost"
              onClick={() => close()}
            />
            <Button
              label="Apply"
              variant="primary"
              onClick={() => {
                if (mode === 'custom') {
                  const dateStr = customDate || new Date().toISOString().split('T')[0];
                  const timeStr = customTime || '09:00';
                  onChange(`${dateStr} ${timeStr}`);
                } else {
                  onChange(getPresetDate(mode));
                }
                close();
              }}
            />
          </HStack>
        </Stack>
      )}
    </ComplexSelector>
  );
}
