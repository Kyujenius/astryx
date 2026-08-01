import {Theme} from '@astryxdesign/core/theme';
import {Layout} from '@astryxdesign/core/Layout';
import {LayoutContent} from '@astryxdesign/core/Layout';
import {SideNav} from '@astryxdesign/core/SideNav';
import {SideNavItem} from '@astryxdesign/core/SideNav';
import {SideNavHeading} from '@astryxdesign/core/SideNav';
import {SideNavSection} from '@astryxdesign/core/SideNav';
import {Text} from '@astryxdesign/core/Text';
import {Stack} from '@astryxdesign/core/Stack';
import {Card} from '@astryxdesign/core/Card';
import {defineTheme} from '@astryxdesign/core/theme';

const darkTheme = defineTheme({
  tokens: {
    '--color-background-surface': '#1a1a2e',
    '--color-text-primary': '#e0e0e0',
    '--color-text-secondary': '#a0a0b0',
  },
});

export default function ThemedLayout() {
  return (
    <Layout height="fill">
      <Layout
        start={
          <Theme theme={darkTheme} mode="dark">
            <SideNav>
              <SideNavHeading>Navigation</SideNavHeading>
              <SideNavSection>
                <SideNavItem label="Dashboard" isSelected />
                <SideNavItem label="Projects" />
                <SideNavItem label="Teams" />
                <SideNavItem label="Settings" />
              </SideNavSection>
            </SideNav>
          </Theme>
        }
      >
        <LayoutContent>
          <Stack gap={4} padding={4}>
            <Text type="display-3">Dashboard</Text>
            <Text type="body" color="secondary">
              This content area uses the default light theme while the sidebar is dark.
            </Text>
            <Card padding={4}>
              <Text type="body">Content goes here.</Text>
            </Card>
          </Stack>
        </LayoutContent>
      </Layout>
    </Layout>
  );
}
