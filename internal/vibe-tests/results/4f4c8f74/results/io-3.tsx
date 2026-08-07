import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Progress} from '@/components/ui/progress';
import {Upload} from 'lucide-react';

export default function FileUploadButton() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState('');

  const upload = async (file: File) => {
    setFileName(file.name);
    setUploading(true);
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 100));
      setProgress(i);
    }
    setUploading(false);
  };

  return (
    <div className="space-y-3 max-w-sm">
      <Button disabled={uploading} onClick={() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = e => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) upload(f); };
        input.click();
      }}>
        <Upload className="h-4 w-4 mr-2" />{uploading ? 'Uploading...' : 'Choose file'}
      </Button>
      {fileName && <p className="text-sm text-muted-foreground">{fileName}</p>}
      {uploading && <Progress value={progress} />}
    </div>
  );
}
