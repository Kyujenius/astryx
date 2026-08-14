import {AppShell} from '@astryxdesign/core/AppShell';
import {SideNav} from '@astryxdesign/core/SideNav';
import {SideNavItem} from '@astryxdesign/core/SideNav';
import {SideNavSection} from '@astryxdesign/core/SideNav';
import {SideNavHeading} from '@astryxdesign/core/SideNav';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';
import {useState} from 'react';

export default function SettingsDashboard() {
  const [page, setPage] = useState('Profile');

  return (
    <AppShell
      height="fill"
      contentPadding={4}
      sideNav={
        <SideNav header={<SideNavHeading title="Settings" />}>
          <SideNavSection title="Account">
            <SideNavItem label="Profile" isSelected={page === 'Profile'} onPress={() => setPage('Profile')} />
            <SideNavItem label="Security" isSelected={page === 'Security'} onPress={() => setPage('Security')} />
            <SideNavItem label="Notifications" isSelected={page === 'Notifications'} onPress={() => setPage('Notifications')} />
          </SideNavSection>
          <SideNavSection title="Workspace">
            <SideNavItem label="General" isSelected={page === 'General'} onPress={() => setPage('General')} />
            <SideNavItem label="Members" isSelected={page === 'Members'} onPress={() => setPage('Members')} />
            <SideNavItem label="Billing" isSelected={page === 'Billing'} onPress={() => setPage('Billing')} />
          </SideNavSection>
        </SideNav>
      }
    >
      <VStack gap={3}>
        <Heading level={2}>{page}</Heading>
        <Text color="secondary">Configure your {page.toLowerCase()} preferences.</Text>
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
          <p className="text-gray-600">Settings content for {page} will appear here.</p>
        </div>
      </VStack>
    </AppShell>
  );
}
