import {AppShell} from '@astryxdesign/core/AppShell';
import {TopNav} from '@astryxdesign/core/TopNav';
import {SideNav, SideNavItem, SideNavSection} from '@astryxdesign/core/SideNav';
import {Heading, Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';
import {Card} from '@astryxdesign/core/Card';

export default function SettingsDashboard() {
  return (
    <AppShell
      topNav={
        <TopNav startContent={<Text weight="bold">Settings Dashboard</Text>} />
      }
      sideNav={
        <SideNav header="Settings">
          <SideNavSection label="Account">
            <SideNavItem label="Profile" isSelected />
            <SideNavItem label="Security" />
            <SideNavItem label="Notifications" />
          </SideNavSection>
          <SideNavSection label="Preferences">
            <SideNavItem label="Appearance" />
            <SideNavItem label="Language" />
            <SideNavItem label="Accessibility" />
          </SideNavSection>
        </SideNav>
      }
    >
      <VStack gap={4} padding={4}>
        <Heading level={2}>Profile Settings</Heading>
        <Card padding={4}>
          <VStack gap={2}>
            <Text weight="semibold">Display Name</Text>
            <Text color="secondary">Configure how your name appears across the app.</Text>
          </VStack>
        </Card>
      </VStack>
    </AppShell>
  );
}
