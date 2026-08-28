import {useState} from 'react';
import {AppShell} from '@astryxdesign/core/AppShell';
import {SideNav} from '@astryxdesign/core/SideNav';
import {TopNav} from '@astryxdesign/core/TopNav';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Switch} from '@astryxdesign/core/Switch';
import {Divider} from '@astryxdesign/core/Divider';

type Page = 'general' | 'notifications' | 'security' | 'appearance';

export default function SettingsDashboard() {
  const [page, setPage] = useState<Page>('general');

  return (
    <AppShell
      height="fill"
      contentPadding={4}
      topNav={
        <TopNav label="App navigation">
          <TopNav.Brand>
            <Heading level={1} accessibilityLevel={1}>Acme App</Heading>
          </TopNav.Brand>
        </TopNav>
      }
      sideNav={
        <SideNav label="Settings">
          <SideNav.Item label="General" isSelected={page === 'general'} onPress={() => setPage('general')} />
          <SideNav.Item label="Notifications" isSelected={page === 'notifications'} onPress={() => setPage('notifications')} />
          <SideNav.Item label="Security" isSelected={page === 'security'} onPress={() => setPage('security')} />
          <SideNav.Item label="Appearance" isSelected={page === 'appearance'} onPress={() => setPage('appearance')} />
        </SideNav>
      }
    >
      <div className="flex flex-col gap-6">
        {page === 'general' && (
          <>
            <Heading level={2}>General Settings</Heading>
            <Card>
              <div className="flex flex-col gap-4">
                <TextInput label="Display Name" defaultValue="Jane Doe" />
                <TextInput label="Email" defaultValue="jane@acme.com" />
                <TextInput label="Company" defaultValue="Acme Inc." />
              </div>
            </Card>
          </>
        )}
        {page === 'notifications' && (
          <>
            <Heading level={2}>Notifications</Heading>
            <Card>
              <div className="flex flex-col gap-3">
                <Switch label="Email notifications" defaultChecked />
                <Divider />
                <Switch label="Push notifications" defaultChecked />
                <Divider />
                <Switch label="Weekly digest" />
              </div>
            </Card>
          </>
        )}
        {page === 'security' && (
          <>
            <Heading level={2}>Security</Heading>
            <Card>
              <div className="flex flex-col gap-4">
                <TextInput label="Current Password" type="password" />
                <TextInput label="New Password" type="password" />
                <TextInput label="Confirm Password" type="password" />
              </div>
            </Card>
          </>
        )}
        {page === 'appearance' && (
          <>
            <Heading level={2}>Appearance</Heading>
            <Card>
              <div className="flex flex-col gap-3">
                <Text>Theme settings for your account.</Text>
                <Switch label="Dark mode" />
                <Switch label="Reduce motion" />
              </div>
            </Card>
          </>
        )}
      </div>
    </AppShell>
  );
}
