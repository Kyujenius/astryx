import React, {useState, useCallback} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Progress} from '@/components/ui/progress';

export default function FileUpload() {
  const [state, setState] = useState<'idle'|'uploading'|'complete'>('idle');
  const [progress, setProgress] = useState(0);
  const simulate = useCallback(() => {
    setState('uploading'); setProgress(0);
    let c = 0;
    const iv = setInterval(() => { c += Math.random()*15; if(c>=100){c=100;clearInterval(iv);setState('complete');} setProgress(Math.min(c,100)); }, 300);
  }, []);
  return (
    <Card className="w-full max-w-md">
      <CardHeader><CardTitle>File Upload</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {state === 'idle' && <Button onClick={simulate}>Select File to Upload</Button>}
        {state !== 'idle' && <>
          <div className="flex justify-between"><div><p className="font-medium">quarterly-report.pdf</p><p className="text-sm text-muted-foreground">4.2 MB</p></div><span className="font-semibold">{Math.round(progress)}%</span></div>
          <Progress value={progress} />
          {state === 'complete' && <div className="flex items-center gap-2"><p className="text-sm text-green-600">Upload complete</p><Button variant="ghost" size="sm" onClick={() => { setState('idle'); setProgress(0); }}>Upload Another</Button></div>}
          {state === 'uploading' && <Button variant="ghost" size="sm" onClick={() => { setState('idle'); setProgress(0); }}>Cancel</Button>}
        </>}
      </CardContent>
    </Card>
  );
}
