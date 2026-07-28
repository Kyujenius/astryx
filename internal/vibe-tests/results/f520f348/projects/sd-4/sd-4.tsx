// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

const TERMS = `Terms of Service\n\nThese Terms of Service govern your use of the application.\n\n1. Account Registration - You must provide accurate information.\n2. Acceptable Use - You agree not to misuse the services.\n3. Privacy - Our Privacy Policy describes how we handle data.\n4. Termination - We may terminate access for violations.\n5. Disclaimers - Services are provided "as is".\n6. Limitation of Liability - We are not liable for indirect damages.\n7. Governing Law - Governed by applicable law.\n8. Changes - We may update these terms.`;

export default function TermsAcceptance() {
  const [agreeTos, setAgreeTos] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const canContinue = agreeTos && agreePrivacy;

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480}}>
      <h2 style={{fontSize: 24, fontWeight: 600}}>Terms and Conditions</h2>
      <div style={{height: 200, overflow: 'auto', border: '1px solid #e5e7eb', borderRadius: 8, padding: 16}}>
        <p style={{fontSize: 14, color: '#374151', whiteSpace: 'pre-line', margin: 0}}>{TERMS}</p>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
        <label style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 14}}><input type="checkbox" checked={agreeTos} onChange={e => setAgreeTos(e.target.checked)} /> I agree to the Terms of Service</label>
        <label style={{display: 'flex', alignItems: 'center', gap: 8, fontSize: 14}}><input type="checkbox" checked={agreePrivacy} onChange={e => setAgreePrivacy(e.target.checked)} /> I agree to the Privacy Policy</label>
      </div>
      <button disabled={!canContinue} onClick={() => alert('Accepted!')} style={{padding: '10px 20px', background: canContinue ? '#3b82f6' : '#9ca3af', color: 'white', border: 'none', borderRadius: 6, cursor: canContinue ? 'pointer' : 'not-allowed', fontWeight: 500}}>Continue</button>
    </div>
  );
}
