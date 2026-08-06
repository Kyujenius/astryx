import {useState} from 'react';

export default function TrialExpiryBanner({daysRemaining = 7}: {daysRemaining?: number}) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: '#fff3cd', border: '1px solid #ffc107', borderRadius: 6}}>
      <div><strong>Trial expiring</strong><p style={{margin: '4px 0 0', fontSize: 14}}>Your trial expires in {daysRemaining} day{daysRemaining === 1 ? '' : 's'}.</p></div>
      <div style={{display: 'flex', gap: 8}}>
        <button style={{padding: '6px 12px', backgroundColor: '#0066cc', color: '#fff', border: 'none', borderRadius: 4}}>Upgrade</button>
        <button style={{padding: '6px 12px', border: '1px solid #ccc', borderRadius: 4}} onClick={() => setDismissed(true)}>Dismiss</button>
      </div>
    </div>
  );
}