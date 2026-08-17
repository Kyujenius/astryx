import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';

export default function PageHeader() {
  return (
    <VStack gap={2}>
      <Heading level={1}>Dashboard</Heading>
      <Text color="secondary" size="lg">
        Monitor your key metrics and manage your workspace from here.
      </Text>
    </VStack>
  );
}
