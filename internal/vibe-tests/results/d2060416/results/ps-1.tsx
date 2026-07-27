import {Layout, LayoutHeader, LayoutContent, LayoutPanel} from '@astryxdesign/core/Layout';
import {Theme} from '@astryxdesign/core/Theme';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {SideNav} from '@astryxdesign/core/SideNav';
import {NavItem} from '@astryxdesign/core/NavItem';
import {useState} from 'react';

export default function SettingsDashboard() {
  const [activeSection, setActiveSection] = useState('general');
  return (
    <Theme><Layout><LayoutHeader><Heading level={1}>Settings</Heading></LayoutHeader>
      <LayoutPanel position="start" width={240}><SideNav>
        <NavItem isActive={activeSection === 'general'} onPress={() => setActiveSection('general')}>General</NavItem>
        <NavItem isActive={activeSection === 'account'} onPress={() => setActiveSection('account')}>Account</NavItem>
        <NavItem isActive={activeSection === 'notifications'} onPress={() => setActiveSection('notifications')}>Notifications</NavItem>
      </SideNav></LayoutPanel>
      <LayoutContent><Stack gap="lg"><Heading level={2}>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</Heading><Text>Configure your {activeSection} settings here.</Text><Button variant="filled">Save Changes</Button></Stack></LayoutContent>
    </Layout></Theme>
  );
}
