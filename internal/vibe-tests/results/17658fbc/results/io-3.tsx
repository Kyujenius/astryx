import {useState, useRef} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Progress} from '@/components/ui/progress';
import {Upload} from 'lucide-react';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) { setFile(selected); uploadFile(selected); }
  };

  const uploadFile = async (f: File) => {
    setStatus('uploading'); setProgress(0);
    const formData = new FormData();
    formData.append('file', f);
    try {
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
      });
      xhr.addEventListener('load', () => { setStatus('done'); setProgress(100); });
      xhr.addEventListener('error', () => { setStatus('error'); });
      xhr.open('POST', '/api/upload');
      xhr.send(formData);
    } catch { setStatus('error'); }
  };

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <input ref={inputRef} type="file" onChange={handleFileChange} className="hidden" />
        <Button variant="outline" onClick={() => inputRef.current?.click()} disabled={status === 'uploading'}>
          <Upload className="mr-2 h-4 w-4" /> {file ? 'Change file' : 'Choose file'}
        </Button>
        {file && <p className="text-sm">{file.name} ({(file.size / 1024).toFixed(1)} KB)</p>}
        {status === 'uploading' && <Progress value={progress} />}
        {status === 'done' && <p className="text-sm text-green-600">Upload complete.</p>}
        {status === 'error' && <p className="text-sm text-red-600">Upload failed.</p>}
      </CardContent>
    </Card>
  );
}
