import {HoverCard, HoverCardContent, HoverCardTrigger} from '@/components/ui/hover-card';
import {Avatar, AvatarFallback} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

const team = [
  {name: 'Alice Chen', role: 'Engineering Lead', email: 'alice@co.com', initials: 'AC'},
  {name: 'Bob Martinez', role: 'Product Designer', email: 'bob@co.com', initials: 'BM'},
  {name: 'Carol Wu', role: 'Frontend Engineer', email: 'carol@co.com', initials: 'CW'},
  {name: 'David Park', role: 'Backend Engineer', email: 'david@co.com', initials: 'DP'},
];

export default function TeamMembersList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {team.map((m) => (
            <HoverCard key={m.name}>
              <HoverCardTrigger asChild>
                <div className="flex items-center gap-3 p-2 rounded-md cursor-pointer hover:bg-accent">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{m.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{m.name}</span>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-64">
                <div className="flex gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>{m.initials}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.role}</p>
                    <p className="text-xs text-muted-foreground">{m.email}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="mt-3 w-full">Message</Button>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
