import {Heading} from '@astryxdesign/core/Text';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';

export default function PageTitle() {
  return (
    <VStack gap={2} padding={4}>
      <Heading level={1}>Welcome to Our Platform</Heading>
      <Text color="secondary" type="large">
        A modern solution for building beautiful, accessible user interfaces with ease.
      </Text>
    </VStack>
  );
}
