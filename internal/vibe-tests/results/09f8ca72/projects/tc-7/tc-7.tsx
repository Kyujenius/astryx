import {Theme} from '@astryxdesign/core/theme';
import {Layout} from '@astryxdesign/core/Layout';
import {LayoutPanel} from '@astryxdesign/core/LayoutPanel';
import {LayoutContent} from '@astryxdesign/core/LayoutContent';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {defineTheme} from '@astryxdesign/core/theme';

const darkSidebarTheme = defineTheme({
  mode: 'dark',
  tokens: { '--color-accent': '#6366f1' },
});

const lightContentTheme = defineTheme({
  mode: 'light',
  tokens: { '--color-accent': '#6366f1' },
});

export default function DualThemeLayout() {
  return (
    <Layout height="fill">
      <Theme theme={darkSidebarTheme} mode="dark">
        <LayoutPanel width={260} hasDivider>
          <div className="flex flex-col gap-3 p-4">
            <Heading level={4}>Navigation</Heading>
            <div className="flex flex-col gap-1">
              <Button label="Dashboard" variant="ghost" width="100%" />
              <Button label="Projects" variant="ghost" width="100%" />
              <Button label="Settings" variant="ghost" width="100%" />
              <Button label="Help" variant="ghost" width="100%" />
            </div>
          </div>
        </LayoutPanel>
      </Theme>
      <Theme theme={lightContentTheme} mode="light">
        <LayoutContent padding={6}>
          <div className="flex flex-col gap-4">
            <Heading level={1}>Dashboard</Heading>
            <Text>This content area uses a light theme while the sidebar uses a dark theme.</Text>
            <Text color="secondary">Each section can have its own theme without affecting the rest.</Text>
          </div>
        </LayoutContent>
      </Theme>
    </Layout>
  );
}
