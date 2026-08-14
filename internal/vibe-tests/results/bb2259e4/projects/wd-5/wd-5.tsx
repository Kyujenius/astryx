import {Dialog} from '@astryxdesign/core/Dialog';
import {DialogHeader} from '@astryxdesign/core/Dialog';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {TextArea} from '@astryxdesign/core/TextArea';
import {VStack} from '@astryxdesign/core/VStack';
import {Layout, LayoutContent, LayoutFooter} from '@astryxdesign/core/Layout';
import {Text} from '@astryxdesign/core/Text';
import {Banner} from '@astryxdesign/core/Banner';
import {useState} from 'react';

export default function FeedbackForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [comments, setComments] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setTitle('');
    setComments('');
    setIsSubmitted(false);
    setIsOpen(false);
  };

  return (
    <>
      <Button onPress={() => setIsOpen(true)}>Leave Feedback</Button>
      <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
        <Layout>
          <DialogHeader title="Feedback" onOpenChange={setIsOpen} />
          <LayoutContent>
            {isSubmitted ? (
              <VStack gap={3}>
                <Banner type="success" title="Thank you!">
                  Your feedback has been submitted successfully.
                </Banner>
                <Button onPress={handleReset}>Close</Button>
              </VStack>
            ) : (
              <VStack gap={3}>
                <TextInput
                  label="Title"
                  value={title}
                  onChange={setTitle}
                  placeholder="Brief summary of your feedback"
                />
                <TextArea
                  label="Comments"
                  value={comments}
                  onChange={setComments}
                  placeholder="Tell us more about your experience..."
                  rows={5}
                />
              </VStack>
            )}
          </LayoutContent>
          {!isSubmitted && (
            <LayoutFooter>
              <Button variant="secondary" onPress={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onPress={handleSubmit} isDisabled={!title || !comments}>
                Submit
              </Button>
            </LayoutFooter>
          )}
        </Layout>
      </Dialog>
    </>
  );
}
