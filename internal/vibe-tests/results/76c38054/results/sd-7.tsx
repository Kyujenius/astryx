import {useState} from 'react';
import {FileInput} from '@astryxdesign/core/FileInput';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {Badge} from '@astryxdesign/core/Badge';

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = () => {
    if (!file) return;
    setUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setUploaded(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <Stack direction="vertical" gap={4} padding={4} maxWidth={500}>
      <FileInput
        label="Upload file"
        value={file}
        onChange={(f) => {
          setFile(f as File | null);
          setUploaded(false);
          setProgress(0);
        }}
        mode="dropzone"
      />
      {file && (
        <Card padding={3}>
          <Stack direction="vertical" gap={2}>
            <Stack direction="horizontal" gap={2} vAlign="center">
              <Text weight="medium">{file.name}</Text>
              <Text type="supporting">{formatFileSize(file.size)}</Text>
              {uploaded && <Badge label="Uploaded" variant="success" />}
            </Stack>
            {uploading && (
              <ProgressBar
                label="Upload progress"
                value={progress}
                max={100}
                hasValueLabel
              />
            )}
            {!uploading && !uploaded && (
              <Button label="Upload" variant="primary" onClick={handleUpload} />
            )}
          </Stack>
        </Card>
      )}
    </Stack>
  );
}
