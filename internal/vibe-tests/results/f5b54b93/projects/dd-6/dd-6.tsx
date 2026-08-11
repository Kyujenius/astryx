// Copyright (c) Meta Platforms, Inc. and affiliates.

import {HoverCard, HoverCardContent, HoverCardTrigger} from '@/components/ui/hover-card';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';

interface Member {
  name: string;
  role: string;
  email: string;
  avatar: string;
}

const members: Member[] = [
  {name: 'Alice Chen', role: 'Engineering Lead', email: 'alice@company.com', avatar: 'https://i.pravatar.cc/80?u=alice'},
  {name: 'Bob Park', role: 'Designer', email: 'bob@company.com', avatar: 'https://i.pravatar.cc/80?u=bob'},
  {name: 'Carol Davis', role: 'Product Manager', email: 'carol@company.com', avatar: 'https://i.pravatar.cc/80?u=carol'},
];

export default function TeamMembers() {
  return (
    <div className="space-y-3 p-4">
      <h2 className="text-xl font-bold">Team Members</h2>
      {members.map((member) => (
        <HoverCard key={member.email}>
          <HoverCardTrigger asChild>
            <button className="text-sm font-medium underline-offset-4 hover:underline cursor-pointer">
              {member.name}
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="w-72">
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">{member.name}</h4>
                <p className="text-xs text-muted-foreground">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.email}</p>
                <Button size="sm" className="mt-2">Message</Button>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  );
}
