import React, {useState} from 'react';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

export default function TermsAcceptance() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="max-w-lg mx-auto p-6 space-y-4">
      <Heading level={2}>Terms and Conditions</Heading>

      <div className="max-h-72 overflow-y-auto border border-gray-200 rounded-lg p-4">
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </Text>
      </div>

      <CheckboxInput
        label="I accept the terms and conditions"
        isChecked={accepted}
        onChange={setAccepted}
      />

      <Button isDisabled={!accepted} onPress={() => alert('Accepted!')}>
        Continue
      </Button>
    </div>
  );
}
