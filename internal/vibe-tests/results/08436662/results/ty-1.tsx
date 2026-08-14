import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';

export default function PageTitle() {
  return (
    <div className="py-8 px-4">
      <VStack gap={1}>
        <Heading level={1}>Welcome to the Dashboard</Heading>
        <Text color="secondary" type="large">
          Track your progress and manage everything in one place.
        </Text>
      </VStack>
    </div>
  );
}
