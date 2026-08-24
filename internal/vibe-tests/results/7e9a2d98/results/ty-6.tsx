import {Text} from '@astryxdesign/core/Text';
import {Code} from '@astryxdesign/core/Code';
import {VStack} from '@astryxdesign/core/VStack';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    padding: '24px',
  },
  codeBlock: {
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: 'var(--surface-raised)',
    fontFamily: 'monospace',
  },
});

export default function InstallationExample() {
  return (
    <div {...stylex.props(styles.container)}>
      <VStack gap="sm">
        <Text weight="semibold">Installation</Text>
        <div {...stylex.props(styles.codeBlock)}>
          <Code>yarn add @astryxdesign/core</Code>
        </div>
        <Text size="sm" color="secondary">
          Copy this command to install the Astryx design system in your project.
        </Text>
      </VStack>
    </div>
  );
}
