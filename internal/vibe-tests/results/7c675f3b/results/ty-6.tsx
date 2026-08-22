import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Copy, Check} from 'lucide-react';
import {useState} from 'react';

export default function InstallationExample() {
  const [copied, setCopied] = useState(false);
  const code = 'yarn add @astryxdesign/core';

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">Installation</p>
      <Card className="relative">
        <CardContent className="p-4 font-mono text-sm">
          {code}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleCopy}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
