// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useEffect} from 'react';

export default function FileUpload() {
  const [state, setState] = useState<'idle' | 'uploading' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (state !== 'uploading') {return;}
    const i = setInterval(() => { setProgress(p => { if (p >= 100) { setState('complete'); clearInterval(i); return 100; } return p + 10; }); }, 500);
    return () => clearInterval(i);
  }, [state]);

  return (
    <div style={{maxWidth: 400, padding: 16}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div><p style={{fontWeight: 600, margin: 0}}>quarterly-report.pdf</p><p style={{color: '#666', fontSize: 14, margin: 0}}>4.2 MB</p></div>
        {state === 'idle' && <button onClick={() => { setProgress(0); setState('uploading'); }} style={{background: '#0066cc', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 16px', cursor: 'pointer'}}>Upload</button>}
        {state === 'uploading' && <button onClick={() => { setState('idle'); setProgress(0); }} style={{background: '#dc3545', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 16px', cursor: 'pointer'}}>Cancel</button>}
      </div>
      {state === 'uploading' && (
        <div style={{marginTop: 12}}>
          <div style={{background: '#e9ecef', borderRadius: 4, height: 8, overflow: 'hidden'}}><div style={{background: '#0066cc', height: '100%', width: `${progress}%`, transition: 'width 0.3s'}} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Upload progress" /></div>
          <p style={{fontSize: 12, color: '#666', marginTop: 4}}>{progress}%</p>
        </div>
      )}
      {state === 'complete' && <p style={{color: '#28a745', fontWeight: 500, marginTop: 12}}>Upload complete</p>}
    </div>
  );
}
