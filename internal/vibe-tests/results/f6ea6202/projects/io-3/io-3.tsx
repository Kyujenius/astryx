import {useState, useRef} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';
import {Card} from '@astryxdesign/core/Card';

type Status = 'idle' | 'uploading' | 'success' | 'error';

export default function FileUploadButton() {
  const [status, setStatus] = useState<Status>('idle');
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setFileName(file.name);
    setStatus('uploading');
    setProgress(0);
    for (let i = 1; i <= 20; i++) {
      await new Promise(r => setTimeout(r, 150));
      setProgress((i / 20) * 100);
    }
    setStatus('success');
  };

  return (
    <div className="flex flex-col gap-4 p-6 max-w-md">
      <Heading level={2}>Upload</Heading>
      <input
        ref={inputRef}
        type="file"
        onChange={e => { const f = e.target.files?.[0]; if (f) upload(f); }}
        className="hidden"
        aria-label="Choose file"
      />
      {status === 'idle' && (
        <Button onPress={() => inputRef.current?.click()}>Choose file to upload</Button>
      )}
      {status !== 'idle' && (
        <Card>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <Text weight="semibold">{fileName}</Text>
              <Text type="supporting">{Math.round(progress)}%</Text>
            </div>
            <ProgressBar
              label={`Uploading ${fileName}`}
              value={Math.round(progress)}
              max={100}
              hasValueLabel
              variant={status === 'success' ? 'success' : 'accent'}
            />
            {status === 'success' && <Text color="secondary">Upload complete!</Text>}
          </div>
        </Card>
      )}
    </div>
  );
}
