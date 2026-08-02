import React, {useState} from 'react';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

export default function TermsAcceptance() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div>
      <Heading level={2}>Terms and Conditions</Heading>

      <div style={{maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '16px', borderRadius: '8px', marginBottom: '16px'}}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
        </Text>
      </div>

      <CheckboxInput
        label="I accept the terms and conditions"
        isChecked={accepted}
        onChange={setAccepted}
      />

      <div style={{marginTop: '16px'}}>
        <Button isDisabled={!accepted} onPress={() => alert('Accepted!')}>
          Continue
        </Button>
      </div>
    </div>
  );
}
