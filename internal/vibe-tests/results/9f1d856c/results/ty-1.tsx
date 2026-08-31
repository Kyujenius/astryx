import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';

export default function PageTitle() {
  return (
    <VStack gap={2} padding={4}>
      <Heading level={1}>Welcome to the Dashboard</Heading>
      <Text color="secondary">
        Manage your projects, track progress, and collaborate with your team from one place.
      </Text>
    </VStack>
  );
}
