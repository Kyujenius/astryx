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
    <div style={{padding: 16, fontFamily: 'system-ui'}}>
      <button
        onClick={handleSubmit}
        disabled={status === 'loading'}
        style={{padding: '10px 20px', background: status === 'success' ? '#22c55e' : '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: status === 'loading' ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 8}}
      >
        {status === 'loading' && <span style={{display: 'inline-block', width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite'}} />}
        {status === 'success' && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        {status === 'success' ? 'Done!' : status === 'loading' ? 'Submitting...' : 'Submit'}
      </button>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}
