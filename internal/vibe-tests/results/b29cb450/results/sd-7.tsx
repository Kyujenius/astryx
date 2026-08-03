// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useEffect} from 'react';
import {Button} from '@/components/ui/button';
import {Progress} from '@/components/ui/progress';

type UploadState = 'idle' | 'uploading' | 'complete';

export default function FileUpload() {
  const [state, setState] = useState<UploadState>('idle');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (state !== 'uploading') {return;}
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { setState('complete'); clearInterval(interval); return 100; }
        return p + 10;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [state]);

  return (
    <div className="max-w-md space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium">quarterly-report.pdf</p>
          <p className="text-sm text-muted-foreground">4.2 MB</p>
        </div>
        {state === 'idle' && <Button size="sm" onClick={() => { setProgress(0); setState('uploading'); }}>Upload</Button>}
        {state === 'uploading' && <Button size="sm" variant="destructive" onClick={() => { setState('idle'); setProgress(0); }}>Cancel</Button>}
      </div>
      {state === 'uploading' && (
        <div className="space-y-1">
          <Progress value={progress} />
          <p className="text-sm text-muted-foreground">{progress}%</p>
        </div>
      )}
      {state === 'complete' && <p className="text-sm text-green-600 font-medium">Upload complete</p>}
    </div>
  );
}
