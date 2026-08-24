import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {Selector} from '@astryxdesign/core/Selector';
import {Button} from '@astryxdesign/core/Button';
import {useState} from 'react';

const MAX_CHARS = 500;

export default function SupportTicketForm() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');

  const isValid = subject.trim() && description.trim() && priority;
  const remaining = MAX_CHARS - description.length;

  return (
    <div className="flex flex-col gap-4 max-w-lg p-6">
      <TextInput label="Subject" value={subject} onChange={setSubject} placeholder="Brief summary" isRequired />
      <TextArea
        label="Description"
        value={description}
        onChange={(v) => { if (v.length <= MAX_CHARS) setDescription(v); }}
        placeholder="Describe the issue"
        isRequired
        description={`${remaining} characters remaining`}
      />
      <Selector
        label="Priority"
        options={[
          {value: 'low', label: 'Low'},
          {value: 'medium', label: 'Medium'},
          {value: 'high', label: 'High'},
          {value: 'critical', label: 'Critical'},
        ]}
        value={priority}
        onChange={setPriority}
        isRequired
      />
      <Button onPress={() => {}} isDisabled={!isValid}>Submit Ticket</Button>
    </div>
  );
}
