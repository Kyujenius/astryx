import {useState} from 'react';
import {Dialog} from '@astryxdesign/core/Dialog';
import {DialogHeader} from '@astryxdesign/core/DialogHeader';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {VStack} from '@astryxdesign/core/VStack';
import {Text} from '@astryxdesign/core/Text';

export default function FeedbackDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setTitle('');
    setComments('');
    setSubmitted(false);
    setIsOpen(false);
  };

  return (
    <>
      <Button label="Give Feedback" variant="primary" onClick={() => setIsOpen(true)} />
      <Dialog isOpen={isOpen} onOpenChange={setIsOpen} purpose="form">
        <DialogHeader title={submitted ? 'Thank You!' : 'Submit Feedback'} />
        {submitted ? (
          <VStack gap={3} padding={4}>
            <Text>Your feedback has been submitted successfully.</Text>
            <Button label="Close" variant="primary" onClick={handleReset} />
          </VStack>
        ) : (
          <VStack gap={3} padding={4}>
            <TextInput label="Title" value={title} onChange={setTitle} isRequired />
            <TextArea label="Comments" value={comments} onChange={setComments} rows={5} isRequired />
            <Button label="Submit" variant="primary" onClick={handleSubmit} type="submit" />
          </VStack>
        )}
      </Dialog>
    </>
  );
}
