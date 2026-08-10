// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Dialog} from '@astryxdesign/core/Dialog';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

export default function FeedbackDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [comments, setComments] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTitle('');
    setComments('');
  };

  const handleClose = (open: boolean) => {
    setIsOpen(open);
    if (!open) {setIsSubmitted(false);}
  };

  return (
    <>
      <Button label="Give Feedback" variant="primary" onClick={() => setIsOpen(true)} />
      <Dialog isOpen={isOpen} onOpenChange={handleClose} width={480}>
        {isSubmitted ? (
          <VStack gap={3} padding={4}>
            <Heading level={3}>Thank you!</Heading>
            <Text type="body">Your feedback has been submitted successfully.</Text>
            <Button label="Close" onClick={() => setIsOpen(false)} />
          </VStack>
        ) : (
          <VStack gap={3} padding={4}>
            <Heading level={3}>Submit Feedback</Heading>
            <TextInput
              label="Title"
              value={title}
              onChange={setTitle}
              placeholder="Brief summary..."
              isRequired
            />
            <TextArea
              label="Comments"
              value={comments}
              onChange={setComments}
              placeholder="Tell us more..."
              rows={5}
            />
            <Button
              label="Submit"
              variant="primary"
              onClick={handleSubmit}
              isDisabled={title === '' || comments === ''}
            />
          </VStack>
        )}
      </Dialog>
    </>
  );
}
