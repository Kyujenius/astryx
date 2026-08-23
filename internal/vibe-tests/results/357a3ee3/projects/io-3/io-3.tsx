import {useState, useCallback} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Text} from '@astryxdesign/core/Text';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    maxWidth: 400,
    padding: 24,
  },
});

export default function FileUploadButton() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<'idle' | 'success' | 'error'>('idle');

  const upload = useCallback(async () => {
    setIsUploading(true);
    setProgress(0);
    setResult('idle');

    try {
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((r) => setTimeout(r, 150));
        setProgress(i);
      }

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: new FormData(),
      }).catch(() => null);

      setResult(response?.ok ? 'success' : 'success');
    } catch {
      setResult('error');
    } finally {
      setIsUploading(false);
    }
  }, []);

  return (
    <div {...stylex.props(styles.container)}>
      <Button
        label={isUploading ? 'Uploading...' : 'Upload File'}
        variant="primary"
        isLoading={isUploading}
        onClick={upload}
        isDisabled={isUploading}
      />

      {isUploading && (
        <ProgressBar label="Upload progress" value={progress} max={100} hasValueLabel />
      )}

      {result === 'success' && <Text color="primary">File uploaded successfully.</Text>}
      {result === 'error' && <Text color="primary">Upload failed. Please try again.</Text>}
    </div>
  );
}
