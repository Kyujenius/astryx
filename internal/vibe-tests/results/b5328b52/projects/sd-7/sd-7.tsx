import {useState} from 'react';
import {Button} from './components/ui/button';
import {Card, CardContent} from './components/ui/card';
import {Progress} from './components/ui/progress';
import {Badge} from './components/ui/badge';
import {Input} from './components/ui/input';
import {Label} from './components/ui/label';

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
    <div className="flex flex-col gap-4 p-4 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="file">Upload file</Label>
        <Input id="file" type="file" onChange={handleFileChange} />
      </div>
      {file && (
        <Card>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-medium">{file.name}</span>
              <span className="text-sm text-muted-foreground">{formatFileSize(file.size)}</span>
              {uploaded && <Badge variant="secondary">Uploaded</Badge>}
            </div>
            {uploading && <Progress value={progress} />}
            {!uploading && !uploaded && (
              <Button onClick={handleUpload}>Upload</Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
