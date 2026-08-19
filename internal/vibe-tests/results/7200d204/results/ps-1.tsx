import {useState} from 'react';
import {AppShell} from '@astryxdesign/core/AppShell';
import {SideNav} from '@astryxdesign/core/SideNav';
import {Text, Heading} from '@astryxdesign/core/Text';
import {Stack} from '@astryxdesign/core/Stack';
import {Card} from '@astryxdesign/core/Card';

const navItems = [
  {id: 'general', label: 'General'},
  {id: 'security', label: 'Security'},
  {id: 'notifications', label: 'Notifications'},
  {id: 'integrations', label: 'Integrations'},
];

export default function SettingsDashboard() {
  const [activeSection, setActiveSection] = useState('general');

  return (
    <AppShell>
      <AppShell.Header>
        <Heading level={1}>Settings</Heading>
      </AppShell.Header>
      <AppShell.Sidebar>
        <SideNav>
          {navItems.map((item) => (
            <SideNav.Item
              key={item.id}
              isSelected={activeSection === item.id}
              onPress={() => setActiveSection(item.id)}
            >
              {item.label}
            </SideNav.Item>
          ))}
        </SideNav>
      </AppShell.Sidebar>
      <AppShell.Main>
        <Stack gap="lg">
          <Heading level={2}>{navItems.find(i => i.id === activeSection)?.label}</Heading>
          <Card>
            <Text>Settings content for {activeSection} section.</Text>
          </Card>
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
}
