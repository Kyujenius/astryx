import React, {useState, useCallback} from 'react';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {StackItem} from '@astryxdesign/core/Stack';

type UploadState = 'idle' | 'uploading' | 'complete' | 'error';

export default function FileUpload() {
  const [state, setState] = useState<UploadState>('idle');
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);

  const simulateUpload = useCallback(() => {
    setFileName('quarterly-report.pdf');
    setFileSize(4.2);
    setState('uploading');
    setProgress(0);

    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setState('complete');
      }
      setProgress(Math.min(current, 100));
    }, 300);
  }, []);

  const reset = useCallback(() => {
    setState('idle');
    setProgress(0);
    setFileName('');
    setFileSize(0);
  }, []);

  return (
    <Card padding={4} maxWidth={480}>
      <VStack gap={3}>
        <Heading level={2}>File Upload</Heading>
        {state === 'idle' && (
          <Button label="Select File to Upload" variant="primary" onClick={simulateUpload} />
        )}
        {state !== 'idle' && (
          <VStack gap={2}>
            <HStack gap={2} vAlign="center">
              <StackItem size="fill">
                <VStack gap={0.5}>
                  <Text weight="medium">{fileName}</Text>
                  <Text type="supporting">{fileSize} MB</Text>
                </VStack>
              </StackItem>
              <Text weight="semibold">{Math.round(progress)}%</Text>
            </HStack>
            <ProgressBar
              label={`Uploading ${fileName}`}
              value={progress}
              max={100}
              hasValueLabel
              variant={state === 'complete' ? 'success' : state === 'error' ? 'error' : 'accent'}
            />
            {state === 'complete' && (
              <HStack gap={2}>
                <Text type="supporting" color="accent">Upload complete</Text>
                <Button label="Upload Another" variant="ghost" size="sm" onClick={reset} />
              </HStack>
            )}
            {state === 'uploading' && (
              <Button label="Cancel" variant="ghost" size="sm" onClick={reset} />
            )}
          </VStack>
        )}
      </VStack>
    </Card>
  );
}
