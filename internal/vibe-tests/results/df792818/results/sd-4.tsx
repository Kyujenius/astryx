// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Checkbox} from '@/components/ui/checkbox';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';

const TERMS = `Terms of Service

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
    <div className="max-w-lg space-y-4">
      <h2 className="text-2xl font-semibold">Terms and Conditions</h2>
      <Textarea value={TERMS} readOnly rows={10} className="resize-none" />
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" checked={agreeTerms} onCheckedChange={(c) => setAgreeTerms(!!c)} />
          <Label htmlFor="terms">I agree to the Terms of Service</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="privacy" checked={agreePrivacy} onCheckedChange={(c) => setAgreePrivacy(!!c)} />
          <Label htmlFor="privacy">I agree to the Privacy Policy</Label>
        </div>
      </div>
      <Button disabled={!agreeTerms || !agreePrivacy}>Accept and continue</Button>
    </div>
  );
}
