// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Stack} from '@astryxdesign/core/Stack';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

const TERMS = `These Terms of Service govern your use of the platform. By accessing or using the service, you agree to be bound by these terms. You must be at least 18 years old. You are responsible for maintaining confidentiality of your credentials. We reserve the right to terminate accounts that violate these terms. Content you post remains your property but you grant us a license. We may modify these terms at any time with notice.`;

export default function TermsAcceptance() {
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);

  return (
    <Stack gap={4} padding={4} maxWidth={500}>
      <Heading level={2}>Terms and Conditions</Heading>
      <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-4">
        <Text>{TERMS}</Text>
      </div>
      <Stack gap={2}>
        <CheckboxInput label="I agree to the Terms of Service" value={agreedTerms} onChange={setAgreedTerms} />
        <CheckboxInput label="I agree to the Privacy Policy" value={agreedPrivacy} onChange={setAgreedPrivacy} />
      </Stack>
      <Button label="Continue" variant="primary" isDisabled={!(agreedTerms && agreedPrivacy)} onClick={() => alert('Accepted!')} />
    </Stack>
  );
}
