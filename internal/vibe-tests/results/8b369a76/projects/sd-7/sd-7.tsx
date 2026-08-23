import {useState, useCallback} from 'react';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    padding: 24,
  },
  fileInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  result: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
});

type UploadState = 'idle' | 'uploading' | 'success' | 'error';

export default function FileUpload() {
  const [state, setState] = useState<UploadState>('idle');
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');

  const simulateUpload = useCallback((file: string) => {
    setFileName(file);
    setState('uploading');
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          const success = Math.random() > 0.3;
          setState(success ? 'success' : 'error');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  }, []);

  const reset = () => {
    setState('idle');
    setProgress(0);
    setFileName('');
  };

  return (
    <div {...stylex.props(styles.container)}>
      {state === 'idle' && (
        <Button
          label="Upload File"
          variant="primary"
          onClick={() => simulateUpload('document.pdf')}
        />
      )}

      {state === 'uploading' && (
        <>
          <div {...stylex.props(styles.fileInfo)}>
            <Text weight="medium">{fileName}</Text>
          </div>
          <ProgressBar label="Upload progress" value={progress} max={100} hasValueLabel />
        </>
      )}

      {state === 'success' && (
        <div {...stylex.props(styles.result)}>
          <Text color="primary" weight="medium">Upload complete</Text>
          <Text type="supporting">{fileName} uploaded successfully</Text>
          <Button label="Upload Another" variant="secondary" onClick={reset} />
        </div>
      )}

      {state === 'error' && (
        <div {...stylex.props(styles.result)}>
          <Text color="primary" weight="medium">Upload failed</Text>
          <Text type="supporting">There was a problem uploading {fileName}.</Text>
          <Button label="Retry" variant="primary" onClick={() => simulateUpload(fileName)} />
          <Button label="Cancel" variant="ghost" onClick={reset} />
        </div>
      )}
    </div>
  );
}
