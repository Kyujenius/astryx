import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {useState} from 'react';

const MAX_CHARS = 500;

export default function SupportTicketForm() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');

  const isValid = subject.trim() && description.trim() && priority;
  const remaining = MAX_CHARS - description.length;

  return (
    <div className="max-w-lg p-6 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="subject">Subject *</Label>
        <Input id="subject" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Brief summary" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="desc">Description *</Label>
        <Textarea id="desc" value={description} onChange={e => { if (e.target.value.length <= MAX_CHARS) setDescription(e.target.value); }} placeholder="Describe the issue" />
        <p className="text-xs text-muted-foreground">{remaining} characters remaining</p>
      </div>
      <div className="space-y-2">
        <Label>Priority *</Label>
        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button disabled={!isValid}>Submit Ticket</Button>
    </div>
  );
}
