import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {Selector} from '@astryxdesign/core/Selector';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {useState} from 'react';

export default function SupportTicketForm() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');

  const isValid = subject.trim().length > 0 && description.trim().length > 0 && priority !== '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Ticket submitted: ${subject}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack gap={4} padding={4} maxWidth={500}>
        <Heading level={2}>Submit a Support Ticket</Heading>
        <TextInput
          label="Subject"
          value={subject}
          onChange={setSubject}
          isRequired
          placeholder="Brief description of the issue"
        />
        <TextArea
          label="Description"
          value={description}
          onChange={setDescription}
          isRequired
          placeholder="Describe your issue in detail..."
          rows={5}
          maxLength={500}
        />
        <Selector
          label="Priority"
          options={[
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
            { value: 'critical', label: 'Critical' },
          ]}
          value={priority}
          onChange={setPriority}
          placeholder="Select priority..."
        />
        <Button label="Submit Ticket" variant="primary" type="submit" isDisabled={!isValid} />
      </VStack>
    </form>
  );
}
