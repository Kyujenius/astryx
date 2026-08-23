import {useState, useCallback} from 'react';

type State = 'idle' | 'uploading' | 'success' | 'error';

export default function FileUpload() {
  const [state, setState] = useState<State>('idle');
  const [progress, setProgress] = useState(0);

  const upload = useCallback(() => {
    setState('uploading');
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); setState(Math.random() > 0.3 ? 'success' : 'error'); return 100; }
        return p + 10;
      });
    }, 200);
  }, []);

  return (
    <div style={{maxWidth: 400, padding: 24}}>
      {state === 'idle' && <button onClick={upload} style={{padding: '10px 20px', backgroundColor: '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer'}}>Upload File</button>}
      {state === 'uploading' && (
        <div>
          <p style={{fontWeight: 'bold'}}>Uploading document.pdf...</p>
          <div style={{height: 8, backgroundColor: '#e0e0e0', borderRadius: 4, marginTop: 8}}>
            <div style={{height: '100%', width: `${progress}%`, backgroundColor: '#0066cc', borderRadius: 4, transition: 'width 0.2s'}} />
          </div>
          <p style={{fontSize: 14, color: '#666', marginTop: 4}}>{progress}%</p>
        </div>
      )}
      {state === 'success' && (<div><p style={{color: 'green', fontWeight: 'bold'}}>Upload complete</p><button onClick={() => setState('idle')} style={{marginTop: 8, padding: '8px 16px', border: '1px solid #ccc', borderRadius: 4, cursor: 'pointer'}}>Upload Another</button></div>)}
      {state === 'error' && (<div><p style={{color: 'red', fontWeight: 'bold'}}>Upload failed</p><button onClick={upload} style={{marginTop: 8, padding: '8px 16px', backgroundColor: '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer'}}>Retry</button></div>)}
    </div>
  );
}
