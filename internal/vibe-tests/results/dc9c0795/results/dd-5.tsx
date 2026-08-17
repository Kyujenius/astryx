import {useState} from 'react';
import {Checkbox} from '@/components/ui/checkbox';
import {Button} from '@/components/ui/button';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';

interface Email {
  id: string;
  sender: string;
  subject: string;
  date: string;
  preview: string;
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

  const toggleAll = () => {
    if (selected.size === emails.length) setSelected(new Set());
    else setSelected(new Set(emails.map(e => e.id)));
  };

  return (
    <div className="space-y-3">
      {selected.size > 0 && (
        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
          <span className="text-sm font-medium">{selected.size} selected</span>
          <Button size="sm" variant="ghost">Archive</Button>
          <Button size="sm" variant="ghost">Delete</Button>
          <Button size="sm" variant="ghost">Mark as Read</Button>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox checked={selected.size === emails.length} onCheckedChange={toggleAll} aria-label="Select all" />
            </TableHead>
            <TableHead>From</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Preview</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {emails.map(email => (
            <TableRow key={email.id}>
              <TableCell>
                <Checkbox
                  checked={selected.has(email.id)}
                  onCheckedChange={() => toggleSelect(email.id)}
                  aria-label={`Select email from ${email.sender}`}
                />
              </TableCell>
              <TableCell className="font-medium">{email.sender}</TableCell>
              <TableCell>{email.subject}</TableCell>
              <TableCell>{email.date}</TableCell>
              <TableCell className="text-muted-foreground truncate max-w-[200px]">{email.preview}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
