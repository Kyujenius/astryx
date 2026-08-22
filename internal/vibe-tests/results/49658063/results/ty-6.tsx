import {CodeBlock} from '@astryxdesign/core/CodeBlock';
import {Text} from '@astryxdesign/core/Text';

export default function InstallationExample() {
  return (
    <div className="flex flex-col gap-2">
      <Text type="label">Installation</Text>
      <CodeBlock
        code="yarn add @astryxdesign/core"
        language="bash"
        hasCopyButton
      />
    </div>
  );
}
