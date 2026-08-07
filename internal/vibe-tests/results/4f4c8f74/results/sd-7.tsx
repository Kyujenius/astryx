import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Progress} from '@/components/ui/progress';
import {Card, CardContent} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {CheckCircle2} from 'lucide-react';

export default function FileUpload() {
  const [file, setFile] = useState<{name: string; size: number} | null>(null);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const upload = () => {
    setDone(false);
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 20;
      if (p >= 100) { p = 100; clearInterval(id); setDone(true); }
      setProgress(Math.round(p));
    }, 200);
  };

  return (
    <Card className="max-w-md">
      <CardContent className="p-6 space-y-4">
        <input type="file" className="text-sm" onChange={e => {
          const f = e.target.files?.[0];
          if (f) { setFile({name: f.name, size: f.size}); setDone(false); setProgress(0); }
        }} />
        {file && (
          <>
            <div className="flex justify-between text-sm">
              <span className="font-medium">{file.name}</span>
              <span className="text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</span>
            </div>
            <Progress value={progress} />
            <p className="text-sm text-muted-foreground">{progress}% complete</p>
            {done ? (
              <Badge className="gap-1"><CheckCircle2 className="h-3 w-3" />Upload complete</Badge>
            ) : (
              <Button onClick={upload}>Upload</Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
