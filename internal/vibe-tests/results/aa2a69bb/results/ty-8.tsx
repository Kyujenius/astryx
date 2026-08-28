import {Card, CardContent} from '@/components/ui/card';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Separator} from '@/components/ui/separator';

export default function ProfileCard() {
  return (
    <Card className="w-[360px]">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/avatar.jpg" alt="Sarah Chen" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">Sarah Chen</h2>
            <p className="text-sm text-primary font-medium">Senior Engineer</p>
          </div>
        </div>
        <Separator />
        <p className="text-muted-foreground">
          Passionate about accessible, performant UI. Previously at Stripe and Vercel. Loves hiking and baking.
        </p>
        <p className="text-xs text-muted-foreground">Joined March 2024</p>
      </CardContent>
    </Card>
  );
}
