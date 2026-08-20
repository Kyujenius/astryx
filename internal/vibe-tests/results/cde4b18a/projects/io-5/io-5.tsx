import {useState} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {Selector} from '@astryxdesign/core/Selector';
import {Button} from '@astryxdesign/core/Button';
import {Stack} from '@astryxdesign/core/Stack';
import {HStack} from '@astryxdesign/core/HStack';
import {Text} from '@astryxdesign/core/Text';

const MAX_DESCRIPTION = 500;

const PRIORITY_OPTIONS = [
  {value: 'low', label: 'Low'},
  {value: 'medium', label: 'Medium'},
  {value: 'high', label: 'High'},
  {value: 'critical', label: 'Critical'},
];

export default function SupportTicketForm() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  const charCount = description.length;
  const isOverLimit = charCount > MAX_DESCRIPTION;

  const handleSubmit = () => {
    if (!subject.trim() || !description.trim() || isOverLimit) return;
    console.log({subject, description, priority});
  };

  return (
    <Stack gap={4} padding={4}>
      <TextInput
        label="Subject"
        value={subject}
        onChange={setSubject}
        placeholder="Brief summary of the issue"
        isRequired
      />
      <Stack gap={1}>
        <TextArea
          label="Description"
          value={description}
          onChange={(val) => setDescription(val.slice(0, MAX_DESCRIPTION + 50))}
          placeholder="Describe the issue in detail..."
          rows={5}
          isRequired
          status={isOverLimit ? {type: 'error', message: 'Description exceeds maximum length'} : undefined}
        />
        <HStack hAlign="end">
          <Text color={isOverLimit ? 'error' : undefined}>
            {charCount}/{MAX_DESCRIPTION}
          </Text>
        </HStack>
      </Stack>
      <Selector
        label="Priority"
        options={PRIORITY_OPTIONS}
        value={priority}
        onChange={setPriority}
      />
      <HStack hAlign="end">
        <Button
          label="Submit Ticket"
          variant="primary"
          onClick={handleSubmit}
          isDisabled={!subject.trim() || !description.trim() || isOverLimit}
        />
      </HStack>
    </Stack>
  );
}
