import {Card, CardContent} from '@/components/ui/card';
import {Avatar, AvatarImage, AvatarFallback} from '@/components/ui/avatar';
import {Badge} from '@/components/ui/badge';

export default function ProfileCard() {
  return (
    <Card className="w-80">
      <CardContent className="pt-6 flex flex-col items-center gap-3">
        <Avatar className="h-20 w-20">
          <AvatarImage src="https://i.pravatar.cc/150" alt="Jane Smith" />
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="text-xl font-bold">Jane Smith</h2>
          <p className="text-sm text-muted-foreground">Senior Product Designer</p>
        </div>
        <div className="flex gap-1">
          <Badge>Design</Badge>
          <Badge>UX</Badge>
          <Badge>Research</Badge>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Passionate about creating intuitive interfaces that solve real problems.
        </p>
      </CardContent>
    </Card>
  );
}
