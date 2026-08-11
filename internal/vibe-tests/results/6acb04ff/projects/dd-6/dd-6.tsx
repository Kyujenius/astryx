// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Stack} from '@astryxdesign/core/Stack';
import {HoverCard} from '@astryxdesign/core/HoverCard';
import {Avatar} from '@astryxdesign/core/Avatar';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';

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
    <Stack gap={3}>
      <Heading level={2}>Team Members</Heading>
      {members.map((member) => (
        <HoverCard
          key={member.email}
          content={
            <Stack gap={3} padding={3}>
              <Stack direction="horizontal" gap={3}>
                <Avatar src={member.avatar} label={member.name} size="lg" />
                <Stack gap={1}>
                  <Text weight="semibold">{member.name}</Text>
                  <Text type="supporting">{member.role}</Text>
                  <Text type="supporting">{member.email}</Text>
                </Stack>
              </Stack>
              <Button label="Message" variant="primary" />
            </Stack>
          }
        >
          <Text weight="medium">{member.name}</Text>
        </HoverCard>
      ))}
    </Stack>
  );
}
