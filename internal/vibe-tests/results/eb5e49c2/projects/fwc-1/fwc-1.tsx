import {useState} from 'react';

interface TrialBannerProps {
  daysRemaining?: number;
  onUpgrade?: () => void;
}

export default function TrialBanner({daysRemaining = 5, onUpgrade}: TrialBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#fef3cd', border: '1px solid #ffc107', borderRadius: 8}}>
      <div>
        <strong>Trial expiring soon</strong>
        <p style={{margin: '4px 0 0', fontSize: 14}}>
          Your trial expires in {daysRemaining} day{daysRemaining === 1 ? '' : 's'}. Upgrade to keep access.
        </p>
      </div>
      <div style={{display: 'flex', gap: 8}}>
        <button onClick={onUpgrade} style={{padding: '6px 12px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer'}}>
          Upgrade
        </button>
        <button onClick={() => setDismissed(true)} style={{padding: '6px 8px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 18}}>
          x
        </button>
      </div>
    </div>
  );
}
