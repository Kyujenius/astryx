// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Heading} from '@astryxdesign/core/Heading';
import {TextArea} from '@astryxdesign/core/TextArea';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Button} from '@astryxdesign/core/Button';

const TERMS_TEXT = `Terms of Service

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

  return (
    <div className="max-w-lg flex flex-col gap-4">
      <Heading level={2}>Terms and Conditions</Heading>
      <TextArea
        label="Terms of Service"
        isLabelHidden
        value={TERMS_TEXT}
        onChange={() => {}}
        rows={10}
        isDisabled
      />
      <div className="flex flex-col gap-2">
        <CheckboxInput label="I agree to the Terms of Service" value={agreeTerms} onChange={setAgreeTerms} />
        <CheckboxInput label="I agree to the Privacy Policy" value={agreePrivacy} onChange={setAgreePrivacy} />
      </div>
      <Button label="Accept and continue" variant="primary" isDisabled={!agreeTerms || !agreePrivacy} />
    </div>
  );
}
