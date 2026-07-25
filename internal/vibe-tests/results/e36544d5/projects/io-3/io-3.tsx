// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Progress} from '@/components/ui/progress';
import {useState} from 'react';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);

  const upload = () => {
    setUploading(true);
    const iv = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(iv); setUploading(false); setDone(true); return 100; }
        return p + 10;
      });
    }, 300);
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="file">Choose file</Label>
        <Input id="file" type="file" onChange={(e) => { setFile(e.target.files?.[0] || null); setDone(false); setProgress(0); }} />
      </div>
      {file && !done && <Button onClick={upload} disabled={uploading}>{uploading ? 'Uploading...' : 'Upload'}</Button>}
      {uploading && <Progress value={progress} />}
      {done && <p className="text-green-600 font-medium">Upload complete!</p>}
    </div>
  );
}
