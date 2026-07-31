import {Theme} from '@astryxdesign/core/theme';
import {Layout} from '@astryxdesign/core/Layout';
import {LayoutPanel} from '@astryxdesign/core/LayoutPanel';
import {LayoutContent} from '@astryxdesign/core/LayoutContent';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {defineTheme} from '@astryxdesign/core/theme';

const darkSidebarTheme = defineTheme({
  mode: 'dark',
  tokens: {
    '--color-accent': '#6366f1',
  },
});

const lightContentTheme = defineTheme({
  mode: 'light',
  tokens: {
    '--color-accent': '#6366f1',
  },
});

export default function DualThemeLayout() {
  return (
    <Layout height="fill">
      <Theme theme={darkSidebarTheme} mode="dark">
        <LayoutPanel width={260} hasDivider>
          <VStack gap={3} padding={4}>
            <Heading level={4}>Navigation</Heading>
            <VStack gap={1}>
              <Button label="Dashboard" variant="ghost" width="100%" />
              <Button label="Projects" variant="ghost" width="100%" />
              <Button label="Settings" variant="ghost" width="100%" />
              <Button label="Help" variant="ghost" width="100%" />
            </VStack>
          </VStack>
        </LayoutPanel>
      </Theme>
      <Theme theme={lightContentTheme} mode="light">
        <LayoutContent padding={6}>
          <VStack gap={4}>
            <Heading level={1}>Dashboard</Heading>
            <Text>This content area uses a light theme while the sidebar uses a dark theme.</Text>
            <Text color="secondary">
              Each section of the app can have its own theme without affecting the rest.
            </Text>
          </VStack>
        </LayoutContent>
      </Theme>
    </Layout>
  );
}
