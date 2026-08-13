import {Card, CardContent} from '@/components/ui/card';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';

export default function ProfileCard() {
  return (
    <Card className="w-[360px]">
      <CardContent className="p-4 flex gap-3 items-start">
        <Avatar>
          <AvatarFallback>JC</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold">Jane Cooper</h3>
          <p className="text-sm font-medium text-blue-600">Senior Engineer</p>
          <p className="text-sm text-muted-foreground">
            Building design systems and developer tooling. Passionate about
            accessibility and component architecture.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
