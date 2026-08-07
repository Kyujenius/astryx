import {useState, useCallback} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Text} from '@astryxdesign/core/Text';
import {Stack} from '@astryxdesign/core/Stack';

export default function FileUploadButton() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState('');

  const upload = useCallback(async (file: File) => {
    setName(file.name);
    setUploading(true);
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 100));
      setProgress(i);
    }
    setUploading(false);
  }, []);

  return (
    <div className="max-w-sm p-4">
      <Stack direction="vertical" gap={3}>
        <Button label="Upload file" variant="primary" isLoading={uploading} onClick={() => {
          const input = document.createElement('input');
          input.type = 'file';
          input.onchange = e => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) upload(f); };
          input.click();
        }} />
        {name && <Text type="supporting">{name}</Text>}
        {uploading && <ProgressBar value={progress} label="Uploading" />}
      </Stack>
    </div>
  );
}
