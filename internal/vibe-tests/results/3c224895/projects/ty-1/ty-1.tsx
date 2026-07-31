import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';

export default function PageHeader() {
  return (
    <VStack gap={2} padding={4}>
      <Heading level={1}>Welcome to Our Platform</Heading>
      <Text type="large" color="secondary">
        Build beautiful, accessible interfaces with a comprehensive design system
        that scales from small projects to enterprise applications.
      </Text>
    </VStack>
  );
}
