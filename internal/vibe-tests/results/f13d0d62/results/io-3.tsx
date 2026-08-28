import {useState, useRef} from 'react';

export default function FileUploadButton() {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setFileName(file.name);
    setStatus('uploading');
    setProgress(0);
    for (let i = 1; i <= 20; i++) {
      await new Promise(r => setTimeout(r, 150));
      setProgress((i / 20) * 100);
    }
    // In production: await fetch('/api/upload', {method: 'POST', body: formData})
    setStatus('success');
  };

  return (
    <div style={{padding: 24, maxWidth: 400, fontFamily: 'system-ui'}}>
      <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 16}}>Upload</h2>
      <input
        ref={inputRef}
        type="file"
        onChange={e => { const f = e.target.files?.[0]; if (f) upload(f); }}
        style={{display: 'none'}}
        aria-label="Choose file"
      />
      {status === 'idle' && (
        <button onClick={() => inputRef.current?.click()} style={{padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500}}>
          Choose file to upload
        </button>
      )}
      {status !== 'idle' && (
        <div style={{border: '1px solid #e5e5e5', borderRadius: 12, padding: 16}}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 12}}>
            <span style={{fontWeight: 600}}>{fileName}</span>
            <span style={{fontSize: 13, color: '#666'}}>{Math.round(progress)}%</span>
          </div>
          <div style={{background: '#f3f4f6', borderRadius: 4, height: 8, overflow: 'hidden', marginBottom: 8}}>
            <div style={{background: status === 'success' ? '#16a34a' : '#2563eb', height: '100%', width: `${Math.round(progress)}%`, transition: 'width 0.2s'}} role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100} aria-label="Upload progress" />
          </div>
          {status === 'success' && <p style={{fontSize: 13, color: '#666', margin: 0}}>Upload complete!</p>}
        </div>
      )}
    </div>
  );
}
