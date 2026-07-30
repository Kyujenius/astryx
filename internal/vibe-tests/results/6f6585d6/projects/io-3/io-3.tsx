import {useState, useRef} from 'react';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = (f: File) => {
    setStatus('uploading'); setProgress(0);
    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener('progress', e => { if (e.lengthComputable) setProgress(Math.round(e.loaded / e.total * 100)); });
    xhr.addEventListener('load', () => { setStatus('done'); setProgress(100); });
    xhr.addEventListener('error', () => setStatus('error'));
    const fd = new FormData(); fd.append('file', f);
    xhr.open('POST', '/api/upload'); xhr.send(fd);
  };

  return (
    <div style={{border: '1px solid #e5e7eb', borderRadius: 8, padding: 24}}>
      <input ref={inputRef} type="file" onChange={e => { const f = e.target.files?.[0]; if (f) { setFile(f); upload(f); }}} style={{display: 'none'}} />
      <button onClick={() => inputRef.current?.click()} disabled={status === 'uploading'} style={{padding: '8px 16px', border: '1px solid #d1d5db', borderRadius: 6, cursor: 'pointer'}}>{file ? 'Change file' : 'Choose file'}</button>
      {file && <p style={{marginTop: 8, fontSize: 14}}>{file.name} ({(file.size/1024).toFixed(1)} KB)</p>}
      {status === 'uploading' && <div style={{marginTop: 12, background: '#e5e7eb', borderRadius: 4, height: 8}}><div style={{width: `${progress}%`, height: '100%', background: '#3b82f6', borderRadius: 4, transition: 'width 0.2s'}} /></div>}
      {status === 'done' && <p style={{marginTop: 8, color: '#16a34a'}}>Upload complete.</p>}
      {status === 'error' && <p style={{marginTop: 8, color: '#dc2626'}}>Upload failed.</p>}
    </div>
  );
}
