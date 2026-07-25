// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Button} from '@/components/ui/button';
import {Checkbox} from '@/components/ui/checkbox';
import {Label} from '@/components/ui/label';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {ScrollArea} from '@/components/ui/scroll-area';
import {useState} from 'react';

const TERMS = "Terms of Service\n\n1. Acceptance...\n2. User Responsibilities...\n3. IP...\n4. Liability...\n5. Termination...\n\n(Full legal text would go here. Scroll to read all terms before accepting.)";

export default function TermsAcceptance() {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader><CardTitle>Terms and Conditions</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-48 border rounded p-3">
          <pre className="text-sm whitespace-pre-wrap">{TERMS}</pre>
        </ScrollArea>
        <div className="flex items-center gap-2">
          <Checkbox id="terms" checked={agreeTerms} onCheckedChange={(c) => setAgreeTerms(!!c)} />
          <Label htmlFor="terms">I agree to the Terms of Service</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="privacy" checked={agreePrivacy} onCheckedChange={(c) => setAgreePrivacy(!!c)} />
          <Label htmlFor="privacy">I agree to the Privacy Policy</Label>
        </div>
        <Button className="w-full" disabled={!agreeTerms || !agreePrivacy}>Continue</Button>
      </CardContent>
    </Card>
  );
}
