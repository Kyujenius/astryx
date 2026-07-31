import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Checkbox} from '@/components/ui/checkbox';
import {Textarea} from '@/components/ui/textarea';
import {Label} from '@/components/ui/label';

const TERMS = `Terms and Conditions\n\n1. Acceptance of Terms...\n2. Use License...\n3. Disclaimer...\n4. Limitations...\n5. Revisions...\n6. Governing Law...`;

export default function TermsAcceptance() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="flex flex-col gap-4 p-6 max-w-xl">
      <h2 className="text-2xl font-bold">Terms and Conditions</h2>
      <p className="text-muted-foreground">Please read and accept the terms below to continue.</p>
      <Textarea value={TERMS} readOnly rows={12} className="resize-none" />
      <div className="flex items-center gap-2">
        <Checkbox id="terms" checked={accepted} onCheckedChange={(v) => setAccepted(!!v)} />
        <Label htmlFor="terms">I have read and agree to the Terms and Conditions</Label>
      </div>
      <Button disabled={!accepted} onClick={() => alert('Accepted!')}>Continue</Button>
    </div>
  );
}
