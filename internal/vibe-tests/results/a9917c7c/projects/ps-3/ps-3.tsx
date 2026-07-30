import {AppShell} from '@astryxdesign/core/AppShell';
import {SideNav} from '@astryxdesign/core/SideNav';
import {SideNavItem} from '@astryxdesign/core/SideNav';
import {SideNavHeading} from '@astryxdesign/core/SideNav';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Stack} from '@astryxdesign/core/Stack';
import {Card} from '@astryxdesign/core/Card';
import {Icon} from '@astryxdesign/core/Icon';
import {useState} from 'react';

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const sidebar = (
    <SideNav
      header={<SideNavHeading title="Admin Panel" />}
    >
      <SideNavItem
        label="Dashboard"
        icon={<Icon name="home" />}
        isSelected={activeSection === 'dashboard'}
        onClick={() => setActiveSection('dashboard')}
      />
      <SideNavItem
        label="Users"
        icon={<Icon name="people" />}
        isSelected={activeSection === 'users'}
        onClick={() => setActiveSection('users')}
      />
      <SideNavItem
        label="Settings"
        icon={<Icon name="settings" />}
        isSelected={activeSection === 'settings'}
        onClick={() => setActiveSection('settings')}
      />
      <SideNavItem
        label="Reports"
        icon={<Icon name="chart" />}
        isSelected={activeSection === 'reports'}
        onClick={() => setActiveSection('reports')}
      />
    </SideNav>
  );

  return (
    <AppShell
      sidebar={sidebar}
      isSidebarCollapsed={isSidebarCollapsed}
      onSidebarCollapsedChange={setIsSidebarCollapsed}
    >
      <Stack gap={4}>
        <Heading level={1}>
          {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
        </Heading>
        <Card>
          <Stack gap={3}>
            <Heading level={3}>Details Panel</Heading>
            <Text type="body">
              Select an item from the main content area to see its details here.
            </Text>
          </Stack>
        </Card>
      </Stack>
    </AppShell>
  );
}
