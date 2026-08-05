// Copyright (c) Meta Platforms, Inc. and affiliates.

import {HoverCard} from '@astryxdesign/core/HoverCard';
import {Avatar} from '@astryxdesign/core/Avatar';
import {Button} from '@astryxdesign/core/Button';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';

const members = [
  {name: 'Alice Chen', role: 'Engineering Lead', email: 'alice@example.com', avatar: 'https://i.pravatar.cc/80?u=alice'},
  {name: 'Bob Martinez', role: 'Designer', email: 'bob@example.com', avatar: 'https://i.pravatar.cc/80?u=bob'},
  {name: 'Carol Williams', role: 'Product Manager', email: 'carol@example.com', avatar: 'https://i.pravatar.cc/80?u=carol'},
];

export default function TeamMembers() {
  return (
    <div className="p-4 max-w-md">
      <Heading level={3}>Team Members</Heading>
      <ul className="space-y-2 mt-4">
        {members.map((member) => (
          <li key={member.name}>
            <HoverCard content={
              <div className="flex gap-3 items-center p-2">
                <Avatar src={member.avatar} name={member.name} size="lg" />
                <div className="space-y-1">
                  <Heading level={5}>{member.name}</Heading>
                  <Text>{member.role}</Text>
                  <Text>{member.email}</Text>
                  <Button label="Message" size="sm" onPress={() => {}} />
                </div>
              </div>
            }>
              <Text>{member.name}</Text>
            </HoverCard>
          </li>
        ))}
      </ul>
    </div>
  );
}