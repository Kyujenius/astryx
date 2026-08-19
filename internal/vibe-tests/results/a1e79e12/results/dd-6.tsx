import {Avatar, AvatarFallback, AvatarImage} from './components/ui/avatar';
import {Button} from './components/ui/button';
import {HoverCard, HoverCardContent, HoverCardTrigger} from './components/ui/hover-card';
import {Separator} from './components/ui/separator';

const members = [
  {name: 'Alice Chen', role: 'Engineering Lead', email: 'alice@example.com', avatar: 'https://i.pravatar.cc/40?u=alice'},
  {name: 'Bob Martinez', role: 'Product Designer', email: 'bob@example.com', avatar: 'https://i.pravatar.cc/40?u=bob'},
  {name: 'Carol Kim', role: 'Frontend Engineer', email: 'carol@example.com', avatar: 'https://i.pravatar.cc/40?u=carol'},
  {name: 'David Patel', role: 'Backend Engineer', email: 'david@example.com', avatar: 'https://i.pravatar.cc/40?u=david'},
];

export default function TeamMembersList() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Team Members</h2>
      <div className="space-y-2">
        {members.map((member) => (
          <HoverCard key={member.name}>
            <HoverCardTrigger asChild>
              <button className="flex items-center gap-3 p-2 rounded-md hover:bg-accent w-full text-left">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <span>{member.name}</span>
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-64">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <Separator />
                <p className="text-sm">{member.email}</p>
                <Button size="sm">Message</Button>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
}
