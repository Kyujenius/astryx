import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

export default function PageHeader() {
  return (
    <div className="space-y-2">
      <Heading level={1}>Dashboard</Heading>
      <Text color="secondary" size="lg">
        Monitor your key metrics and manage your workspace from here.
      </Text>
    </div>
  );
}
