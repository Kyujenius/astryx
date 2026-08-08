// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

const TERMS = `Terms of Service

1. Acceptance of Terms. By accessing or using this service, you agree to be bound by these terms.
2. User Accounts. You are responsible for maintaining the security of your account credentials.
3. Acceptable Use. You agree not to use the service for any unlawful purpose.
4. Intellectual Property. All content is protected by applicable IP laws.
5. Limitation of Liability. The service is provided "as is" without warranties.
6. Termination. We reserve the right to terminate access at any time.
7. Changes to Terms. We may modify these terms at any time.`;

export default function TermsAcceptance() {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const canSubmit = agreeTerms && agreePrivacy;

  return (
    <div style={{maxWidth: '560px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
      <h2 style={{margin: 0, fontSize: '22px', fontWeight: 600}}>Terms and Conditions</h2>
      <textarea
        value={TERMS}
        readOnly
        rows={10}
        style={{width: '100%', padding: '12px', borderRadius: '4px', border: '1px solid #ccc', resize: 'none', fontFamily: 'inherit', fontSize: '14px'}}
      />
      <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
        <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
          <input type="checkbox" checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)} />
          I agree to the Terms of Service
        </label>
        <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
          <input type="checkbox" checked={agreePrivacy} onChange={e => setAgreePrivacy(e.target.checked)} />
          I agree to the Privacy Policy
        </label>
      </div>
      <button
        disabled={!canSubmit}
        style={{padding: '10px 20px', borderRadius: '4px', background: canSubmit ? '#0066cc' : '#ccc', color: '#fff', border: 'none', cursor: canSubmit ? 'pointer' : 'not-allowed'}}
      >
        Accept and continue
      </button>
    </div>
  );
}
