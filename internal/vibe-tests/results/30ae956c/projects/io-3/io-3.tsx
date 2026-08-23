import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Progress} from '@/components/ui/progress';

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
    <div className="max-w-sm space-y-4 p-6">
      <Button onClick={upload} disabled={uploading}>{uploading ? 'Uploading...' : 'Upload File'}</Button>
      {uploading && <Progress value={progress} />}
      {result === 'success' && <p className="text-green-600">File uploaded successfully.</p>}
      {result === 'error' && <p className="text-red-600">Upload failed. Please try again.</p>}
    </div>
  );
}
