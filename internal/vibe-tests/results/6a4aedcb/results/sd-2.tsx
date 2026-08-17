import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';

export default function SubmitButton() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async () => {
    setStatus('loading');
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStatus('success');
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <Button
        clickAction={status === 'idle' ? handleSubmit : undefined}
        variant="filled"
        isDisabled={status === 'loading'}
      >
        {status === 'idle' && 'Submit'}
        {status === 'loading' && 'Submitting...'}
        {status === 'success' && 'Done!'}
      </Button>
    </div>
  );
}
