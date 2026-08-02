import React, {useState} from 'react';

export default function TermsAcceptance() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div style={{maxWidth: '500px', margin: '0 auto', padding: '24px'}}>
      <h2 style={{marginBottom: '16px'}}>Terms and Conditions</h2>
      <div style={{maxHeight: '300px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '8px', padding: '16px', marginBottom: '16px'}}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </div>
      <label style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', cursor: 'pointer'}}>
        <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
        I accept the terms and conditions
      </label>
      <button disabled={!accepted} style={{padding: '10px 20px', backgroundColor: accepted ? '#3b82f6' : '#9ca3af', color: '#fff', border: 'none', borderRadius: '6px', cursor: accepted ? 'pointer' : 'not-allowed'}}>
        Continue
      </button>
    </div>
  );
}
