import {useState} from 'react';

interface TrialBannerProps {
  daysRemaining: number;
  onUpgrade: () => void;
}

export default function TrialBanner({daysRemaining, onUpgrade}: TrialBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 16px',
      backgroundColor: '#fff3cd',
      border: '1px solid #ffc107',
      borderRadius: 8,
    }}>
      <div>
        <strong>Trial expiring soon</strong>
        <p style={{margin: '4px 0 0', fontSize: 14}}>
          Your trial expires in {daysRemaining} day{daysRemaining === 1 ? '' : 's'}.
        </p>
      </div>
      <div style={{display: 'flex', gap: 8}}>
        <button
          onClick={onUpgrade}
          style={{padding: '8px 16px', backgroundColor: '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer'}}
        >
          Upgrade
        </button>
        <button
          onClick={() => setDismissed(true)}
          style={{padding: '8px 12px', backgroundColor: 'transparent', border: '1px solid #ccc', borderRadius: 4, cursor: 'pointer'}}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
