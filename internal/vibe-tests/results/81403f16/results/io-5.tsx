import React, {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';

export default function SupportTicketForm() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  return (
    <Card className="w-full max-w-lg">
      <CardHeader><CardTitle>Submit a Support Ticket</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2"><Label>Subject *</Label><Input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Brief description" /></div>
        <div className="space-y-2"><Label>Description *</Label><Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe your issue" rows={5} maxLength={2000} /><p className="text-xs text-muted-foreground text-right">{description.length}/2000</p></div>
        <div className="space-y-2"><Label>Priority</Label><Select value={priority} onValueChange={setPriority}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="low">Low</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="high">High</SelectItem><SelectItem value="urgent">Urgent</SelectItem></SelectContent></Select></div>
        <div className="flex justify-end gap-2"><Button variant="ghost">Cancel</Button><Button>Submit Ticket</Button></div>
      </CardContent>
    </Card>
  );
}
