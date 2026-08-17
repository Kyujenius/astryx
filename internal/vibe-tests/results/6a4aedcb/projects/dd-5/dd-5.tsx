import {useState} from 'react';
import {Table} from '@astryxdesign/core/Table';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Button} from '@astryxdesign/core/Button';

interface Email {
  id: string;
  sender: string;
  subject: string;
  date: string;
  preview: string;
  [key: string]: unknown;
}

const emails: Email[] = [
  {id: '1', sender: 'Alice Johnson', subject: 'Q3 Report Ready', date: '2026-08-17', preview: 'Hi team, the Q3 report is now available...'},
  {id: '2', sender: 'Bob Smith', subject: 'Meeting Tomorrow', date: '2026-08-16', preview: 'Just a reminder about our sync at 10am...'},
  {id: '3', sender: 'Carol White', subject: 'Design Review', date: '2026-08-16', preview: 'Attached are the latest mockups...'},
  {id: '4', sender: 'Dave Brown', subject: 'Bug Fix Deployed', date: '2026-08-15', preview: 'The fix for issue #142 has been deployed...'},
  {id: '5', sender: 'Eva Green', subject: 'Welcome aboard!', date: '2026-08-14', preview: 'We are excited to have you join...'},
];

export default function EmailInbox() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-3">
      {selected.size > 0 && (
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
          <span className="text-sm font-medium">{selected.size} selected</span>
          <Button size="sm" variant="ghost">Archive</Button>
          <Button size="sm" variant="ghost">Delete</Button>
          <Button size="sm" variant="ghost">Mark as Read</Button>
        </div>
      )}
      <Table
        data={emails}
        idKey="id"
        hasHover
        columns={[
          {
            key: 'select',
            header: '',
            renderCell: (row) => (
              <CheckboxInput
                label={`Select email from ${(row as Email).sender}`}
                isLabelHidden
                isSelected={selected.has((row as Email).id)}
                onChange={() => toggleSelect((row as Email).id)}
              />
            ),
          },
          {key: 'sender', header: 'From'},
          {key: 'subject', header: 'Subject'},
          {key: 'date', header: 'Date'},
          {key: 'preview', header: 'Preview'},
        ]}
      />
    </div>
  );
}
