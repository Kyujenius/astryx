import {useState, useCallback} from 'react';

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleUpload = useCallback(() => {
    if (!file) return;
    setUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); setUploading(false); return 100; }
        return prev + 10;
      });
    }, 300);
  }, [file]);

  return (
    <div style={{maxWidth: 400, border: '1px solid #e5e7eb', borderRadius: 8, padding: 24, fontFamily: 'system-ui'}}>
      <p style={{fontWeight: 600, marginBottom: 12}}>Upload a file</p>
      <input type="file" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); setProgress(0); }}} />
      {file && (
        <div style={{marginTop: 16}}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}>
            <span style={{fontSize: 14}}>{file.name}</span>
            <span style={{fontSize: 14, color: '#666'}}>{formatFileSize(file.size)}</span>
          </div>
          {uploading && (
            <div style={{marginBottom: 8}}>
              <div style={{height: 8, backgroundColor: '#e5e7eb', borderRadius: 4}}>
                <div style={{height: '100%', width: `${progress}%`, backgroundColor: '#2563eb', borderRadius: 4, transition: 'width 0.3s'}} />
              </div>
              <p style={{fontSize: 12, color: '#666', marginTop: 4}}>{progress}% complete</p>
            </div>
          )}
          {progress === 100 && !uploading && <p style={{fontSize: 14, color: '#16a34a'}}>Upload complete</p>}
          <button onClick={handleUpload} disabled={uploading || progress === 100} style={{width: '100%', padding: '10px 16px', border: 'none', borderRadius: 4, backgroundColor: uploading || progress === 100 ? '#ccc' : '#2563eb', color: 'white', cursor: uploading || progress === 100 ? 'default' : 'pointer', marginTop: 8}}>
            {uploading ? 'Uploading...' : progress === 100 ? 'Upload complete' : 'Upload'}
          </button>
        </div>
      )}
    </div>
  );
}
