// Copyright (c) Meta Platforms, Inc. and affiliates.

import {VStack} from '@astryxdesign/core/Stack';
import {FileInput} from '@astryxdesign/core/FileInput';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Button} from '@astryxdesign/core/Button';
import {Banner} from '@astryxdesign/core/Banner';
import {useState} from 'react';

export default function FileUploadWithProgress() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleUpload = () => {
    if (!file) {return;}
    setIsUploading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setIsComplete(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <VStack gap={4} padding={4} maxWidth={480}>
      <FileInput
        label="Choose file to upload"
        value={file}
        onChange={(f) => { setFile(f as File | null); setIsComplete(false); setProgress(0); }}
      />
      {file && !isComplete && (
        <Button
          label="Upload"
          variant="primary"
          onClick={handleUpload}
          isLoading={isUploading}
          isDisabled={isUploading}
        />
      )}
      {isUploading && (
        <ProgressBar label="Uploading" value={progress} max={100} hasValueLabel />
      )}
      {isComplete && (
        <Banner status="success" title="Upload complete" description={`${file?.name} uploaded.`} />
      )}
    </VStack>
  );
}
