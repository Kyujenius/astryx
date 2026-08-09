// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Stack} from '@astryxdesign/core/Stack';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  termsBox: {
    maxHeight: 200,
    overflowY: 'auto',
    padding: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e0e0e0',
    borderRadius: 8,
  },
});

const TERMS_TEXT = `These Terms of Service govern your use of the platform. By accessing or using the service, you agree to be bound by these terms. You must be at least 18 years old to use this service. You are responsible for maintaining the confidentiality of your account credentials. We reserve the right to terminate accounts that violate these terms. Content you post remains your property, but you grant us a license to display it. We may modify these terms at any time with notice. Your continued use after changes constitutes acceptance. We are not liable for any indirect damages arising from your use of the service. These terms shall be governed by the laws of the state of California.`;

export default function TermsAcceptance() {
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);

  const canContinue = agreedTerms && agreedPrivacy;

  return (
    <Stack gap={4} padding={4} maxWidth={500}>
      <Heading level={2}>Terms and Conditions</Heading>
      <div {...stylex.props(styles.termsBox)}>
        <Text type="body">{TERMS_TEXT}</Text>
      </div>
      <Stack gap={2}>
        <CheckboxInput
          label="I agree to the Terms of Service"
          value={agreedTerms}
          onChange={setAgreedTerms}
        />
        <CheckboxInput
          label="I agree to the Privacy Policy"
          value={agreedPrivacy}
          onChange={setAgreedPrivacy}
        />
      </Stack>
      <Button
        label="Continue"
        variant="primary"
        isDisabled={!canContinue}
        onClick={() => alert('Accepted!')}
      />
    </Stack>
  );
}
