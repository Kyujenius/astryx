import {Layout, LayoutHeader, LayoutContent, LayoutPanel} from '@astryxdesign/core/Layout';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Text';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Divider} from '@astryxdesign/core/Divider';
import {Switch} from '@astryxdesign/core/Switch';
import {useState} from 'react';

export default function SettingsDashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <Layout direction="horizontal">
      <LayoutPanel width={240} hasDivider>
        <VStack gap={1} padding={2}>
          <Heading level={4}>Settings</Heading>
          <Button variant="ghost">General</Button>
          <Button variant="ghost">Account</Button>
          <Button variant="ghost">Notifications</Button>
          <Button variant="ghost">Privacy</Button>
        </VStack>
      </LayoutPanel>
      <Layout direction="vertical">
        <LayoutHeader hasDivider>
          <HStack justify="between" align="center" padding={2}>
            <Heading level={2}>General Settings</Heading>
            <Button variant="filled">Save Changes</Button>
          </HStack>
        </LayoutHeader>
        <LayoutContent padding={3}>
          <VStack gap={3}>
            <VStack gap={1}>
              <HStack justify="between" align="center">
                <VStack gap={0}>
                  <Text weight="medium">Dark Mode</Text>
                  <Text size="sm" color="secondary">Use dark theme across the app</Text>
                </VStack>
                <Switch label="Dark mode" isSelected={darkMode} onChange={setDarkMode} />
              </HStack>
            </VStack>
            <Divider />
            <VStack gap={1}>
              <HStack justify="between" align="center">
                <VStack gap={0}>
                  <Text weight="medium">Notifications</Text>
                  <Text size="sm" color="secondary">Receive push notifications</Text>
                </VStack>
                <Switch label="Notifications" isSelected={notifications} onChange={setNotifications} />
              </HStack>
            </VStack>
            <Divider />
            <VStack gap={1}>
              <HStack justify="between" align="center">
                <VStack gap={0}>
                  <Text weight="medium">Auto-save</Text>
                  <Text size="sm" color="secondary">Automatically save changes</Text>
                </VStack>
                <Switch label="Auto-save" isSelected={autoSave} onChange={setAutoSave} />
              </HStack>
            </VStack>
          </VStack>
        </LayoutContent>
      </Layout>
    </Layout>
  );
}
