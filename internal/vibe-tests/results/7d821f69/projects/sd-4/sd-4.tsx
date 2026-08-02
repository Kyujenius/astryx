import React, {useState} from 'react';
import {Checkbox} from '@/components/ui/checkbox';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {ScrollArea} from '@/components/ui/scroll-area';

export default function TermsAcceptance() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="max-w-lg mx-auto p-6 space-y-4">
      <h2 className="text-xl font-semibold">Terms and Conditions</h2>

      <ScrollArea className="h-72 border rounded-lg p-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
          dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </ScrollArea>

      <div className="flex items-center space-x-2">
        <Checkbox id="terms" checked={accepted} onCheckedChange={(v) => setAccepted(!!v)} />
        <Label htmlFor="terms">I accept the terms and conditions</Label>
      </div>

      <Button disabled={!accepted}>Continue</Button>
    </div>
  );
}
