import {useState, useCallback} from 'react';
import {Stack} from '@astryxdesign/core/Stack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Card} from '@astryxdesign/core/Card';
import {Badge} from '@astryxdesign/core/Badge';

type UploadState = 'idle' | 'uploading' | 'success' | 'error';

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileUpload() {
  const [state, setState] = useState<UploadState>('idle');
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<{name: string; size: number} | null>(null);

  const simulateUpload = useCallback((selectedFile: {name: string; size: number}) => {
    setFile(selectedFile);
    setState('uploading');
    setProgress(0);

    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setState('success');
      }
      setProgress(Math.min(current, 100));
    }, 200);
  }, []);

  const handleFileSelect = () => {
    simulateUpload({name: 'quarterly-report.pdf', size: 4_250_000});
  };

  return (
    <Stack gap={4} padding={4}>
      <Heading level={2}>Upload File</Heading>

      {state === 'idle' && (
        <Button onPress={handleFileSelect}>Choose File</Button>
      )}

      {state !== 'idle' && file && (
        <Card>
          <Stack gap={3}>
            <HStack justify="space-between" align="center">
              <Stack gap={0.5}>
                <Text weight="semibold">{file.name}</Text>
                <Text type="supporting" color="secondary">
                  {formatFileSize(file.size)}
                </Text>
              </Stack>
              {state === 'success' && <Badge variant="success">Complete</Badge>}
            </HStack>

            <ProgressBar
              label="Upload progress"
              value={Math.round(progress)}
              max={100}
              hasValueLabel
              variant={state === 'success' ? 'success' : 'accent'}
            />

            {state === 'uploading' && (
              <Text type="supporting" color="secondary">
                {Math.round(progress)}% uploaded
              </Text>
            )}

            {state === 'success' && (
              <Text color="secondary">File uploaded successfully!</Text>
            )}
          </Stack>
        </Card>
      )}
    </Stack>
  );
}
