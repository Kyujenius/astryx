import {useState} from 'react';

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileUpload() {
  const [state, setState] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [progress, setProgress] = useState(0);
  const file = {name: 'quarterly-report.pdf', size: 4_250_000};

  const startUpload = () => {
    setState('uploading');
    setProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 100) { p = 100; clearInterval(interval); setState('success'); }
      setProgress(Math.min(p, 100));
    }, 200);
  };

  return (
    <div style={{padding: 24, maxWidth: 400, fontFamily: 'system-ui'}}>
      <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 16}}>Upload File</h2>
      {state === 'idle' && (
        <button onClick={startUpload} style={{padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500}}>Choose File</button>
      )}
      {state !== 'idle' && (
        <div style={{border: '1px solid #e5e5e5', borderRadius: 12, padding: 16}}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 12}}>
            <div>
              <p style={{margin: 0, fontWeight: 600}}>{file.name}</p>
              <p style={{margin: '4px 0 0', fontSize: 13, color: '#666'}}>{formatSize(file.size)}</p>
            </div>
            {state === 'success' && <span style={{background: '#16a34a', color: 'white', padding: '2px 8px', borderRadius: 10, fontSize: 11, fontWeight: 600, height: 'fit-content'}}>Complete</span>}
          </div>
          <div style={{background: '#f3f4f6', borderRadius: 4, height: 8, overflow: 'hidden', marginBottom: 8}}>
            <div style={{background: state === 'success' ? '#16a34a' : '#2563eb', height: '100%', width: `${Math.round(progress)}%`, transition: 'width 0.2s'}} role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Upload progress" />
          </div>
          <p style={{fontSize: 13, color: '#666', margin: 0}}>
            {state === 'uploading' ? `${Math.round(progress)}% uploaded` : 'Upload complete!'}
          </p>
        </div>
      )}
    </div>
  );
}
