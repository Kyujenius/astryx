import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';

export default function PageTitle() {
  return (
    <VStack gap={1}>
      <Heading level={1}>Welcome to the Dashboard</Heading>
      <Text color="secondary" type="large">
        Monitor your key metrics and manage your workspace from one place.
      </Text>
    </VStack>
  );
}
