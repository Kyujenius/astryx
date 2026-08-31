import {useState, useCallback} from 'react';
import {Progress} from '@/components/ui/progress';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setProgress(0);
    }
  }, []);

  const handleUpload = useCallback(() => {
    if (!file) return;
    setUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  }, [file]);

  return (
    <Card className="w-[400px]">
      <CardContent className="space-y-4 pt-6">
        <p className="font-medium">Upload a file</p>
        <input type="file" onChange={handleFileChange} />
        {file && (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">{file.name}</span>
              <span className="text-sm text-muted-foreground">{formatFileSize(file.size)}</span>
            </div>
            {uploading && (
              <div className="space-y-1">
                <Progress value={progress} />
                <p className="text-sm text-muted-foreground">{progress}% complete</p>
              </div>
            )}
            {progress === 100 && !uploading && (
              <p className="text-sm text-muted-foreground">Upload complete</p>
            )}
            <Button onClick={handleUpload} disabled={uploading || progress === 100} className="w-full">
              {uploading ? 'Uploading...' : progress === 100 ? 'Upload complete' : 'Upload'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
