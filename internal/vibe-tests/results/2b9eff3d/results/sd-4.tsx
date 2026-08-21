import {useState} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';

const termsText = `These Terms of Service govern your use of our platform. By accessing or using the service, you agree to be bound by these terms. We reserve the right to modify these terms at any time. Your continued use of the service after changes constitutes acceptance. Users must be at least 18 years old. You are responsible for maintaining the confidentiality of your account. We may terminate accounts that violate these terms. All content is protected by intellectual property laws. Disputes will be resolved through binding arbitration. This agreement constitutes the entire agreement between you and the company.`;

export default function TermsAcceptance() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const canContinue = termsAccepted && privacyAccepted;

  return (
    <Card padding={4} maxWidth={600}>
      <VStack gap={4}>
        <Heading level={2}>Terms and Conditions</Heading>
        <div style={{maxHeight: '200px', overflow: 'auto', border: '1px solid var(--color-border-default)', borderRadius: '8px', padding: '16px'}} tabIndex={0} role="region" aria-label="Terms and conditions text">
          <Text>{termsText}</Text>
        </div>
        <VStack gap={2}>
          <CheckboxInput
            label="I agree to the Terms of Service"
            value={termsAccepted}
            onChange={setTermsAccepted}
          />
          <CheckboxInput
            label="I agree to the Privacy Policy"
            value={privacyAccepted}
            onChange={setPrivacyAccepted}
          />
        </VStack>
        <Button
          label="Continue"
          variant="primary"
          isDisabled={!canContinue}
          onClick={() => alert('Accepted!')}
        />
      </VStack>
    </Card>
  );
}
