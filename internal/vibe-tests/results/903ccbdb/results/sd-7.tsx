import {useState, useCallback} from 'react';
import {Stack} from '@astryxdesign/core/Stack';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Button} from '@astryxdesign/core/Button';
import {Text} from '@astryxdesign/core/Text';
import {Badge} from '@astryxdesign/core/Badge';
import {Card} from '@astryxdesign/core/Card';

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function FileUpload() {
  const [file, setFile] = useState<{name: string; size: number} | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'done'>('idle');

  const simulateUpload = useCallback(() => {
    setStatus('uploading');
    setProgress(0);
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setStatus('done');
      }
      setProgress(Math.round(current));
    }, 200);
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile({name: f.name, size: f.size});
      setStatus('idle');
      setProgress(0);
    }
  }, []);

  return (
    <Card>
      <Stack direction="vertical" gap={3} padding={4}>
        <input type="file" onChange={handleFileChange} />

        {file && (
          <Stack direction="vertical" gap={2}>
            <Stack direction="horizontal" gap={2} hAlign="between" vAlign="center">
              <Text weight="medium">{file.name}</Text>
              <Text type="supporting" color="secondary">{formatBytes(file.size)}</Text>
            </Stack>

            {status === 'uploading' && (
              <Stack direction="vertical" gap={1}>
                <ProgressBar value={progress} label="Upload progress" />
                <Text type="supporting">{progress}% complete</Text>
              </Stack>
            )}

            {status === 'done' && (
              <Badge variant="success" label="Upload complete" />
            )}

            {status === 'idle' && (
              <Button label="Upload" variant="primary" onClick={simulateUpload} />
            )}
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
