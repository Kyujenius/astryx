import {useState} from 'react';

export default function FileUploadButton() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState('');

  const upload = async (file: File) => {
    setName(file.name);
    setUploading(true);
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 120));
      setProgress(i);
    }
    setUploading(false);
  };

  return (
    <div style={{maxWidth: 320}}>
      <button
        disabled={uploading}
        onClick={() => { const input = document.createElement('input'); input.type = 'file'; input.onchange = e => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) upload(f); }; input.click(); }}
        style={{padding: '10px 20px', background: uploading ? '#9ca3af' : '#3b82f6', color: 'white', border: 'none', borderRadius: 6, cursor: uploading ? 'not-allowed' : 'pointer', fontWeight: 500}}
      >
        {uploading ? 'Uploading...' : 'Upload file'}
      </button>
      {name && <p style={{fontSize: 13, color: '#6b7280', marginTop: 8}}>{name}</p>}
      {uploading && (
        <div style={{marginTop: 8, height: 6, background: '#e5e7eb', borderRadius: 3}}>
          <div style={{height: '100%', width: `${progress}%`, background: '#3b82f6', borderRadius: 3, transition: 'width 0.1s'}} />
        </div>
      )}
    </div>
  );
}
