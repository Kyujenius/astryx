import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {Selector} from '@astryxdesign/core/Selector';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {Text} from '@astryxdesign/core/Text';
import {useState} from 'react';

const priorityOptions = [
  {value: 'low', label: 'Low'},
  {value: 'medium', label: 'Medium'},
  {value: 'high', label: 'High'},
  {value: 'critical', label: 'Critical'},
];

const MAX_CHARS = 500;

export default function SupportTicketForm() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const remaining = MAX_CHARS - description.length;
  const isValid = subject.trim().length > 0 && description.trim().length > 0 && priority !== '';

  if (submitted) {
    return (
      <VStack gap="md">
        <Text>Ticket submitted. We will respond within 24 hours.</Text>
      </VStack>
    );
  }

  return (
    <VStack gap="md">
      <TextInput
        label="Subject"
        value={subject}
        onChange={setSubject}
        placeholder="Brief summary of the issue"
        isRequired
      />
      <TextArea
        label="Description"
        value={description}
        onChange={(val) => {
          if (val.length <= MAX_CHARS) setDescription(val);
        }}
        placeholder="Describe the issue in detail"
        isRequired
        description={`${remaining} characters remaining`}
      />
      <Selector
        label="Priority"
        options={priorityOptions}
        value={priority}
        onChange={setPriority}
        placeholder="Select priority"
        isRequired
      />
      <Button onPress={() => setSubmitted(true)} isDisabled={!isValid}>
        Submit Ticket
      </Button>
    </VStack>
  );
}
