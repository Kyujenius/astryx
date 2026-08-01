import {useState} from 'react';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle');

  const handleUpload = async () => {
    if (!file) return;
    setStatus('uploading');
    setProgress(0);

    for (let i = 0; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 200));
      setProgress(i);
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      await fetch('/api/upload', {method: 'POST', body: formData});
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div style={{maxWidth: 360, padding: 16, fontFamily: 'system-ui, sans-serif'}}>
      <h2 style={{fontSize: 24, fontWeight: 600, marginBottom: 12}}>Upload File</h2>
      <input
        type="file"
        accept=".pdf,.png,.jpg"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        style={{marginBottom: 12}}
      />
      {file && status === 'idle' && (
        <button
          onClick={handleUpload}
          style={{padding: '8px 16px', background: '#2563eb', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer'}}
        >
          Upload
        </button>
      )}
      {status === 'uploading' && (
        <div style={{marginTop: 12}}>
          <div style={{height: 8, background: '#e5e5e5', borderRadius: 4}}>
            <div style={{height: '100%', width: `${progress}%`, background: '#2563eb', borderRadius: 4, transition: 'width 0.2s'}} />
          </div>
          <p style={{fontSize: 12, color: '#666', marginTop: 4}}>{file?.name} - {progress}%</p>
        </div>
      )}
      {status === 'done' && (
        <div style={{marginTop: 12, padding: 12, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 6}}>
          Upload complete: {file?.name}
        </div>
      )}
      {status === 'error' && (
        <div style={{marginTop: 12, padding: 12, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 6, color: '#dc2626'}}>
          Upload failed. Please try again.
        </div>
      )}
    </div>
  );
}
