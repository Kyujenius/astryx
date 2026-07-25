// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

const TERMS = "Terms of Service\n\n1. Acceptance of Terms: By using...\n2. User Responsibilities...\n3. Intellectual Property...\n4. Limitation of Liability...\n5. Termination...";

export default function TermsAcceptance() {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  return (
    <div style={{maxWidth: 560, margin: '0 auto', padding: 24, fontFamily: 'system-ui'}}>
      <h2>Terms and Conditions</h2>
      <div style={{border: '1px solid #eee', borderRadius: 8, padding: 16, marginTop: 16}}>
        <div style={{height: 200, overflow: 'auto', border: '1px solid #ddd', borderRadius: 4, padding: 12, marginBottom: 16}}>
          <pre style={{whiteSpace: 'pre-wrap', margin: 0, fontSize: 14}}>{TERMS}</pre>
        </div>
        <label style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12}}>
          <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
          I agree to the Terms of Service
        </label>
        <label style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16}}>
          <input type="checkbox" checked={agreePrivacy} onChange={(e) => setAgreePrivacy(e.target.checked)} />
          I agree to the Privacy Policy
        </label>
        <button disabled={!agreeTerms || !agreePrivacy} style={{padding: '10px 20px', background: (!agreeTerms || !agreePrivacy) ? '#ccc' : '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer'}}>Continue</button>
      </div>
    </div>
  );
}
