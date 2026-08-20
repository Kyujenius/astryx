import {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';

const MAX_DESCRIPTION = 500;

export default function SupportTicketForm() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  const charCount = description.length;
  const isOverLimit = charCount > MAX_DESCRIPTION;

  return (
    <form className="space-y-4 max-w-lg p-4" onSubmit={(e) => { e.preventDefault(); console.log({subject, description, priority}); }}>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject *</Label>
        <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Brief summary of the issue" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="desc">Description *</Label>
        <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the issue in detail..." rows={5} required className={isOverLimit ? 'border-destructive' : ''} />
        <p className={`text-xs text-right ${isOverLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
          {charCount}/{MAX_DESCRIPTION}
        </p>
      </div>
      <div className="space-y-2">
        <Label>Priority</Label>
        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={!subject.trim() || !description.trim() || isOverLimit}>Submit Ticket</Button>
      </div>
    </form>
  );
}
