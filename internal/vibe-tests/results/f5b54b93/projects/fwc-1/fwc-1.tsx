// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Button} from '@/components/ui/button';
import {AlertTriangle, X} from 'lucide-react';

interface TrialBannerProps {
  daysRemaining?: number;
  onUpgrade?: () => void;
}

export default function TrialBanner({daysRemaining = 7, onUpgrade}: TrialBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {return null;}

  return (
    <Alert variant="destructive" className="relative">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Trial expiring soon</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span>Your trial expires in {daysRemaining} days. Upgrade to keep access.</span>
        <div className="flex gap-2">
          <Button size="sm" onClick={onUpgrade}>Upgrade</Button>
          <Button size="sm" variant="ghost" onClick={() => setIsDismissed(true)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
