import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {Avatar} from '@astryxdesign/core/Avatar';
import {HStack} from '@astryxdesign/core/HStack';
import {Divider} from '@astryxdesign/core/Divider';

export default function ProfileCard() {
  return (
    <Card width={360} padding={4}>
      <Stack gap={3}>
        <HStack gap={3} align="center">
          <Avatar name="Sarah Chen" size="lg" />
          <Stack gap={0.5}>
            <Heading level={2}>Sarah Chen</Heading>
            <Text type="label" color="accent">Senior Engineer</Text>
          </Stack>
        </HStack>
        <Divider />
        <Text color="secondary">
          Passionate about building accessible, performant UI systems. Previously at Stripe and Vercel. Loves hiking and sourdough baking.
        </Text>
        <Text type="supporting" color="secondary">
          Joined March 2024
        </Text>
      </Stack>
    </Card>
  );
}
