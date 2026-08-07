import {useState, useCallback} from 'react';
import {Stack} from '@astryxdesign/core/Stack';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Button} from '@astryxdesign/core/Button';
import {Text} from '@astryxdesign/core/Text';
import {Badge} from '@astryxdesign/core/Badge';

export default function FileUpload() {
  const [file, setFile] = useState<{name: string; size: number} | null>(null);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const upload = useCallback(() => {
    setDone(false);
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 20;
      if (p >= 100) { p = 100; clearInterval(id); setDone(true); }
      setProgress(Math.round(p));
    }, 200);
  }, []);

  return (
    <div className="max-w-md p-4 border rounded-lg">
      <Stack direction="vertical" gap={3}>
        <input type="file" onChange={e => { const f = e.target.files?.[0]; if (f) { setFile({name: f.name, size: f.size}); setDone(false); setProgress(0); }}} />
        {file && (
          <>
            <div className="flex justify-between">
              <Text weight="medium">{file.name}</Text>
              <Text type="supporting">{(file.size / 1024).toFixed(1)} KB</Text>
            </div>
            <ProgressBar value={progress} label="Upload progress" />
            <Text type="supporting">{progress}%</Text>
            {done ? <Badge variant="success" label="Done" /> : <Button label="Upload" variant="primary" onClick={upload} />}
          </>
        )}
      </Stack>
    </div>
  );
}
