// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

const TERMS = `These Terms of Service govern your use of the platform. By accessing or using the service, you agree to be bound by these terms. You must be at least 18 years old. You are responsible for maintaining the confidentiality of your account credentials. We reserve the right to terminate accounts that violate these terms. Content you post remains your property but you grant us a license to display it. We may modify these terms at any time with notice.`;

export default function TermsAcceptance() {
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const canContinue = agreedTerms && agreedPrivacy;

  return (
    <div style={{padding: 16, maxWidth: 500, fontFamily: 'system-ui'}}>
      <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 12}}>Terms and Conditions</h2>
      <div style={{maxHeight: 200, overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: 8, padding: 16, marginBottom: 16}}>
        <p style={{fontSize: 14, lineHeight: 1.6}}>{TERMS}</p>
      </div>
      <div style={{marginBottom: 16}}>
        <label style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer'}}>
          <input type="checkbox" checked={agreedTerms} onChange={(e) => setAgreedTerms(e.target.checked)} />
          I agree to the Terms of Service
        </label>
        <label style={{display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer'}}>
          <input type="checkbox" checked={agreedPrivacy} onChange={(e) => setAgreedPrivacy(e.target.checked)} />
          I agree to the Privacy Policy
        </label>
      </div>
      <button disabled={!canContinue} style={{padding: '8px 16px', backgroundColor: canContinue ? '#0066cc' : '#ccc', color: '#fff', border: 'none', borderRadius: 4, cursor: canContinue ? 'pointer' : 'not-allowed'}}>
        Continue
      </button>
    </div>
  );
}
