import {useState, useRef} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Progress} from '@/components/ui/progress';

export default function FileUploadButton() {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setFileName(file.name);
    setStatus('uploading');
    setProgress(0);
    for (let i = 1; i <= 20; i++) {
      await new Promise(r => setTimeout(r, 150));
      setProgress((i / 20) * 100);
    }
    // In prod: await fetch('/api/upload', {method: 'POST', body: formData});
    setStatus('success');
  };

  return (
    <div className="flex flex-col gap-4 p-6 max-w-md">
      <h2 className="text-xl font-semibold">Upload</h2>
      <input
        ref={inputRef}
        type="file"
        onChange={e => { const f = e.target.files?.[0]; if (f) upload(f); }}
        className="hidden"
        aria-label="Choose file"
      />
      {status === 'idle' && (
        <Button onClick={() => inputRef.current?.click()}>Choose file to upload</Button>
      )}
      {status !== 'idle' && (
        <Card>
          <CardContent className="space-y-3 pt-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{fileName}</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={Math.round(progress)} />
            {status === 'success' && <p className="text-sm text-muted-foreground">Upload complete!</p>}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
