import {useState, useCallback, useRef} from 'react';
import {Stack} from '@astryxdesign/core/Stack';
import {HStack} from '@astryxdesign/core/HStack';
import {Button} from '@astryxdesign/core/Button';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';
import {Card} from '@astryxdesign/core/Card';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export default function FileUploadButton() {
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(async (file: File) => {
    setFileName(file.name);
    setStatus('uploading');
    setProgress(0);

    // Simulate chunked upload to endpoint
    const totalChunks = 20;
    for (let i = 1; i <= totalChunks; i++) {
      await new Promise(resolve => setTimeout(resolve, 150));
      setProgress((i / totalChunks) * 100);
    }

    // Simulate API call
    try {
      // In production: await fetch('/api/upload', { method: 'POST', body: formData });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  return (
    <Stack gap={4} padding={4}>
      <Heading level={2}>Upload</Heading>
      <input
        ref={inputRef}
        type="file"
        onChange={handleChange}
        style={{display: 'none'}}
        aria-label="Choose file to upload"
      />

      {status === 'idle' && (
        <Button onPress={() => inputRef.current?.click()}>
          Choose file to upload
        </Button>
      )}

      {status !== 'idle' && (
        <Card>
          <Stack gap={3}>
            <HStack justify="space-between" align="center">
              <Text weight="semibold">{fileName}</Text>
              <Text type="supporting" color="secondary">
                {Math.round(progress)}%
              </Text>
            </HStack>
            <ProgressBar
              label={`Uploading ${fileName}`}
              value={Math.round(progress)}
              max={100}
              hasValueLabel
              variant={status === 'success' ? 'success' : status === 'error' ? 'error' : 'accent'}
            />
            {status === 'success' && (
              <Text color="secondary">Upload complete!</Text>
            )}
            {status === 'error' && (
              <HStack gap={2} align="center">
                <Text color="secondary">Upload failed.</Text>
                <Button size="sm" variant="ghost" onPress={() => inputRef.current?.click()}>
                  Retry
                </Button>
              </HStack>
            )}
          </Stack>
        </Card>
      )}
    </Stack>
  );
}
