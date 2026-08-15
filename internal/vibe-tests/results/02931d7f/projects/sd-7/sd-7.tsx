import {useState} from 'react';

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    setUploaded(false);
    setProgress(0);
  };

  const handleUpload = () => {
    if (!file) return;
    setUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploaded(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px', maxWidth: '500px'}}>
      <div>
        <label htmlFor="file" style={{display: 'block', marginBottom: '4px', fontWeight: 500}}>Upload file</label>
        <input id="file" type="file" onChange={handleFileChange} style={{display: 'block'}} />
      </div>
      {file && (
        <div style={{border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
            <span style={{fontWeight: 500}}>{file.name}</span>
            <span style={{fontSize: '14px', color: '#6b7280'}}>{formatFileSize(file.size)}</span>
            {uploaded && <span style={{fontSize: '12px', padding: '2px 8px', borderRadius: '12px', backgroundColor: '#dcfce7', color: '#166534'}}>Uploaded</span>}
          </div>
          {uploading && (
            <div style={{marginBottom: '8px'}}>
              <div style={{width: '100%', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden'}}>
                <div style={{width: `${progress}%`, height: '100%', backgroundColor: '#3b82f6', transition: 'width 0.3s'}} role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Upload progress" />
              </div>
              <span style={{fontSize: '12px', color: '#6b7280'}}>{progress}%</span>
            </div>
          )}
          {!uploading && !uploaded && (
            <button onClick={handleUpload} style={{padding: '8px 16px', borderRadius: '6px', backgroundColor: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer'}}>Upload</button>
          )}
        </div>
      )}
    </div>
  );
}
