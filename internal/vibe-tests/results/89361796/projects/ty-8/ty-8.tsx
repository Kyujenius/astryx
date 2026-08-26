import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Text';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Avatar} from '@astryxdesign/core/Avatar';
import {Badge} from '@astryxdesign/core/Badge';

export default function ProfileCard() {
  return (
    <Card padding={4}>
      <VStack gap={3} align="center">
        <Avatar
          src="https://i.pravatar.cc/150"
          name="Jane Smith"
          size="xl"
        />
        <VStack gap={0} align="center">
          <Heading level={2}>Jane Smith</Heading>
          <Text color="secondary">Senior Product Designer</Text>
        </VStack>
        <HStack gap={1}>
          <Badge>Design</Badge>
          <Badge>UX</Badge>
          <Badge>Research</Badge>
        </HStack>
        <Text align="center" color="secondary">
          Passionate about creating intuitive interfaces that delight users and solve real problems.
        </Text>
      </VStack>
    </Card>
  );
}
