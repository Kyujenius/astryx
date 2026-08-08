// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {TextArea} from '@astryxdesign/core/TextArea';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Button} from '@astryxdesign/core/Button';

const TERMS_TEXT = `Terms of Service

1. Acceptance of Terms. By accessing or using this service, you agree to be bound by these terms.

2. User Accounts. You are responsible for maintaining the security of your account credentials.

3. Acceptable Use. You agree not to use the service for any unlawful purpose or to violate any regulations.

4. Intellectual Property. All content and materials available through the service are protected by applicable intellectual property laws.

5. Limitation of Liability. The service is provided "as is" without warranties of any kind.

6. Termination. We reserve the right to terminate or suspend access to the service at any time.

7. Changes to Terms. We may modify these terms at any time. Continued use constitutes acceptance of the modified terms.`;

export default function TermsAcceptance() {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const canSubmit = agreeTerms && agreePrivacy;

  return (
    <Stack gap={4} maxWidth={560}>
      <Heading level={2}>Terms and Conditions</Heading>
      <TextArea
        label="Terms of Service"
        isLabelHidden
        value={TERMS_TEXT}
        onChange={() => {}}
        rows={10}
        isDisabled
      />
      <Stack gap={2}>
        <CheckboxInput
          label="I agree to the Terms of Service"
          value={agreeTerms}
          onChange={setAgreeTerms}
        />
        <CheckboxInput
          label="I agree to the Privacy Policy"
          value={agreePrivacy}
          onChange={setAgreePrivacy}
        />
      </Stack>
      <Button
        label="Accept and continue"
        variant="primary"
        isDisabled={!canSubmit}
      />
    </Stack>
  );
}
