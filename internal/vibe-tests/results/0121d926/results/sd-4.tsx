// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Checkbox} from '@/components/ui/checkbox';
import {ScrollArea} from '@/components/ui/scroll-area';

const TERMS = `Terms of Service\n\nThese Terms of Service govern your use of the application. By accessing or using our services, you agree to be bound by these terms.\n\n1. Account Registration\nYou must provide accurate information when creating an account.\n\n2. Acceptable Use\nYou agree not to misuse the services.\n\n3. Privacy\nOur Privacy Policy describes how we handle personal data.\n\n4. Termination\nWe may terminate your access if you violate these terms.\n\n5. Disclaimers\nServices are provided "as is" without warranty.\n\n6. Limitation of Liability\nWe are not liable for indirect damages.\n\n7. Governing Law\nThese terms are governed by applicable law.\n\n8. Changes\nWe may update these terms.`;

export default function TermsAcceptance() {
  const [agreeTos, setAgreeTos] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  return (
    <div className="flex flex-col gap-4 max-w-lg">
      <h2 className="text-2xl font-semibold">Terms and Conditions</h2>
      <ScrollArea className="h-52 rounded-md border p-4">
        <p className="text-sm text-muted-foreground whitespace-pre-line">{TERMS}</p>
      </ScrollArea>
      <div className="flex flex-col gap-3">
        <label className="flex items-center gap-2">
          <Checkbox checked={agreeTos} onCheckedChange={(c) => setAgreeTos(!!c)} />
          <span className="text-sm">I agree to the Terms of Service</span>
        </label>
        <label className="flex items-center gap-2">
          <Checkbox checked={agreePrivacy} onCheckedChange={(c) => setAgreePrivacy(!!c)} />
          <span className="text-sm">I agree to the Privacy Policy</span>
        </label>
      </div>
      <Button disabled={!agreeTos || !agreePrivacy} onClick={() => alert('Accepted!')}>Continue</Button>
    </div>
  );
}
