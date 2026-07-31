import {useState} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {Selector} from '@astryxdesign/core/Selector';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

export default function SupportTicketForm() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <VStack gap={3} padding={4}>
        <Heading level={2}>Ticket Submitted</Heading>
        <Text>Your support ticket has been received. We will get back to you shortly.</Text>
        <Button label="Submit Another" variant="secondary" onClick={() => {
          setSubmitted(false);
          setSubject('');
          setDescription('');
          setPriority('');
        }} />
      </VStack>
    );
  }

  return (
    <VStack gap={4} padding={4} maxWidth={600}>
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
        placeholder="Provide as much detail as possible..."
        rows={6}
        maxLength={2000}
        isRequired
      />
      <Selector
        label="Priority"
        value={priority}
        onChange={setPriority}
        options={[
          {value: 'low', label: 'Low'},
          {value: 'medium', label: 'Medium'},
          {value: 'high', label: 'High'},
          {value: 'critical', label: 'Critical'},
        ]}
        placeholder="Select priority level"
        isRequired
      />
      <HStack hAlign="end">
        <Button
          label="Submit Ticket"
          variant="primary"
          onClick={handleSubmit}
          isDisabled={!subject || !description || !priority}
        />
      </HStack>
    </VStack>
  );
}
