import {useState, useCallback} from 'react';
import {Stack} from '@astryxdesign/core/Stack';
import {Button} from '@astryxdesign/core/Button';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Text} from '@astryxdesign/core/Text';

export default function FileUploadButton() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleUpload = useCallback(async (file: File) => {
    setFileName(file.name);
    setUploading(true);
    setProgress(0);

    // Simulate upload with progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 150));
      setProgress(i);
    }
    setUploading(false);
  }, []);

  const handleClick = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) handleUpload(file);
    };
    input.click();
  }, [handleUpload]);

  return (
    <Stack direction="vertical" gap={3} maxWidth={400}>
      <Button
        label={uploading ? 'Uploading...' : 'Choose file to upload'}
        variant="primary"
        onClick={handleClick}
        isDisabled={uploading}
        isLoading={uploading}
      />
      {fileName && (
        <Stack direction="vertical" gap={1}>
          <Text type="supporting">{fileName}</Text>
          <ProgressBar value={progress} label="Upload progress" />
        </Stack>
      )}
    </Stack>
  );
}
