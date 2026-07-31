import {useState} from 'react';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Button} from '@astryxdesign/core/Button';
import {TextArea} from '@astryxdesign/core/TextArea';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

const TERMS = `Terms and Conditions

1. Acceptance of Terms
By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.

2. Use License
Permission is granted to temporarily use this service for personal, non-commercial transitory viewing only.

3. Disclaimer
The materials on this service are provided on an "as is" basis. We make no warranties, expressed or implied.

4. Limitations
In no event shall we be liable for any damages arising out of the use or inability to use the materials on our service.

5. Revisions
We may revise these terms of service at any time without notice.

6. Governing Law
These terms and conditions are governed by and construed in accordance with applicable laws.`;

export default function TermsAcceptance() {
  const [accepted, setAccepted] = useState(false);

  return (
    <VStack gap={4} padding={4} maxWidth={600}>
      <Heading level={2}>Terms and Conditions</Heading>
      <Text color="secondary">Please read and accept the terms below to continue.</Text>
      <TextArea
        label="Terms and Conditions"
        isLabelHidden
        value={TERMS}
        onChange={() => {}}
        rows={12}
        isDisabled
      />
      <CheckboxInput
        label="I have read and agree to the Terms and Conditions"
        value={accepted}
        onChange={setAccepted}
      />
      <Button
        label="Continue"
        variant="primary"
        isDisabled={!accepted}
        onClick={() => alert('Accepted!')}
      />
    </VStack>
  );
}
