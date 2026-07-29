import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Button} from '@/components/ui/button';
import {AlertTriangle} from 'lucide-react';

interface TrialBannerProps {
  daysRemaining: number;
  onUpgrade: () => void;
}

export default function TrialBanner({daysRemaining, onUpgrade}: TrialBannerProps) {
  return (
    <Alert variant="destructive" className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <AlertTriangle className="h-5 w-5" />
        <div>
          <AlertTitle>Trial expiring soon</AlertTitle>
          <AlertDescription>
            Your trial expires in {daysRemaining} day{daysRemaining === 1 ? '' : 's'}.
            Upgrade now to keep access to all features.
          </AlertDescription>
        </div>
      </div>
      <Button onClick={onUpgrade}>Upgrade</Button>
    </Alert>
  );
}
