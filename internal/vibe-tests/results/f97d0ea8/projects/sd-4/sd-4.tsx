// Copyright (c) Meta Platforms, Inc. and affiliates.

import {VStack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {TextArea} from '@astryxdesign/core/TextArea';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {useState} from 'react';

const TERMS = `Terms of Service

1. Acceptance of Terms
By accessing this application, you agree to these terms...

2. User Responsibilities
You agree to use the service in compliance with applicable laws...

3. Intellectual Property
All content remains the property of the company...

4. Limitation of Liability
In no event shall the company be liable for indirect damages...

5. Termination
We may terminate access at any time for violations...`;

export default function TermsAcceptanceForm() {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const canContinue = agreeTerms && agreePrivacy;

  return (
    <VStack gap={4} padding={4} maxWidth={560}>
      <Heading level={2}>Terms and Conditions</Heading>
      <Card>
        <VStack gap={4}>
          <TextArea
            label="Terms of Service"
            value={TERMS}
            onChange={() => {}}
            isDisabled
            rows={10}
          />
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
          <Button
            label="Continue"
            variant="primary"
            isDisabled={!canContinue}
          />
        </VStack>
      </Card>
    </VStack>
  );
}
