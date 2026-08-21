import {useState} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {Selector} from '@astryxdesign/core/Selector';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Card} from '@astryxdesign/core/Card';

export default function SupportTicketForm() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await fetch('/api/tickets', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({subject, description, priority}),
    });
    setIsSubmitting(false);
  };

  return (
    <Card padding={4} maxWidth={600}>
      <VStack gap={4}>
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
          rows={5}
          maxLength={500}
          isRequired
          placeholder="Describe your issue in detail"
        />
        <Selector
          label="Priority"
          value={priority}
          onChange={setPriority}
          options={[
            {value: 'low', label: 'Low'},
            {value: 'medium', label: 'Medium'},
            {value: 'high', label: 'High'},
            {value: 'urgent', label: 'Urgent'},
          ]}
        />
        <Button
          label="Submit Ticket"
          variant="primary"
          onClick={handleSubmit}
          isLoading={isSubmitting}
        />
      </VStack>
    </Card>
  );
}
