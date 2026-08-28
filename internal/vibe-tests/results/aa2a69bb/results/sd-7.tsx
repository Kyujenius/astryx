import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Progress} from '@/components/ui/progress';
import {Badge} from '@/components/ui/badge';

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileUpload() {
  const [state, setState] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [progress, setProgress] = useState(0);
  const file = {name: 'quarterly-report.pdf', size: 4_250_000};

  const startUpload = () => {
    setState('uploading');
    setProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 100) { p = 100; clearInterval(interval); setState('success'); }
      setProgress(Math.min(p, 100));
    }, 200);
  };

  return (
    <div className="flex flex-col gap-4 p-6 max-w-md">
      <h2 className="text-xl font-semibold">Upload File</h2>
      {state === 'idle' && <Button onClick={startUpload}>Choose File</Button>}
      {state !== 'idle' && (
        <Card>
          <CardContent className="space-y-3 pt-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{file.name}</p>
                <p className="text-sm text-muted-foreground">{formatSize(file.size)}</p>
              </div>
              {state === 'success' && <Badge variant="default">Complete</Badge>}
            </div>
            <Progress value={Math.round(progress)} />
            <p className="text-sm text-muted-foreground">
              {state === 'uploading' ? `${Math.round(progress)}% uploaded` : 'Upload complete!'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
