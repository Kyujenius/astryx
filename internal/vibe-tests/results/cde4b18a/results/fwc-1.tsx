import {Banner} from '@astryxdesign/core/Banner';
import {Button} from '@astryxdesign/core/Button';

interface TrialBannerProps {
  daysRemaining: number;
  onUpgrade: () => void;
}

export default function TrialExpirationBanner({daysRemaining, onUpgrade}: TrialBannerProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <Banner
        status="warning"
        title={`Your trial expires in ${daysRemaining} day${daysRemaining === 1 ? '' : 's'}`}
        description="Upgrade now to keep access to all features."
        endContent={
          <Button label="Upgrade" variant="primary" size="sm" onClick={onUpgrade} />
        }
        isDismissable
      />
    </div>
  );
}
