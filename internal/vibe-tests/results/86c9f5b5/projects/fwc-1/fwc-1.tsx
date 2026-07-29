import {Banner} from '@astryxdesign/core/Banner';
import {Button} from '@astryxdesign/core/Button';

interface TrialBannerProps {
  daysRemaining: number;
  onUpgrade: () => void;
}

export default function TrialBanner({daysRemaining, onUpgrade}: TrialBannerProps) {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <Banner
        status="warning"
        title={`Your trial expires in ${daysRemaining} day${daysRemaining === 1 ? '' : 's'}`}
        description="Upgrade now to keep access to all features."
        endContent={
          <Button variant="filled" onPress={onUpgrade}>
            Upgrade
          </Button>
        }
        isDismissable
      />
    </div>
  );
}
