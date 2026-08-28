import {useState, useCallback} from 'react';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Card} from '@astryxdesign/core/Card';
import {Badge} from '@astryxdesign/core/Badge';

type UploadState = 'idle' | 'uploading' | 'success';

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileUpload() {
  const [state, setState] = useState<UploadState>('idle');
  const [progress, setProgress] = useState(0);
  const [file] = useState({name: 'annual-report.pdf', size: 3_800_000});

  const startUpload = useCallback(() => {
    setState('uploading');
    setProgress(0);
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 12;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setState('success');
      }
      setProgress(Math.min(current, 100));
    }, 200);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-6 max-w-md">
      <Heading level={2}>Upload File</Heading>

      {state === 'idle' && (
        <Button onPress={startUpload}>Choose File</Button>
      )}

      {state !== 'idle' && (
        <Card>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <Text weight="semibold">{file.name}</Text>
                <Text type="supporting" color="secondary">{formatSize(file.size)}</Text>
              </div>
              {state === 'success' && <Badge variant="success">Done</Badge>}
            </div>
            <ProgressBar
              label="Upload progress"
              value={Math.round(progress)}
              max={100}
              hasValueLabel
              variant={state === 'success' ? 'success' : 'accent'}
            />
            {state === 'uploading' && (
              <Text type="supporting" color="secondary">{Math.round(progress)}% uploaded</Text>
            )}
            {state === 'success' && (
              <Text color="secondary">Upload complete!</Text>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
