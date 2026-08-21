import {useState} from 'react';
import {Checkbox} from '@/components/ui/checkbox';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Label} from '@/components/ui/label';

const termsText = `These Terms of Service govern your use of our platform. By accessing or using the service, you agree to be bound by these terms. We reserve the right to modify these terms at any time. Your continued use of the service after changes constitutes acceptance. Users must be at least 18 years old. You are responsible for maintaining the confidentiality of your account. We may terminate accounts that violate these terms. All content is protected by intellectual property laws. Disputes will be resolved through binding arbitration. This agreement constitutes the entire agreement between you and the company.`;

export default function TermsAcceptance() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>Terms and Conditions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ScrollArea className="h-[200px] rounded-md border p-4">
          <p className="text-sm">{termsText}</p>
        </ScrollArea>
        <div className="flex flex-col gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" checked={termsAccepted} onCheckedChange={(checked) => setTermsAccepted(checked === true)} />
            <Label htmlFor="terms">I agree to the Terms of Service</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="privacy" checked={privacyAccepted} onCheckedChange={(checked) => setPrivacyAccepted(checked === true)} />
            <Label htmlFor="privacy">I agree to the Privacy Policy</Label>
          </div>
        </div>
        <Button disabled={!termsAccepted || !privacyAccepted}>Continue</Button>
      </CardContent>
    </Card>
  );
}
