import {HoverCard} from '@astryxdesign/core/HoverCard';
import {Avatar} from '@astryxdesign/core/Avatar';
import {Text, Heading} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Stack} from '@astryxdesign/core/Stack';
import {HStack} from '@astryxdesign/core/HStack';
import {Divider} from '@astryxdesign/core/Divider';

const members = [
  {name: 'Alice Chen', role: 'Engineering Lead', email: 'alice@example.com', avatar: 'https://i.pravatar.cc/40?u=alice'},
  {name: 'Bob Martinez', role: 'Product Designer', email: 'bob@example.com', avatar: 'https://i.pravatar.cc/40?u=bob'},
  {name: 'Carol Kim', role: 'Frontend Engineer', email: 'carol@example.com', avatar: 'https://i.pravatar.cc/40?u=carol'},
  {name: 'David Patel', role: 'Backend Engineer', email: 'david@example.com', avatar: 'https://i.pravatar.cc/40?u=david'},
];

export default function TeamMembersList() {
  return (
    <Stack gap="md">
      <Heading level={2}>Team Members</Heading>
      <Stack gap="sm">
        {members.map((member) => (
          <HoverCard
            key={member.name}
            content={
              <Stack gap="sm">
                <HStack gap="sm" align="center">
                  <Avatar src={member.avatar} name={member.name} size="lg" />
                  <Stack gap="xs">
                    <Text weight="bold">{member.name}</Text>
                    <Text size="sm" color="secondary">{member.role}</Text>
                  </Stack>
                </HStack>
                <Divider />
                <Text size="sm">{member.email}</Text>
                <Button variant="filled" size="sm">Message</Button>
              </Stack>
            }
          >
            <HStack gap="sm" align="center">
              <Avatar src={member.avatar} name={member.name} size="sm" />
              <Text>{member.name}</Text>
            </HStack>
          </HoverCard>
        ))}
      </Stack>
    </Stack>
  );
}
