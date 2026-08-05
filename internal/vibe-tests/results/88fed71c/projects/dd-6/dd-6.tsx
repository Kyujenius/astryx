// Copyright (c) Meta Platforms, Inc. and affiliates.

"use client";
import {HoverCard, HoverCardContent, HoverCardTrigger} from '@/components/ui/hover-card';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';

const members = [
  {name: 'Alice Chen', role: 'Engineering Lead', email: 'alice@example.com', avatar: 'https://i.pravatar.cc/80?u=alice'},
  {name: 'Bob Martinez', role: 'Designer', email: 'bob@example.com', avatar: 'https://i.pravatar.cc/80?u=bob'},
  {name: 'Carol Williams', role: 'Product Manager', email: 'carol@example.com', avatar: 'https://i.pravatar.cc/80?u=carol'},
];

export default function TeamMembers() {
  return (
    <div className="p-4 max-w-md">
      <h3 className="text-lg font-semibold mb-4">Team Members</h3>
      <ul className="space-y-2">
        {members.map((member) => (
          <li key={member.name}>
            <HoverCard>
              <HoverCardTrigger asChild><span className="cursor-pointer hover:underline">{member.name}</span></HoverCardTrigger>
              <HoverCardContent className="flex gap-3">
                <Avatar><AvatarImage src={member.avatar} /><AvatarFallback>{member.name[0]}</AvatarFallback></Avatar>
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                  <p className="text-sm">{member.email}</p>
                  <Button size="sm" className="mt-2">Message</Button>
                </div>
              </HoverCardContent>
            </HoverCard>
          </li>
        ))}
      </ul>
    </div>
  );
}