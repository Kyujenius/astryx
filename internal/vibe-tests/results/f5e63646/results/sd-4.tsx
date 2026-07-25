// Copyright (c) Meta Platforms, Inc. and affiliates.

import {VStack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {TextArea} from '@astryxdesign/core/TextArea';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {useState} from 'react';

const TERMS = "Terms of Service\n\n1. By using this service you agree to comply with all applicable laws.\n2. We reserve the right to modify these terms at any time.\n3. Your use of the service constitutes acceptance.\n4. Limitation of liability applies to all damages.\n5. These terms are governed by applicable law.";

export default function TermsAcceptance() {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  return (
    <div className="max-w-lg mx-auto p-6">
      <VStack gap={4}>
        <Heading level={2}>Terms and Conditions</Heading>
        <Card>
          <VStack gap={4}>
            <TextArea label="Terms of Service" value={TERMS} onChange={() => {}} isDisabled rows={8} />
            <CheckboxInput label="I agree to the Terms of Service" value={agreeTerms} onChange={setAgreeTerms} />
            <CheckboxInput label="I agree to the Privacy Policy" value={agreePrivacy} onChange={setAgreePrivacy} />
            <Button label="Continue" variant="primary" isDisabled={!agreeTerms || !agreePrivacy} />
          </VStack>
        </Card>
      </VStack>
    </div>
  );
}
