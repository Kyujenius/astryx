import {Dialog} from '@astryxdesign/core/Dialog';
import {DialogHeader} from '@astryxdesign/core/Dialog';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {Layout, LayoutContent, LayoutFooter} from '@astryxdesign/core/Layout';
import {useState} from 'react';

export default function FeedbackForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [comments, setComments] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => setIsSubmitted(true);

  return (
    <div className="p-6">
      <Button onPress={() => setIsOpen(true)}>Give Feedback</Button>
      <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
        <Layout>
          <DialogHeader title="Feedback" onOpenChange={setIsOpen} />
          <LayoutContent>
            {isSubmitted ? (
              <div className="flex flex-col items-center gap-3 py-6">
                <div className="text-green-600 text-4xl">✓</div>
                <p className="text-lg font-medium">Thank you for your feedback!</p>
                <Button onPress={() => { setIsSubmitted(false); setIsOpen(false); }}>
                  Close
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <TextInput
                  label="Title"
                  value={title}
                  onChange={setTitle}
                  placeholder="Summarize your feedback"
                />
                <TextArea
                  label="Comments"
                  value={comments}
                  onChange={setComments}
                  placeholder="Share your thoughts in detail..."
                  rows={5}
                />
              </div>
            )}
          </LayoutContent>
          {!isSubmitted && (
            <LayoutFooter>
              <Button variant="secondary" onPress={() => setIsOpen(false)}>Cancel</Button>
              <Button onPress={handleSubmit} isDisabled={!title || !comments}>Submit</Button>
            </LayoutFooter>
          )}
        </Layout>
      </Dialog>
    </div>
  );
}
