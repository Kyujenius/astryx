import React from 'react';
import {HoverCard} from '@astryxdesign/core/HoverCard';
import {Avatar} from '@astryxdesign/core/Avatar';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';
import {List} from '@astryxdesign/core/List';

const members = [
  {name: 'Alice Chen', role: 'Engineering Manager', email: 'alice@example.com', avatar: 'https://i.pravatar.cc/150?u=alice'},
  {name: 'Bob Smith', role: 'Senior Developer', email: 'bob@example.com', avatar: 'https://i.pravatar.cc/150?u=bob'},
  {name: 'Carol Davis', role: 'Designer', email: 'carol@example.com', avatar: 'https://i.pravatar.cc/150?u=carol'},
  {name: 'Dan Wilson', role: 'Product Manager', email: 'dan@example.com', avatar: 'https://i.pravatar.cc/150?u=dan'},
];

export default function TeamMembersList() {
  return (
    <div className="max-w-md mx-auto p-6">
      <Heading level={2}>Team Members</Heading>
      <List>
        {members.map((member) => (
          <HoverCard
            key={member.name}
            trigger={
              <span className="cursor-pointer hover:underline">
                <Text>{member.name}</Text>
              </span>
            }
          >
            <div className="flex gap-3 items-center p-2">
              <Avatar src={member.avatar} label={member.name} />
              <div>
                <Text><strong>{member.name}</strong></Text>
                <Text>{member.role}</Text>
                <Text>{member.email}</Text>
              </div>
            </div>
          </HoverCard>
        ))}
      </List>
    </div>
  );
}
