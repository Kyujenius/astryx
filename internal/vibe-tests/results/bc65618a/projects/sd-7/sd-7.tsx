import {useState, useCallback} from 'react';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Card} from '@astryxdesign/core/Card';

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setProgress(0);
    }
  }, []);

  const handleUpload = useCallback(() => {
    if (!file) return;
    setUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  }, [file]);

  return (
    <Card width={400} padding={4}>
      <VStack gap={3}>
        <Text>Upload a file</Text>
        <input type="file" onChange={handleFileChange} />
        {file && (
          <VStack gap={2}>
            <HStack hAlign="between">
              <Text>{file.name}</Text>
              <Text color="secondary">{formatFileSize(file.size)}</Text>
            </HStack>
            {uploading && (
              <VStack gap={1}>
                <ProgressBar value={progress} label="Upload progress" />
                <Text color="secondary">{progress}% complete</Text>
              </VStack>
            )}
            {progress === 100 && !uploading && (
              <Text color="secondary">Upload complete</Text>
            )}
            <Button
              label={progress === 100 ? 'Upload complete' : 'Upload'}
              variant="primary"
              onClick={handleUpload}
              isDisabled={uploading || progress === 100}
              isLoading={uploading}
            />
          </VStack>
        )}
      </VStack>
    </Card>
  );
}
