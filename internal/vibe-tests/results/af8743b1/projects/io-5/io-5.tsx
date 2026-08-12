import {useState} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {Selector} from '@astryxdesign/core/Selector';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';

export default function SupportTicketForm() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = () => {
    console.log({subject, description, priority});
  };

  return (
    <div>
      <Heading level={2}>Submit a Support Ticket</Heading>
      <TextInput
        label="Subject"
        value={subject}
        onChange={setSubject}
        placeholder="Brief summary of your issue"
        isRequired
      />
      <TextArea
        label="Description"
        value={description}
        onChange={setDescription}
        placeholder="Describe your issue in detail"
        maxLength={500}
        rows={5}
        isRequired
      />
      <Selector
        label="Priority"
        options={['Low', 'Medium', 'High', 'Critical']}
        value={priority}
        onChange={setPriority}
        placeholder="Select priority level"
        isRequired
      />
      <Button
        label="Submit Ticket"
        variant="primary"
        onClick={handleSubmit}
        isDisabled={!subject || !description || !priority}
      />
    </div>
  );
}
