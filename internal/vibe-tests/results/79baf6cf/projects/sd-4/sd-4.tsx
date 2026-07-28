// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Button} from '@astryxdesign/core/Button';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  scrollArea: {
    height: 200,
    overflow: 'auto',
    border: '1px solid #e5e7eb',
    borderRadius: 8,
    padding: 16,
  },
});

const TERMS = `Terms of Service\n\nThese Terms of Service govern your use of the application. By accessing or using our services, you agree to be bound by these terms.\n\n1. Account Registration\nYou must provide accurate information when creating an account.\n\n2. Acceptable Use\nYou agree not to misuse the services or help anyone else do so.\n\n3. Privacy\nOur Privacy Policy describes how we handle personal data.\n\n4. Termination\nWe may terminate your access if you violate these terms.\n\n5. Disclaimers\nServices are provided "as is" without warranty.\n\n6. Limitation of Liability\nWe are not liable for indirect damages.\n\n7. Governing Law\nThese terms are governed by applicable law.\n\n8. Changes\nWe may update these terms. Continued use constitutes acceptance.`;

export default function TermsAcceptance() {
  const [agreeTos, setAgreeTos] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const canContinue = agreeTos && agreePrivacy;

  return (
    <VStack gap={4} maxWidth={520}>
      <Heading level={2}>Terms and Conditions</Heading>
      <div {...stylex.props(styles.scrollArea)}>
        <Text as="p" display="block">{TERMS}</Text>
      </div>
      <VStack gap={2}>
        <CheckboxInput
          label="I agree to the Terms of Service"
          value={agreeTos}
          onChange={setAgreeTos}
        />
        <CheckboxInput
          label="I agree to the Privacy Policy"
          value={agreePrivacy}
          onChange={setAgreePrivacy}
        />
      </VStack>
      <Button
        label="Continue"
        variant="primary"
        isDisabled={!canContinue}
        onClick={() => alert('Accepted!')}
      />
    </VStack>
  );
}
