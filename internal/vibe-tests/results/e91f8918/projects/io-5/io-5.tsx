import React, {useState} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {Selector} from '@astryxdesign/core/Selector';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';

export default function SupportTicketForm() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');

  const priorityOptions = [
    {value: 'low', label: 'Low'},
    {value: 'medium', label: 'Medium'},
    {value: 'high', label: 'High'},
    {value: 'urgent', label: 'Urgent'},
  ];

  return (
    <Card padding={4} maxWidth={560}>
      <VStack gap={4}>
        <Heading level={2}>Submit a Support Ticket</Heading>
        <TextInput
          label="Subject"
          value={subject}
          onChange={setSubject}
          placeholder="Brief description of the issue"
          isRequired
        />
        <TextArea
          label="Description"
          value={description}
          onChange={setDescription}
          placeholder="Describe your issue in detail"
          rows={5}
          maxLength={2000}
          isRequired
        />
        <Selector
          label="Priority"
          options={priorityOptions}
          value={priority}
          onChange={setPriority}
        />
        <HStack gap={2} hAlign="end">
          <Button label="Cancel" variant="ghost" onClick={() => {}} />
          <Button label="Submit Ticket" variant="primary" onClick={() => {}} />
        </HStack>
      </VStack>
    </Card>
  );
}
