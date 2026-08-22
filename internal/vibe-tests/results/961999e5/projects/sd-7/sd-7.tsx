import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';

interface FileUploadProps {
  filename?: string;
  fileSize?: string;
  progress?: number;
}

export default function FileUpload({
  filename = 'report-2026.pdf',
  fileSize = '4.2 MB',
  progress = 67,
}: FileUploadProps) {
  return (
    <Card padding={4}>
      <Stack gap={2}>
        <Stack direction="horizontal" gap={2}>
          <Text weight="medium">{filename}</Text>
          <Text color="secondary">{fileSize}</Text>
        </Stack>
        <ProgressBar
          label={`Uploading ${filename}`}
          value={progress}
          max={100}
          hasValueLabel
          variant="accent"
        />
        <Text type="supporting" color="secondary">
          {progress}% uploaded
        </Text>
      </Stack>
    </Card>
  );
}
