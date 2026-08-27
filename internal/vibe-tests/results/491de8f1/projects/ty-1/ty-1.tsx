import {Heading} from '@astryxdesign/core/Text';
import {Text} from '@astryxdesign/core/Text';

export default function PageTitle() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <Heading level={1}>Welcome to Our Platform</Heading>
      <Text color="secondary" type="large">
        A modern solution for building beautiful, accessible user interfaces with ease.
      </Text>
    </div>
  );
}
