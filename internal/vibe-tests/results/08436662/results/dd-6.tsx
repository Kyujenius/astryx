import {HoverCard} from '@astryxdesign/core/HoverCard';
import {Avatar} from '@astryxdesign/core/Avatar';
import {VStack} from '@astryxdesign/core/VStack';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';

const team = [
  {name: 'Alice Chen', role: 'Engineering Lead', email: 'alice@co.com'},
  {name: 'Bob Martinez', role: 'Product Designer', email: 'bob@co.com'},
  {name: 'Carol Wu', role: 'Frontend Engineer', email: 'carol@co.com'},
  {name: 'David Park', role: 'Backend Engineer', email: 'david@co.com'},
];

export default function TeamMembersList() {
  return (
    <Card padding={4}>
      <VStack gap={3}>
        <Heading level={3}>Team Members</Heading>
        <ul className="divide-y">
          {team.map((m) => (
            <li key={m.name} className="py-2">
              <HoverCard
                trigger={
                  <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded px-2 py-1 transition-colors">
                    <Avatar name={m.name} size="sm" />
                    <Text>{m.name}</Text>
                  </div>
                }
              >
                <VStack gap={2}>
                  <div className="flex items-center gap-3">
                    <Avatar name={m.name} size="lg" />
                    <VStack gap={0.5}>
                      <Heading level={4}>{m.name}</Heading>
                      <Text type="supporting" color="secondary">{m.role}</Text>
                    </VStack>
                  </div>
                  <Text type="supporting">{m.email}</Text>
                  <Button size="sm" variant="secondary">Message</Button>
                </VStack>
              </HoverCard>
            </li>
          ))}
        </ul>
      </VStack>
    </Card>
  );
}
