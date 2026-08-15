import {useState} from 'react';
import {AppShell} from '@astryxdesign/core/AppShell';
import {SideNav} from '@astryxdesign/core/SideNav';
import {SideNavHeading} from '@astryxdesign/core/SideNav';
import {SideNavItem} from '@astryxdesign/core/SideNav';
import {SideNavSection} from '@astryxdesign/core/SideNav';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Switch} from '@astryxdesign/core/Switch';
import {Selector} from '@astryxdesign/core/Selector';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {Divider} from '@astryxdesign/core/Divider';
import {FormLayout} from '@astryxdesign/core/FormLayout';

export default function SettingsDashboard() {
  const [activeSection, setActiveSection] = useState('profile');
  const [name, setName] = useState('Jane Doe');
  const [email, setEmail] = useState('jane@example.com');
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('system');

  return (
    <AppShell>
      <AppShell.SideNav>
        <SideNav
          header={<SideNavHeading heading="Settings" />}
        >
          <SideNavSection title="Account">
            <SideNavItem label="Profile" isSelected={activeSection === 'profile'} onClick={() => setActiveSection('profile')} />
            <SideNavItem label="Security" isSelected={activeSection === 'security'} onClick={() => setActiveSection('security')} />
          </SideNavSection>
          <SideNavSection title="Preferences">
            <SideNavItem label="Notifications" isSelected={activeSection === 'notifications'} onClick={() => setActiveSection('notifications')} />
            <SideNavItem label="Appearance" isSelected={activeSection === 'appearance'} onClick={() => setActiveSection('appearance')} />
          </SideNavSection>
        </SideNav>
      </AppShell.SideNav>
      <AppShell.Main>
        <Stack direction="vertical" gap={6} padding={6}>
          {activeSection === 'profile' && (
            <Card padding={5}>
              <Stack direction="vertical" gap={4}>
                <Heading level={2}>Profile</Heading>
                <Divider />
                <FormLayout>
                  <TextInput label="Full name" value={name} onChange={setName} />
                  <TextInput label="Email" type="email" value={email} onChange={setEmail} />
                </FormLayout>
                <Button label="Save changes" variant="primary" />
              </Stack>
            </Card>
          )}
          {activeSection === 'notifications' && (
            <Card padding={5}>
              <Stack direction="vertical" gap={4}>
                <Heading level={2}>Notifications</Heading>
                <Divider />
                <Switch
                  label="Email notifications"
                  isSelected={notifications}
                  onChange={setNotifications}
                />
              </Stack>
            </Card>
          )}
          {activeSection === 'appearance' && (
            <Card padding={5}>
              <Stack direction="vertical" gap={4}>
                <Heading level={2}>Appearance</Heading>
                <Divider />
                <Selector
                  label="Theme"
                  options={[
                    {value: 'light', label: 'Light'},
                    {value: 'dark', label: 'Dark'},
                    {value: 'system', label: 'System'},
                  ]}
                  value={theme}
                  onChange={setTheme}
                />
              </Stack>
            </Card>
          )}
          {activeSection === 'security' && (
            <Card padding={5}>
              <Stack direction="vertical" gap={4}>
                <Heading level={2}>Security</Heading>
                <Divider />
                <Text>Manage your password and two-factor authentication settings.</Text>
                <Button label="Change password" variant="secondary" />
              </Stack>
            </Card>
          )}
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
}
