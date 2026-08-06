import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui/table';
import {Checkbox} from '@/components/ui/checkbox';
import {Button} from '@/components/ui/button';
import {useState} from 'react';

const emails = [
  {id: '1', sender: 'Alice Smith', subject: 'Q4 Planning', date: '2024-03-15', preview: 'Hi team, let us discuss...'},
  {id: '2', sender: 'Bob Johnson', subject: 'Deploy v2.1', date: '2024-03-14', preview: 'Deployment scheduled...'},
  {id: '3', sender: 'Carol Lee', subject: 'Design Review', date: '2024-03-13', preview: 'Review mockups...'},
];

export default function EmailInbox() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const toggle = (id: string) => setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  return (
    <div className="space-y-2">
      {selected.size > 0 && <div className="flex gap-2 items-center p-2 bg-muted rounded"><span className="text-sm">{selected.size} selected</span><Button size="sm" variant="outline">Archive</Button><Button size="sm" variant="destructive">Delete</Button></div>}
      <Table>
        <TableHeader><TableRow><TableHead className="w-8"></TableHead><TableHead>Sender</TableHead><TableHead>Subject</TableHead><TableHead>Date</TableHead><TableHead>Preview</TableHead></TableRow></TableHeader>
        <TableBody>{emails.map(e => <TableRow key={e.id}><TableCell><Checkbox checked={selected.has(e.id)} onCheckedChange={() => toggle(e.id)} /></TableCell><TableCell>{e.sender}</TableCell><TableCell>{e.subject}</TableCell><TableCell>{e.date}</TableCell><TableCell className="text-muted-foreground">{e.preview}</TableCell></TableRow>)}</TableBody>
      </Table>
    </div>
  );
}