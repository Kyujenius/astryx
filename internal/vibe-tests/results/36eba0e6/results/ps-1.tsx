import {Layout, LayoutHeader, LayoutContent, LayoutPanel} from '@astryxdesign/core/Layout';
import {Theme} from '@astryxdesign/core/Theme';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {SideNav} from '@astryxdesign/core/SideNav';
import {NavItem} from '@astryxdesign/core/NavItem';
import {useState} from 'react';

export default function SettingsDashboard() {
  const [section, setSection] = useState('general');
  return (<Theme><Layout><LayoutHeader><div className="flex justify-between items-center px-4"><Heading level={1}>Settings</Heading></div></LayoutHeader><LayoutPanel position="start" width={220}><SideNav><NavItem isActive={section === 'general'} onPress={() => setSection('general')}>General</NavItem><NavItem isActive={section === 'account'} onPress={() => setSection('account')}>Account</NavItem><NavItem isActive={section === 'notifications'} onPress={() => setSection('notifications')}>Notifications</NavItem></SideNav></LayoutPanel><LayoutContent><div className="p-6 space-y-4"><Heading level={2}>{section.charAt(0).toUpperCase() + section.slice(1)}</Heading><Text>Configure your {section} settings.</Text><Button variant="filled">Save Changes</Button></div></LayoutContent></Layout></Theme>);
}
