import {useState} from 'react';
import {DateInput} from '@astryxdesign/core/DateInput';
import {TimeInput} from '@astryxdesign/core/TimeInput';
import {Selector} from '@astryxdesign/core/Selector';
import {Button} from '@astryxdesign/core/Button';
import {Text} from '@astryxdesign/core/Text';

type PresetKey = 'today' | 'tomorrow' | 'next-week' | 'custom';

function getPresetDate(key: PresetKey): string | undefined {
  const now = new Date();
  switch (key) {
    case 'today': return now.toISOString().slice(0, 10);
    case 'tomorrow': {
      const d = new Date(now);
      d.setDate(d.getDate() + 1);
      return d.toISOString().slice(0, 10);
    }
    case 'next-week': {
      const d = new Date(now);
      d.setDate(d.getDate() + 7);
      return d.toISOString().slice(0, 10);
    }
    default: return undefined;
  }
}

export default function DeadlinePicker() {
  const [preset, setPreset] = useState<PresetKey | ''>('');
  const [date, setDate] = useState<string | undefined>();
  const [time, setTime] = useState<string | undefined>();
  const [confirmed, setConfirmed] = useState(false);

  const handlePresetChange = (value: string) => {
    const key = value as PresetKey;
    setPreset(key);
    if (key !== 'custom') {
      setDate(getPresetDate(key));
      setTime('17:00');
    }
    setConfirmed(false);
  };

  return (
    <div className="flex flex-col gap-4 p-6 max-w-sm rounded-lg border border-gray-200 bg-white shadow-sm">
      <Text type="label" display="block">Deadline</Text>
      <Selector
        label="Deadline preset"
        options={[
          {value: 'today', label: 'Today'},
          {value: 'tomorrow', label: 'Tomorrow'},
          {value: 'next-week', label: 'Next week'},
          {type: 'divider'},
          {value: 'custom', label: 'Custom date and time'},
        ]}
        value={preset}
        onChange={handlePresetChange}
        placeholder="Choose a deadline..."
      />
      {preset === 'custom' && (
        <div className="flex flex-col gap-3">
          <DateInput
            label="Date"
            value={date}
            onChange={(v) => { setDate(v); setConfirmed(false); }}
            min={new Date().toISOString().slice(0, 10)}
          />
          <TimeInput
            label="Time"
            value={time}
            onChange={(v) => { setTime(v); setConfirmed(false); }}
          />
        </div>
      )}
      {date && (
        <Button
          label={confirmed ? 'Applied' : 'Apply deadline'}
          variant={confirmed ? 'secondary' : 'primary'}
          isDisabled={confirmed}
          onClick={() => setConfirmed(true)}
        />
      )}
      {confirmed && (
        <Text type="supporting" color="secondary">
          Deadline set: {date}{time ? ` at ${time}` : ''}
        </Text>
      )}
    </div>
  );
}
