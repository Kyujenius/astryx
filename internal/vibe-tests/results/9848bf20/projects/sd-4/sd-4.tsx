import {useState} from 'react';

const termsText = `These Terms of Service govern your use of our platform. By accessing or using the service, you agree to be bound by these terms. We reserve the right to modify these terms at any time. Your continued use of the service after changes constitutes acceptance. Users must be at least 18 years old. You are responsible for maintaining the confidentiality of your account. We may terminate accounts that violate these terms. All content is protected by intellectual property laws. Disputes will be resolved through binding arbitration. This agreement constitutes the entire agreement between you and the company.`;

export default function TermsAcceptance() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  return (
    <div style={{padding: '24px', maxWidth: '500px', fontFamily: 'system-ui'}}>
      <h2 style={{marginBottom: '16px'}}>Terms and Conditions</h2>
      <div style={{maxHeight: '200px', overflow: 'auto', border: '1px solid #ccc', borderRadius: '8px', padding: '16px', marginBottom: '16px'}} tabIndex={0} role="region" aria-label="Terms and conditions">
        <p style={{fontSize: '14px', lineHeight: 1.6}}>{termsText}</p>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px'}}>
        <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
          <input type="checkbox" checked={termsAccepted} onChange={e => setTermsAccepted(e.target.checked)} />
          I agree to the Terms of Service
        </label>
        <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
          <input type="checkbox" checked={privacyAccepted} onChange={e => setPrivacyAccepted(e.target.checked)} />
          I agree to the Privacy Policy
        </label>
      </div>
      <button disabled={!termsAccepted || !privacyAccepted} style={{padding: '10px 20px', background: termsAccepted && privacyAccepted ? '#0066cc' : '#ccc', color: 'white', border: 'none', borderRadius: '6px', cursor: termsAccepted && privacyAccepted ? 'pointer' : 'not-allowed'}}>Continue</button>
    </div>
  );
}
