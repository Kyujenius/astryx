// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useEffect} from 'react';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Button} from '@astryxdesign/core/Button';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/Stack';
import {HStack} from '@astryxdesign/core/Stack';

type UploadState = 'idle' | 'uploading' | 'complete';

export default function FileUpload() {
  const [state, setState] = useState<UploadState>('idle');
  const [progress, setProgress] = useState(0);
  const [file] = useState({name: 'quarterly-report.pdf', size: '4.2 MB'});

  useEffect(() => {
    if (state !== 'uploading') {return;}
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setState('complete');
          clearInterval(interval);
          return 100;
        }
        return p + 10;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [state]);

  const handleUpload = () => {
    setProgress(0);
    setState('uploading');
  };

  const handleCancel = () => {
    setState('idle');
    setProgress(0);
  };

  return (
    <VStack gap={3} maxWidth={400}>
      <HStack hAlign="between" vAlign="center">
        <VStack gap={0.5}>
          <Text type="label">{file.name}</Text>
          <Text type="supporting" color="secondary">{file.size}</Text>
        </VStack>
        {state === 'idle' && (
          <Button label="Upload" variant="primary" size="sm" onClick={handleUpload} />
        )}
        {state === 'uploading' && (
          <Button label="Cancel" variant="destructive" size="sm" onClick={handleCancel} />
        )}
      </HStack>

      {state === 'uploading' && (
        <VStack gap={1}>
          <ProgressBar label="Upload progress" value={progress} max={100} hasValueLabel />
        </VStack>
      )}

      {state === 'complete' && (
        <HStack gap={1} vAlign="center">
          <Text color="accent">Upload complete</Text>
        </HStack>
      )}
    </VStack>
  );
}
