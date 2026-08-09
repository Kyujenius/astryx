// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Dialog} from '@astryxdesign/core/Dialog';
import {DialogHeader} from '@astryxdesign/core/Dialog';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {Button} from '@astryxdesign/core/Button';
import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';

export default function FeedbackForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTitle('');
    setComments('');
  };

  return (
    <Stack gap={3} padding={4}>
      <Button label="Give Feedback" variant="primary" onClick={() => { setIsOpen(true); setSubmitted(false); }} />
      <Dialog isOpen={isOpen} onOpenChange={setIsOpen} width={500}>
        <Stack gap={4} padding={4}>
          {submitted ? (
            <Stack gap={2} vAlign="center">
              <Heading level={3}>Thank you!</Heading>
              <Text>Your feedback has been submitted.</Text>
              <Button label="Close" variant="secondary" onClick={() => setIsOpen(false)} />
            </Stack>
          ) : (
            <>
              <Heading level={3}>Submit Feedback</Heading>
              <TextInput label="Title" value={title} onChange={setTitle} placeholder="Brief summary" />
              <TextArea label="Comments" value={comments} onChange={setComments} placeholder="Tell us more..." />
              <Stack direction="horizontal" gap={2} hAlign="end">
                <Button label="Cancel" variant="ghost" onClick={() => setIsOpen(false)} />
                <Button label="Submit" variant="primary" onClick={handleSubmit} isDisabled={!title || !comments} />
              </Stack>
            </>
          )}
        </Stack>
      </Dialog>
    </Stack>
  );
}
