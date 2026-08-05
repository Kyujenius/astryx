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
    <div>
      <Heading level={3}>Team Members</Heading>
      <ul style={{listStyle: 'none', padding: 0}}>
        {members.map((member) => (
          <li key={member.name} style={{padding: '8px 0'}}>
            <HoverCard content={
              <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
                <Avatar src={member.avatar} name={member.name} size="lg" />
                <div>
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