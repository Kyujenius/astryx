import {useState} from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';

export default function FeedbackDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setTitle('');
    setComments('');
    setSubmitted(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Give Feedback</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{submitted ? 'Thank You!' : 'Submit Feedback'}</DialogTitle>
        </DialogHeader>
        {submitted ? (
          <div className="flex flex-col gap-3">
            <p>Your feedback has been submitted successfully.</p>
            <Button onClick={handleReset}>Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="comments">Comments</Label>
              <Textarea id="comments" value={comments} onChange={e => setComments(e.target.value)} rows={5} required />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
