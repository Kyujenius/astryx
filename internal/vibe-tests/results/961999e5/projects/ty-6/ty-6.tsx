import {CodeBlock} from '@astryxdesign/core/CodeBlock';
import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';

export default function InstallationExample() {
  return (
    <Stack gap={2}>
      <Text type="label">Installation</Text>
      <CodeBlock
        code="yarn add @astryxdesign/core"
        language="bash"
        hasCopyButton
      />
    </Stack>
  );
}
