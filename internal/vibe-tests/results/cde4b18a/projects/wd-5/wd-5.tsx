import {useState} from 'react';
import {Dialog} from '@astryxdesign/core/Dialog';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {Button} from '@astryxdesign/core/Button';
import {Stack} from '@astryxdesign/core/Stack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';

interface FeedbackFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: {title: string; comments: string}) => void;
}

export default function FeedbackForm({isOpen, onOpenChange, onSubmit}: FeedbackFormProps) {
  const [title, setTitle] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = () => {
    onSubmit({title, comments});
    setTitle('');
    setComments('');
    onOpenChange(false);
  };

  return (
    <Dialog isOpen={isOpen} onOpenChange={onOpenChange} width={480}>
      <Stack gap={4} padding={4}>
        <Heading level={2}>Send Feedback</Heading>
        <TextInput
          label="Title"
          value={title}
          onChange={setTitle}
          placeholder="Brief summary"
          isRequired
        />
        <TextArea
          label="Comments"
          value={comments}
          onChange={setComments}
          placeholder="Tell us what you think..."
          rows={5}
        />
        <HStack gap={2} hAlign="end">
          <Button label="Cancel" variant="ghost" onClick={() => onOpenChange(false)} />
          <Button
            label="Submit"
            variant="primary"
            onClick={handleSubmit}
            isDisabled={!title.trim()}
          />
        </HStack>
      </Stack>
    </Dialog>
  );
}
