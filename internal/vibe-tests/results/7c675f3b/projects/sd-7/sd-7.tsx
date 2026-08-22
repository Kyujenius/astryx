import {Progress} from '@/components/ui/progress';
import {Card, CardContent} from '@/components/ui/card';

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
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-medium">{filename}</span>
            <span className="text-muted-foreground text-sm">{fileSize}</span>
          </div>
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground">{progress}% uploaded</p>
        </div>
      </CardContent>
    </Card>
  );
}
