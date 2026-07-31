import {useState} from 'react';
import {Dialog} from '@astryxdesign/core/Dialog';
import {DialogHeader} from '@astryxdesign/core/DialogHeader';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {Button} from '@astryxdesign/core/Button';

export default function FeedbackForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    setIsOpen(false);
    setTitle('');
    setDescription('');
  };

  return (
    <>
      <Button label="Give Feedback" variant="primary" onClick={() => setIsOpen(true)} />
      <Dialog isOpen={isOpen} onOpenChange={setIsOpen} purpose="form">
        <DialogHeader title="Send Feedback" />
        <div className="flex flex-col gap-4 p-6">
          <TextInput
            label="Title"
            value={title}
            onChange={setTitle}
            placeholder="Brief summary"
            isRequired
          />
          <TextArea
            label="Description"
            value={description}
            onChange={setDescription}
            placeholder="Tell us more about your experience..."
            rows={5}
          />
          <div className="flex gap-2 justify-end">
            <Button label="Cancel" variant="ghost" onClick={() => setIsOpen(false)} />
            <Button label="Submit" variant="primary" onClick={handleSubmit} />
          </div>
        </div>
      </Dialog>
    </>
  );
}
