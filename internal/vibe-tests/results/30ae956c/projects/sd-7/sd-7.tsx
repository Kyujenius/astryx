import {useState, useCallback} from 'react';
import {Button} from '@/components/ui/button';
import {Progress} from '@/components/ui/progress';

type UploadState = 'idle' | 'uploading' | 'success' | 'error';

export default function FileUpload() {
  const [state, setState] = useState<UploadState>('idle');
  const [progress, setProgress] = useState(0);

  const upload = useCallback(() => {
    setState('uploading');
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setState(Math.random() > 0.3 ? 'success' : 'error');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  }, []);

  return (
    <div className="max-w-sm space-y-4 p-6">
      {state === 'idle' && <Button onClick={upload}>Upload File</Button>}
      {state === 'uploading' && (
        <>
          <p className="font-medium">Uploading document.pdf...</p>
          <Progress value={progress} />
          <p className="text-sm text-muted-foreground">{progress}%</p>
        </>
      )}
      {state === 'success' && (
        <div className="space-y-2">
          <p className="text-green-600 font-medium">Upload complete</p>
          <Button variant="outline" onClick={() => setState('idle')}>Upload Another</Button>
        </div>
      )}
      {state === 'error' && (
        <div className="space-y-2">
          <p className="text-red-600 font-medium">Upload failed</p>
          <Button onClick={upload}>Retry</Button>
          <Button variant="ghost" onClick={() => setState('idle')}>Cancel</Button>
        </div>
      )}
    </div>
  );
}
