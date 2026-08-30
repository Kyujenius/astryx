import React, {useState, useCallback} from 'react';

export default function FileUpload() {
  const [state, setState] = useState<'idle'|'uploading'|'complete'>('idle');
  const [progress, setProgress] = useState(0);
  const simulate = useCallback(() => {
    setState('uploading'); setProgress(0);
    let c = 0;
    const iv = setInterval(() => { c += Math.random()*15; if(c>=100){c=100;clearInterval(iv);setState('complete');} setProgress(Math.min(c,100)); }, 300);
  }, []);
  return (
    <div style={{maxWidth: 480, padding: 24, border: '1px solid #ddd', borderRadius: 8}}>
      <h2 style={{margin: '0 0 16px', fontSize: 20, fontWeight: 600}}>File Upload</h2>
      {state === 'idle' && <button onClick={simulate} style={{padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer'}}>Select File to Upload</button>}
      {state !== 'idle' && <>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}>
          <div><p style={{fontWeight: 500, margin: 0}}>quarterly-report.pdf</p><p style={{color: '#888', fontSize: 14, margin: 0}}>4.2 MB</p></div>
          <span style={{fontWeight: 600}}>{Math.round(progress)}%</span>
        </div>
        <div style={{width: '100%', height: 8, background: '#e5e7eb', borderRadius: 4, overflow: 'hidden'}}>
          <div style={{width: `${progress}%`, height: '100%', background: state === 'complete' ? '#22c55e' : '#3b82f6', borderRadius: 4, transition: 'width 0.3s'}} />
        </div>
        {state === 'complete' && <div style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: 8}}><p style={{color: '#22c55e', fontSize: 14, margin: 0}}>Upload complete</p><button onClick={() => {setState('idle'); setProgress(0);}} style={{border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 14, color: '#3b82f6'}}>Upload Another</button></div>}
        {state === 'uploading' && <button onClick={() => {setState('idle'); setProgress(0);}} style={{marginTop: 8, border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 14}}>Cancel</button>}
      </>}
    </div>
  );
}
