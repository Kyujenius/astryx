import {AppShell} from '@astryxdesign/core/AppShell';
import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Divider} from '@astryxdesign/core/Divider';
import {Card} from '@astryxdesign/core/Card';
import {useState} from 'react';

const navItems = ['General', 'Notifications', 'Security', 'Appearance', 'Integrations'];

export default function SettingsDashboard() {
  const [active, setActive] = useState('General');
  return (
    <AppShell>
      <AppShell.Header>
        <Stack direction="row" align="center" gap={2} padding={2}>
          <Text variant="headingMd">Settings</Text>
        </Stack>
      </AppShell.Header>
      <AppShell.Body>
        <Stack direction="row">
          <AppShell.Sidebar>
            <Stack gap={1} padding={2}>
              {navItems.map(item => <Button key={item} label={item} variant={active === item ? 'secondary' : 'ghost'} onClick={() => setActive(item)} />)}
            </Stack>
          </AppShell.Sidebar>
          <AppShell.Content>
            <Stack gap={4} padding={4}>
              <Text variant="headingLg">{active}</Text>
              <Divider />
              <Card padding={4}>
                <Stack gap={2}>
                  <Text variant="headingSm">{active} Settings</Text>
                  <Text variant="bodyMd">Configure your {active.toLowerCase()} preferences here.</Text>
                </Stack>
              </Card>
            </Stack>
          </AppShell.Content>
        </Stack>
      </AppShell.Body>
    </AppShell>
  );
}