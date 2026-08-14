import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';
import {useState} from 'react';

export default function FeedbackForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => setSubmitted(true);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Leave Feedback</Button>
      </DialogTrigger>
      <DialogContent>
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="rounded-full bg-green-100 p-3">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-medium">Thank you!</p>
            <p className="text-sm text-muted-foreground">Your feedback has been submitted.</p>
            <Button onClick={() => { setSubmitted(false); setIsOpen(false); }}>Close</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Feedback</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Brief summary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="comments">Comments</Label>
                <Textarea id="comments" value={comments} onChange={(e) => setComments(e.target.value)} placeholder="Share your thoughts..." rows={5} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit} disabled={!title || !comments}>Submit</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
