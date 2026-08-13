import {useState} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {Selector} from '@astryxdesign/core/Selector';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';

const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];

export default function SupportTicketForm() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex flex-col gap-4">
        <Heading level={2}>Submit a Support Ticket</Heading>
        <TextInput
          label="Subject"
          value={subject}
          onChange={setSubject}
          placeholder="Brief description of your issue"
          isRequired
        />
        <TextArea
          label="Description"
          value={description}
          onChange={setDescription}
          placeholder="Provide details about the issue"
          rows={5}
          isRequired
        />
        <Selector
          label="Priority"
          options={PRIORITIES}
          value={priority}
          onChange={setPriority}
        />
        <Button label="Submit ticket" variant="primary" type="submit" />
      </div>
    </form>
  );
}
