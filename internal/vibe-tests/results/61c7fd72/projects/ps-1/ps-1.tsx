import {useState} from 'react';
import {Layout, LayoutHeader, LayoutContent, LayoutPanel} from '@astryxdesign/core/Layout';
import {Heading} from '@astryxdesign/core/Text';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Switch} from '@astryxdesign/core/Switch';
import {Divider} from '@astryxdesign/core/Divider';

export default function SettingsDashboard() {
  const [dark, setDark] = useState(false);
  const [notifs, setNotifs] = useState(true);

  return (
    <Layout direction="horizontal">
      <LayoutPanel width={220} hasDivider>
        <div className="flex flex-col gap-1 p-4">
          <Heading level={4}>Settings</Heading>
          <Button variant="ghost">General</Button>
          <Button variant="ghost">Account</Button>
          <Button variant="ghost">Privacy</Button>
        </div>
      </LayoutPanel>
      <Layout direction="vertical">
        <LayoutHeader hasDivider>
          <div className="flex justify-between items-center p-4">
            <Heading level={2}>General</Heading>
            <Button variant="filled">Save</Button>
          </div>
        </LayoutHeader>
        <LayoutContent padding={3}>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div><Text weight="medium">Dark Mode</Text><Text size="sm" color="secondary">Use dark theme</Text></div>
              <Switch label="Dark mode" isSelected={dark} onChange={setDark} />
            </div>
            <Divider />
            <div className="flex justify-between items-center">
              <div><Text weight="medium">Notifications</Text><Text size="sm" color="secondary">Push notifications</Text></div>
              <Switch label="Notifications" isSelected={notifs} onChange={setNotifs} />
            </div>
          </div>
        </LayoutContent>
      </Layout>
    </Layout>
  );
}
