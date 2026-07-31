import {useState} from 'react';

const TERMS = `Terms and Conditions\n\n1. Acceptance of Terms\nBy accessing this service, you agree to be bound by these terms.\n\n2. Use License\nPermission is granted for personal, non-commercial use.\n\n3. Disclaimer\nMaterials are provided "as is".\n\n4. Limitations\nWe shall not be liable for any damages.\n\n5. Revisions\nWe may revise these terms at any time.\n\n6. Governing Law\nGoverned by applicable laws.`;

export default function TermsAcceptance() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 16, padding: 24, maxWidth: 560}}>
      <h2 style={{margin: 0}}>Terms and Conditions</h2>
      <p style={{color: '#666', margin: 0}}>Please read and accept the terms below to continue.</p>
      <textarea value={TERMS} readOnly rows={12} style={{width: '100%', padding: 12, border: '1px solid #ccc', borderRadius: 6, resize: 'none', fontFamily: 'inherit'}} />
      <label style={{display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer'}}>
        <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
        I have read and agree to the Terms and Conditions
      </label>
      <button disabled={!accepted} onClick={() => alert('Accepted!')} style={{padding: '10px 20px', background: accepted ? '#0066cc' : '#ccc', color: 'white', border: 'none', borderRadius: 6, cursor: accepted ? 'pointer' : 'not-allowed'}}>Continue</button>
    </div>
  );
}
