import {useState} from 'react';

interface TrialBannerProps {
  daysRemaining: number;
  onUpgrade: () => void;
}

export default function TrialExpirationBanner({daysRemaining, onUpgrade}: TrialBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#fff3cd', border: '1px solid #ffc107', borderRadius: 8}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
        <span style={{fontSize: 20}}>⚠️</span>
        <div>
          <strong>Your trial expires in {daysRemaining} day{daysRemaining === 1 ? '' : 's'}</strong>
          <p style={{margin: 0, fontSize: 14, color: '#666'}}>Upgrade now to keep access to all features.</p>
        </div>
      </div>
      <div style={{display: 'flex', gap: 8}}>
        <button onClick={onUpgrade} style={{padding: '6px 16px', background: '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 600}}>Upgrade</button>
        <button onClick={() => setDismissed(true)} style={{padding: '6px 8px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 18}}>×</button>
      </div>
    </div>
  );
}
