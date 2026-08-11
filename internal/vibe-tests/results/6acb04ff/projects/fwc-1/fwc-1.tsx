// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Banner} from '@astryxdesign/core/Banner';
import {Button} from '@astryxdesign/core/Button';

interface TrialBannerProps {
  daysRemaining: number;
  onUpgrade: () => void;
}

export default function TrialBanner({daysRemaining = 7, onUpgrade}: TrialBannerProps) {
  return (
    <Banner
      status="warning"
      title={`Your trial expires in ${daysRemaining} days`}
      description="Upgrade now to keep access to all features."
      endContent={<Button label="Upgrade" variant="primary" onClick={onUpgrade} />}
      isDismissable
    />
  );
}
