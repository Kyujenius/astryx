import {useState} from 'react';
import {AppShell} from '@astryxdesign/core/AppShell';
import {SideNav} from '@astryxdesign/core/SideNav';
import {SideNavItem} from '@astryxdesign/core/SideNav';
import {SideNavSection} from '@astryxdesign/core/SideNav';
import {TopNav} from '@astryxdesign/core/TopNav';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';

export default function SettingsDashboard() {
  const [activePage, setActivePage] = useState('general');

  return (
    <AppShell
      topNav={
        <TopNav heading={<Heading level={1} size="sm">Settings</Heading>} />
      }
      sideNav={
        <SideNav header={<Heading level={2} size="sm">Settings</Heading>}>
          <SideNavSection label="Account">
            <SideNavItem label="General" isSelected={activePage === 'general'} onClick={() => setActivePage('general')} />
            <SideNavItem label="Security" isSelected={activePage === 'security'} onClick={() => setActivePage('security')} />
            <SideNavItem label="Notifications" isSelected={activePage === 'notifications'} onClick={() => setActivePage('notifications')} />
          </SideNavSection>
          <SideNavSection label="App">
            <SideNavItem label="Appearance" isSelected={activePage === 'appearance'} onClick={() => setActivePage('appearance')} />
            <SideNavItem label="Integrations" isSelected={activePage === 'integrations'} onClick={() => setActivePage('integrations')} />
          </SideNavSection>
        </SideNav>
      }
      contentPadding={4}
    >
      <VStack gap={3}>
        <Heading level={2}>{activePage.charAt(0).toUpperCase() + activePage.slice(1)}</Heading>
        <Text>Configure your {activePage} settings here.</Text>
      </VStack>
    </AppShell>
  );
}
