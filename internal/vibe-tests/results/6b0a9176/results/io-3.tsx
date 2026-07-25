// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);

  const upload = () => {
    setUploading(true);
    setProgress(0);
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(iv); setUploading(false); setDone(true); return 100; }
        return p + 10;
      });
    }, 300);
  };

  return (
    <div style={{maxWidth: 480, margin: '0 auto', padding: 24, fontFamily: 'system-ui'}}>
      <label style={{display: 'block', marginBottom: 16}}>
        Choose file
        <input type="file" onChange={(e) => { setFile(e.target.files?.[0] || null); setDone(false); setProgress(0); }} style={{display: 'block', marginTop: 4}} />
      </label>
      {file && !done && <button onClick={upload} disabled={uploading} style={{padding: '8px 16px', background: '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', marginBottom: 16}}>{uploading ? 'Uploading...' : 'Upload'}</button>}
      {uploading && (
        <div style={{background: '#eee', borderRadius: 4, overflow: 'hidden', height: 8}}>
          <div style={{width: `${progress}%`, height: '100%', background: '#0066cc', transition: 'width 0.3s'}} />
        </div>
      )}
      {done && <p style={{color: 'green', fontWeight: 600}}>Upload complete!</p>}
    </div>
  );
}
