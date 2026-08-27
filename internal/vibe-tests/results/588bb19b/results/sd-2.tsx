import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {Text} from '@astryxdesign/core/Text';

export default function SubmitButton() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async () => {
    setStatus('loading');
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStatus('success');
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <VStack gap={3} padding={4}>
      <Button
        label={status === 'success' ? 'Done!' : 'Submit'}
        variant="primary"
        isLoading={status === 'loading'}
        onClick={handleSubmit}
        icon={status === 'success' ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> : undefined}
      />
      {status === 'success' && <Text color="secondary">Submitted successfully</Text>}
    </VStack>
  );
}
