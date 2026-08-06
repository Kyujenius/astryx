import {Table, proportional, pixel} from '@astryxdesign/core/Table';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Button} from '@astryxdesign/core/Button';
import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {useState} from 'react';

interface Email { id: string; sender: string; subject: string; date: string; preview: string; [key: string]: unknown; }

const emails: Email[] = [
  {id: '1', sender: 'Alice Smith', subject: 'Q4 Planning', date: '2024-03-15', preview: 'Hi team, let us discuss the roadmap...'},
  {id: '2', sender: 'Bob Johnson', subject: 'Deploy v2.1', date: '2024-03-14', preview: 'The deployment is scheduled for Friday...'},
  {id: '3', sender: 'Carol Lee', subject: 'Design Review', date: '2024-03-13', preview: 'Please review the attached mockups...'},
  {id: '4', sender: 'Dave Wilson', subject: 'Bug Report', date: '2024-03-12', preview: 'Found an issue with the login flow...'},
  {id: '5', sender: 'Eve Chen', subject: 'Team Lunch', date: '2024-03-11', preview: 'Anyone up for lunch on Thursday?'},
];

export default function EmailInbox() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const toggle = (id: string) => setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleAll = () => setSelected(prev => prev.size === emails.length ? new Set() : new Set(emails.map(e => e.id)));

  const columns = [
    {key: 'select' as const, header: '', width: pixel(48), renderCell: (row: Email) => <CheckboxInput label={`Select ${row.sender}`} isLabelHidden isChecked={selected.has(row.id)} onChange={() => toggle(row.id)} />},
    {key: 'sender' as const, header: 'Sender', width: proportional(1)},
    {key: 'subject' as const, header: 'Subject', width: proportional(2)},
    {key: 'date' as const, header: 'Date', width: pixel(120)},
    {key: 'preview' as const, header: 'Preview', width: proportional(2)},
  ];

  return (
    <Stack gap={2}>
      {selected.size > 0 && (
        <Stack direction="row" gap={2} align="center">
          <Text variant="bodySm">{selected.size} selected</Text>
          <Button label="Archive" size="sm" variant="secondary" onClick={() => setSelected(new Set())} />
          <Button label="Delete" size="sm" variant="destructive" onClick={() => setSelected(new Set())} />
        </Stack>
      )}
      <CheckboxInput label="Select all" isLabelHidden isChecked={selected.size === emails.length} isIndeterminate={selected.size > 0 && selected.size < emails.length} onChange={toggleAll} />
      <Table data={emails} columns={columns} idKey="id" hasHover density="compact" />
    </Stack>
  );
}