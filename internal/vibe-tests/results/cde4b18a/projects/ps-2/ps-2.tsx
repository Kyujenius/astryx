import {AppShell} from '@astryxdesign/core/AppShell';
import {TopNav} from '@astryxdesign/core/TopNav';
import {SideNav} from '@astryxdesign/core/SideNav';
import {SideNavItem} from '@astryxdesign/core/SideNav';
import {SideNavSection} from '@astryxdesign/core/SideNav';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Stack} from '@astryxdesign/core/Stack';
import {AstryxProvider} from '@astryxdesign/core/AstryxProvider';
import {neutralTheme} from '@astryxdesign/theme-neutral';

function InternalToolLayout() {
  return (
    <AppShell
      height="fill"
      variant="elevated"
      topNav={
        <TopNav
          heading={<Heading level={4}>Internal Tool</Heading>}
          label="Main navigation"
        />
      }
      sideNav={
        <SideNav>
          <SideNavSection label="Menu">
            <SideNavItem label="Dashboard" isSelected />
            <SideNavItem label="Users" />
            <SideNavItem label="Reports" />
            <SideNavItem label="Settings" />
          </SideNavSection>
        </SideNav>
      }
    >
      <div className="p-6 space-y-4">
        <Heading level={2}>Dashboard</Heading>
        <Text>Welcome to the internal tool.</Text>
      </div>
    </AppShell>
  );
}

export default function RootLayout() {
  return (
    <AstryxProvider theme={neutralTheme}>
      <InternalToolLayout />
    </AstryxProvider>
  );
}
