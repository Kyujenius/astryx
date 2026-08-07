import {useState} from 'react';

export default function FileUpload() {
  const [file, setFile] = useState<{name: string; size: number} | null>(null);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const upload = () => {
    setDone(false);
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 18;
      if (p >= 100) { p = 100; clearInterval(id); setDone(true); }
      setProgress(Math.round(p));
    }, 200);
  };

  return (
    <div style={{maxWidth: 400, padding: 20, border: '1px solid #e5e7eb', borderRadius: 8}}>
      <input type="file" onChange={e => { const f = e.target.files?.[0]; if (f) { setFile({name: f.name, size: f.size}); setDone(false); setProgress(0); }}} style={{marginBottom: 12}} />
      {file && (
        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 14}}>
            <span style={{fontWeight: 500}}>{file.name}</span>
            <span style={{color: '#6b7280'}}>{(file.size / 1024).toFixed(1)} KB</span>
          </div>
          <div style={{height: 8, background: '#e5e7eb', borderRadius: 4, overflow: 'hidden'}}>
            <div style={{height: '100%', width: `${progress}%`, background: done ? '#22c55e' : '#3b82f6', transition: 'width 0.2s'}} />
          </div>
          <span style={{fontSize: 13, color: '#6b7280'}}>{progress}% complete</span>
          {done ? <span style={{fontSize: 13, color: '#22c55e', fontWeight: 500}}>Upload complete</span> : <button onClick={upload} style={{padding: '6px 12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer'}}>Upload</button>}
        </div>
      )}
    </div>
  );
}
