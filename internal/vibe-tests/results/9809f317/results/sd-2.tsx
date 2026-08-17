import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {Icon} from '@astryxdesign/core/Icon';

export default function SubmitButton() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async () => {
    setStatus('loading');
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStatus('success');
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <VStack gap={3} align="center">
      <Button
        clickAction={status === 'idle' ? handleSubmit : undefined}
        onClick={status === 'idle' ? handleSubmit : undefined}
        variant="filled"
        isDisabled={status === 'loading'}
      >
        {status === 'idle' && 'Submit'}
        {status === 'loading' && 'Submitting...'}
        {status === 'success' && 'Done!'}
      </Button>
    </VStack>
  );
}
