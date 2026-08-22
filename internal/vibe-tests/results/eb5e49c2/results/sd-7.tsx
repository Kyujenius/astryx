interface FileUploadProps {
  filename?: string;
  fileSize?: string;
  progress?: number;
}

export default function FileUpload({
  filename = 'report-2026.pdf',
  fileSize = '4.2 MB',
  progress = 67,
}: FileUploadProps) {
  return (
    <div style={{border: '1px solid #e0e0e0', borderRadius: 8, padding: 16}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}>
        <span style={{fontWeight: 500}}>{filename}</span>
        <span style={{color: '#666', fontSize: 14}}>{fileSize}</span>
      </div>
      <div style={{width: '100%', height: 8, background: '#e0e0e0', borderRadius: 4, overflow: 'hidden'}}>
        <div style={{width: `${progress}%`, height: '100%', background: '#0070f3', borderRadius: 4, transition: 'width 0.3s'}} />
      </div>
      <p style={{fontSize: 13, color: '#666', margin: '8px 0 0'}}>{progress}% uploaded</p>
    </div>
  );
}
