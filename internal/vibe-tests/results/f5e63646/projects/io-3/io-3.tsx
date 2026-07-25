// Copyright (c) Meta Platforms, Inc. and affiliates.

import {VStack} from '@astryxdesign/core/Stack';
import {FileInput} from '@astryxdesign/core/FileInput';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Button} from '@astryxdesign/core/Button';
import {Banner} from '@astryxdesign/core/Banner';
import {useState} from 'react';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);

  const upload = () => {
    setUploading(true);
    setProgress(0);
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(iv); setUploading(false); setDone(true); return 100; }
        return p + 10;
      });
    }, 300);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <VStack gap={4}>
        <FileInput label="Select file" value={file} onChange={(f) => { setFile(f as File | null); setDone(false); }} />
        {file && !done && <Button label="Upload" variant="primary" onClick={upload} isLoading={uploading} />}
        {uploading && <ProgressBar label="Uploading" value={progress} hasValueLabel />}
        {done && <Banner status="success" title="Upload complete" />}
      </VStack>
    </div>
  );
}
