import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

export default function SupportTicketForm() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col gap-4 p-6">
        <h2 className="text-2xl font-bold">Ticket Submitted</h2>
        <p>Your support ticket has been received.</p>
        <Button variant="secondary" onClick={() => { setSubmitted(false); setSubject(''); setDescription(''); setPriority(''); }}>Submit Another</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-6 max-w-xl">
      <h2 className="text-2xl font-bold">Submit a Support Ticket</h2>
      <div className="flex flex-col gap-2">
        <Label htmlFor="subject">Subject *</Label>
        <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Brief description of your issue" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="desc">Description *</Label>
        <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Provide as much detail as possible..." rows={6} maxLength={2000} />
        <span className="text-xs text-muted-foreground text-right">{description.length}/2000</span>
      </div>
      <div className="flex flex-col gap-2">
        <Label>Priority *</Label>
        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger><SelectValue placeholder="Select priority level" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end">
        <Button onClick={() => setSubmitted(true)} disabled={!subject || !description || !priority}>Submit Ticket</Button>
      </div>
    </div>
  );
}
