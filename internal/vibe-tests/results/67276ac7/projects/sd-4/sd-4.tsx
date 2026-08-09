// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Checkbox} from '@/components/ui/checkbox';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {ScrollArea} from '@/components/ui/scroll-area';

const TERMS = `These Terms of Service govern your use of the platform. By accessing or using the service, you agree to be bound by these terms. You must be at least 18 years old. You are responsible for maintaining the confidentiality of your account credentials. We reserve the right to terminate accounts that violate these terms. Content you post remains your property, but you grant us a license to display it. We may modify these terms at any time with notice. Your continued use after changes constitutes acceptance.`;

export default function TermsAcceptance() {
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);

  return (
    <div className="space-y-4 p-4 max-w-md">
      <h2 className="text-xl font-semibold">Terms and Conditions</h2>
      <ScrollArea className="h-48 rounded-md border p-4">
        <p className="text-sm">{TERMS}</p>
      </ScrollArea>
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" checked={agreedTerms} onCheckedChange={(v) => setAgreedTerms(v === true)} />
          <Label htmlFor="terms">I agree to the Terms of Service</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="privacy" checked={agreedPrivacy} onCheckedChange={(v) => setAgreedPrivacy(v === true)} />
          <Label htmlFor="privacy">I agree to the Privacy Policy</Label>
        </div>
      </div>
      <Button disabled={!(agreedTerms && agreedPrivacy)}>Continue</Button>
    </div>
  );
}
