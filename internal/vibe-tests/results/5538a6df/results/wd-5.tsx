// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';

export default function FeedbackDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [comments, setComments] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTitle('');
    setComments('');
  };

  const handleClose = (open: boolean) => {
    setIsOpen(open);
    if (!open) {setIsSubmitted(false);}
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Give Feedback</Button>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent>
          {isSubmitted ? (
            <div className="flex flex-col gap-4 py-4">
              <DialogHeader>
                <DialogTitle>Thank you!</DialogTitle>
              </DialogHeader>
              <p className="text-muted-foreground">Your feedback has been submitted successfully.</p>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <DialogHeader>
                <DialogTitle>Submit Feedback</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Title *</Label>
                <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Brief summary..." />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="comments">Comments</Label>
                <Textarea id="comments" value={comments} onChange={e => setComments(e.target.value)} placeholder="Tell us more..." rows={5} />
              </div>
              <Button onClick={handleSubmit} disabled={title === '' || comments === ''}>Submit</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
