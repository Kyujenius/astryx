import {FileInput} from '@astryxdesign/core/FileInput';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Banner} from '@astryxdesign/core/Banner';
import {useState} from 'react';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle');

  const handleUpload = async () => {
    if (!file) return;
    setStatus('uploading');
    setProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 200));
      setProgress(i);
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      await fetch('/api/upload', {method: 'POST', body: formData});
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  return (
    <Stack gap={3} padding={4} maxWidth={400}>
      <Text type="display-3">Upload File</Text>
      <FileInput
        label="Choose a file"
        value={file}
        onChange={(f) => setFile(f as File | null)}
        accept=".pdf,.png,.jpg"
      />
      {file && status === 'idle' && (
        <Button label="Upload" variant="primary" onClick={handleUpload} />
      )}
      {status === 'uploading' && (
        <ProgressBar label="Uploading" value={progress} hasValueLabel />
      )}
      {status === 'done' && (
        <Banner status="success" title="Upload complete" description={`${file?.name} uploaded.`} />
      )}
      {status === 'error' && (
        <Banner status="error" title="Upload failed" description="Please try again." />
      )}
    </Stack>
  );
}
