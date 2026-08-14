import {HoverCard} from '@astryxdesign/core/HoverCard';
import {Avatar} from '@astryxdesign/core/Avatar';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';

const teamMembers = [
  {name: 'Alice Chen', role: 'Engineering Lead', email: 'alice@company.com', avatar: 'AC'},
  {name: 'Bob Martinez', role: 'Product Designer', email: 'bob@company.com', avatar: 'BM'},
  {name: 'Carol Wu', role: 'Frontend Engineer', email: 'carol@company.com', avatar: 'CW'},
  {name: 'David Park', role: 'Backend Engineer', email: 'david@company.com', avatar: 'DP'},
];

export default function TeamMembersList() {
  return (
    <Card padding={4}>
      <VStack gap={3}>
        <Heading level={3}>Team Members</Heading>
        <VStack gap={2}>
          {teamMembers.map((member) => (
            <HoverCard
              key={member.name}
              trigger={
                <HStack gap={2} align="center">
                  <Avatar name={member.name} size="sm" />
                  <Text>{member.name}</Text>
                </HStack>
              }
            >
              <VStack gap={2}>
                <HStack gap={2} align="center">
                  <Avatar name={member.name} size="lg" />
                  <VStack gap={0.5}>
                    <Heading level={4}>{member.name}</Heading>
                    <Text type="supporting" color="secondary">{member.role}</Text>
                  </VStack>
                </HStack>
                <Text type="supporting">{member.email}</Text>
                <Button size="sm" variant="secondary">Message</Button>
              </VStack>
            </HoverCard>
          ))}
        </VStack>
      </VStack>
    </Card>
  );
}
