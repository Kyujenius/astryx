import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Button} from '@/components/ui/button';
import {AlertTriangle, X} from 'lucide-react';
import {useState} from 'react';

interface TrialBannerProps {
  daysRemaining: number;
  onUpgrade: () => void;
}

export default function TrialExpirationBanner({daysRemaining, onUpgrade}: TrialBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <Alert variant="destructive" className="relative">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Trial expiring soon</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span>Your trial expires in {daysRemaining} day{daysRemaining === 1 ? '' : 's'}. Upgrade to keep access.</span>
        <div className="flex items-center gap-2 ml-4">
          <Button size="sm" onClick={onUpgrade}>Upgrade</Button>
          <Button size="sm" variant="ghost" onClick={() => setDismissed(true)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}
