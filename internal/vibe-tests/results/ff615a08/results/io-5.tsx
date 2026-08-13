import {useState} from 'react';
import {Input} from '../components/ui/input';
import {Textarea} from '../components/ui/textarea';
import {Button} from '../components/ui/button';
import {Label} from '../components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '../components/ui/select';

export default function SupportTicketForm() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');

  return (
    <div className="max-w-md mx-auto space-y-5 p-6">
      <h2 className="text-2xl font-bold">Submit a Support Ticket</h2>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject *</Label>
        <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Brief summary" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="desc">Description *</Label>
        <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe your issue" rows={5} maxLength={500} />
        <p className="text-xs text-muted-foreground text-right">{description.length}/500</p>
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
      <Button disabled={!subject || !description || !priority} onClick={() => console.log({subject, description, priority})}>
        Submit Ticket
      </Button>
    </div>
  );
}
