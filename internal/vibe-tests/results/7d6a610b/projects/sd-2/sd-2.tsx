import {useState} from 'react';
import {Button} from '@/components/ui/button';

export default function SubmitButton() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async () => {
    setStatus('loading');
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStatus('success');
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <div className="flex flex-col gap-3 p-4">
      <Button onClick={handleSubmit} disabled={status === 'loading'}>
        {status === 'loading' && <svg className="animate-spin mr-2 h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
        {status === 'success' && <svg className="mr-2 h-4 w-4" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        {status === 'success' ? 'Done!' : status === 'loading' ? 'Submitting...' : 'Submit'}
      </Button>
    </div>
  );
}
