import * as React from 'react';
import {Button} from '../components/ui/button';
import {Progress} from '../components/ui/progress';
import {Input} from '../components/ui/input';
import {Label} from '../components/ui/label';
import {Alert, AlertDescription} from '../components/ui/alert';
import {Upload, CheckCircle, XCircle} from 'lucide-react';

export default function FileUpload() {
  const [file, setFile] = React.useState<File | null>(null);
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState<'idle' | 'uploading' | 'done' | 'error'>('idle');

  const handleUpload = async () => {
    if (!file) return;
    setStatus('uploading');
    setProgress(0);

    for (let i = 0; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 200));
      setProgress(i);
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      await fetch('/api/upload', {method: 'POST', body: formData});
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-sm space-y-4 p-4">
      <h2 className="text-2xl font-semibold">Upload File</h2>
      <div className="space-y-2">
        <Label htmlFor="file">Choose a file</Label>
        <Input
          id="file"
          type="file"
          accept=".pdf,.png,.jpg"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </div>
      {file && status === 'idle' && (
        <Button onClick={handleUpload}>
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
      )}
      {status === 'uploading' && (
        <div className="space-y-1">
          <Progress value={progress} />
          <p className="text-xs text-muted-foreground">{file?.name}</p>
        </div>
      )}
      {status === 'done' && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>Upload complete: {file?.name}</AlertDescription>
        </Alert>
      )}
      {status === 'error' && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>Upload failed. Please try again.</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
