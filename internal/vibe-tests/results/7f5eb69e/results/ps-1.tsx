import {Layout} from '@astryxdesign/core/Layout';
import {LayoutHeader} from '@astryxdesign/core/Layout';
import {LayoutContent} from '@astryxdesign/core/Layout';
import {SideNav} from '@astryxdesign/core/SideNav';
import {SideNavItem} from '@astryxdesign/core/SideNav';
import {SideNavHeading} from '@astryxdesign/core/SideNav';
import {SideNavSection} from '@astryxdesign/core/SideNav';
import {Text} from '@astryxdesign/core/Text';
import {Stack} from '@astryxdesign/core/Stack';
import {Switch} from '@astryxdesign/core/Switch';
import {useState} from 'react';

export default function SettingsDashboard() {
  const [page, setPage] = useState('general');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <Layout height="fill">
      <LayoutHeader>
        <Stack padding={3}>
          <Text type="display-3">Settings</Text>
        </Stack>
      </LayoutHeader>
      <Layout
        start={
          <SideNav>
            <SideNavHeading>Settings</SideNavHeading>
            <SideNavSection>
              <SideNavItem label="General" isSelected={page === 'general'} onClick={() => setPage('general')} />
              <SideNavItem label="Account" isSelected={page === 'account'} onClick={() => setPage('account')} />
              <SideNavItem label="Notifications" isSelected={page === 'notifications'} onClick={() => setPage('notifications')} />
              <SideNavItem label="Privacy" isSelected={page === 'privacy'} onClick={() => setPage('privacy')} />
            </SideNavSection>
          </SideNav>
        }
      >
        <LayoutContent>
          <Stack gap={4} padding={4}>
            <Text type="display-3">{page.charAt(0).toUpperCase() + page.slice(1)}</Text>
            <div className="rounded-xl border p-6 space-y-4">
              <Switch label="Dark Mode" isSelected={darkMode} onChange={setDarkMode} />
              <Switch label="Notifications" isSelected={notifications} onChange={setNotifications} />
            </div>
          </Stack>
        </LayoutContent>
      </Layout>
    </Layout>
  );
}
