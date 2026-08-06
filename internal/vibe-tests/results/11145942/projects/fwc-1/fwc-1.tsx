import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Button} from '@/components/ui/button';
import {AlertTriangle} from 'lucide-react';

export default function TrialExpiryBanner({daysRemaining = 7, onUpgrade}: {daysRemaining?: number; onUpgrade?: () => void}) {
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Trial expiring soon</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span>Your trial expires in {daysRemaining} day{daysRemaining === 1 ? '' : 's'}.</span>
        <Button size="sm" onClick={onUpgrade}>Upgrade</Button>
      </AlertDescription>
    </Alert>
  );
}