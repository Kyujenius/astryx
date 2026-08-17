import {useState} from 'react';

export default function SubmitButton() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async () => {
    setStatus('loading');
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStatus('success');
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: 32}}>
      <button
        onClick={handleSubmit}
        disabled={status === 'loading'}
        style={{padding: '12px 24px', borderRadius: 6, border: 'none', background: status === 'success' ? '#22c55e' : '#0066ff', color: '#fff', cursor: status === 'loading' ? 'not-allowed' : 'pointer', fontSize: 14, fontWeight: 500, opacity: status === 'loading' ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: 8}}
      >
        {status === 'loading' && <span style={{display: 'inline-block', width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite'}} />}
        {status === 'idle' && 'Submit'}
        {status === 'loading' && 'Submitting...'}
        {status === 'success' && '\u2713 Done!'}
      </button>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
