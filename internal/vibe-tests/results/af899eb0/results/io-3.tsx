import {useState} from 'react';

export default function FileUploadButton() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<'idle' | 'success' | 'error'>('idle');

  const upload = async () => {
    setUploading(true);
    setProgress(0);
    setResult('idle');
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 150));
      setProgress(i);
    }
    try {
      await fetch('/api/upload', {method: 'POST', body: new FormData()});
      setResult('success');
    } catch {
      setResult('error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{maxWidth: 400, padding: 24}}>
      <button onClick={upload} disabled={uploading} style={{padding: '10px 20px', backgroundColor: uploading ? '#999' : '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: uploading ? 'not-allowed' : 'pointer'}}>{uploading ? 'Uploading...' : 'Upload File'}</button>
      {uploading && (
        <div style={{marginTop: 12}}>
          <div style={{height: 8, backgroundColor: '#e0e0e0', borderRadius: 4}}>
            <div style={{height: '100%', width: `${progress}%`, backgroundColor: '#0066cc', borderRadius: 4, transition: 'width 0.15s'}} />
          </div>
          <p style={{fontSize: 14, color: '#666', marginTop: 4}}>{progress}%</p>
        </div>
      )}
      {result === 'success' && <p style={{color: 'green', marginTop: 8}}>File uploaded successfully.</p>}
      {result === 'error' && <p style={{color: 'red', marginTop: 8}}>Upload failed.</p>}
    </div>
  );
}
