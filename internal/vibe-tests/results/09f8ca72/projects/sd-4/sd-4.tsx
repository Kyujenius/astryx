import {useState} from 'react';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Button} from '@astryxdesign/core/Button';
import {TextArea} from '@astryxdesign/core/TextArea';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

const TERMS = `Terms and Conditions\n\n1. Acceptance of Terms\nBy accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.\n\n2. Use License\nPermission is granted to temporarily use this service for personal, non-commercial transitory viewing only.\n\n3. Disclaimer\nThe materials on this service are provided on an "as is" basis.\n\n4. Limitations\nIn no event shall we be liable for any damages arising out of the use or inability to use the materials.\n\n5. Revisions\nWe may revise these terms at any time without notice.\n\n6. Governing Law\nThese terms are governed by applicable laws.`;

export default function TermsAcceptance() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="flex flex-col gap-4 p-6 max-w-xl">
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
    </div>
  );
}
