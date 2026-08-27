import {AppShell} from '@astryxdesign/core/AppShell';
import {TopNav} from '@astryxdesign/core/TopNav';
import {SideNav, SideNavItem, SideNavSection} from '@astryxdesign/core/SideNav';
import {Card} from '@astryxdesign/core/Card';

export default function SettingsDashboard() {
  return (
    <AppShell
      topNav={<TopNav startContent={<span className="font-bold">Settings Dashboard</span>} />}
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
      <div className="flex flex-col gap-4 p-4">
        <h2 className="text-xl font-bold">Profile Settings</h2>
        <Card padding={4}>
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Display Name</p>
            <p className="text-sm text-gray-600">Configure how your name appears across the app.</p>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
