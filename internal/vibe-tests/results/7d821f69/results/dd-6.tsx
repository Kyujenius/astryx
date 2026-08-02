import React from 'react';
import {HoverCard, HoverCardContent, HoverCardTrigger} from '@/components/ui/hover-card';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

const members = [
  {name: 'Alice Chen', role: 'Engineering Manager', email: 'alice@example.com', avatar: 'https://i.pravatar.cc/150?u=alice'},
  {name: 'Bob Smith', role: 'Senior Developer', email: 'bob@example.com', avatar: 'https://i.pravatar.cc/150?u=bob'},
  {name: 'Carol Davis', role: 'Designer', email: 'carol@example.com', avatar: 'https://i.pravatar.cc/150?u=carol'},
  {name: 'Dan Wilson', role: 'Product Manager', email: 'dan@example.com', avatar: 'https://i.pravatar.cc/150?u=dan'},
];

export default function TeamMembersList() {
  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Team Members</h2>
      <ul className="space-y-3">
        {members.map((member) => (
          <li key={member.name}>
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="cursor-pointer hover:underline">{member.name}</span>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="flex gap-3 items-center">
                  <Avatar>
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                    <p className="text-sm">{member.email}</p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </li>
        ))}
      </ul>
    </div>
  );
}
