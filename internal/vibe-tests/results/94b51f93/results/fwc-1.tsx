// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

interface TrialBannerProps {
  daysRemaining?: number;
  onUpgrade?: () => void;
}

export default function TrialBanner({daysRemaining = 7, onUpgrade}: TrialBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {return null;}

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#fef3cd', border: '1px solid #ffc107', borderRadius: 6, fontFamily: 'system-ui'}}>
      <div>
        <strong style={{display: 'block'}}>Trial expiring soon</strong>
        <span style={{fontSize: 14}}>Your trial expires in {daysRemaining} days. Upgrade to keep access.</span>
      </div>
      <div style={{display: 'flex', gap: 8}}>
        <button onClick={onUpgrade} style={{padding: '6px 12px', backgroundColor: '#0066cc', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer'}}>
          Upgrade
        </button>
        <button onClick={() => setIsDismissed(true)} style={{padding: '6px 12px', backgroundColor: 'transparent', border: '1px solid #ccc', borderRadius: 4, cursor: 'pointer'}}>
          Dismiss
        </button>
      </div>
    </div>
  );
}
