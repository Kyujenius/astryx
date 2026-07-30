import {Button} from '@astryxdesign/core/Button';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Icon} from '@astryxdesign/core/Icon';
import {Card} from '@astryxdesign/core/Card';
import {useState, useRef} from 'react';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      uploadFile(selected);
    }
  };

  const uploadFile = async (fileToUpload: File) => {
    setStatus('uploading');
    setProgress(0);

    const formData = new FormData();
    formData.append('file', fileToUpload);

    try {
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          setProgress(Math.round((e.loaded / e.total) * 100));
        }
      });
      xhr.addEventListener('load', () => {
        setStatus('done');
        setProgress(100);
      });
      xhr.addEventListener('error', () => {
        setStatus('error');
      });
      xhr.open('POST', '/api/upload');
      xhr.send(formData);
    } catch {
      setStatus('error');
    }
  };

  return (
    <Card>
      <Stack gap={4}>
        <input
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          style={{display: 'none'}}
          aria-hidden="true"
        />

        <Button
          label={file ? 'Change file' : 'Choose file to upload'}
          icon={<Icon name="upload" />}
          variant="secondary"
          onClick={handleFileSelect}
          isLoading={status === 'uploading'}
        />

        {file && (
          <Stack gap={2}>
            <Text type="label">{file.name}</Text>
            <Text type="supporting">
              {(file.size / 1024).toFixed(1)} KB
            </Text>
          </Stack>
        )}

        {status === 'uploading' && (
          <ProgressBar
            value={progress}
            max={100}
            label={`Uploading: ${progress}%`}
          />
        )}

        {status === 'done' && (
          <Text type="body">Upload complete.</Text>
        )}

        {status === 'error' && (
          <Text type="body">Upload failed. Please try again.</Text>
        )}
      </Stack>
    </Card>
  );
}
