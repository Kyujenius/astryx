import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

export default function PageHeader() {
  return (
    <div className="flex flex-col gap-2 p-6">
      <Heading level={1}>Welcome to Our Platform</Heading>
      <Text type="large" color="secondary">
        Build beautiful, accessible interfaces with a comprehensive design system
        that scales from small projects to enterprise applications.
      </Text>
    </div>
  );
}
