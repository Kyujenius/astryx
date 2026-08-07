import {useState} from 'react';
import {AppShell} from '@astryxdesign/core/AppShell';
import {TopNav} from '@astryxdesign/core/TopNav';
import {SideNav} from '@astryxdesign/core/SideNav';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {ThemeProvider} from '@astryxdesign/core/ThemeProvider';
import {neutralTheme} from '@astryxdesign/theme-neutral';

export default function AdminPanel() {
  const [selectedItem, setSelectedItem] = useState('Dashboard');

  return (
    <ThemeProvider theme={neutralTheme}>
      <AppShell
        height="fill"
        topNav={
          <TopNav
            heading={<Text weight="bold">Admin Panel</Text>}
            endContent={<Text type="supporting">user@example.com</Text>}
          />
        }
        sideNav={
          <SideNav collapsible>
            <Stack direction="vertical" gap={1} padding={2}>
              {['Dashboard', 'Users', 'Settings', 'Reports'].map(item => (
                <Text
                  key={item}
                  weight={selectedItem === item ? 'semibold' : 'normal'}
                  color={selectedItem === item ? 'accent' : 'primary'}
                >
                  {item}
                </Text>
              ))}
            </Stack>
          </SideNav>
        }
        contentPadding={4}
      >
        <Stack direction="horizontal" gap={4}>
          <Stack direction="vertical" gap={3} width="100%">
            <Heading level={2}>{selectedItem}</Heading>
            <Card>
              <Stack padding={4}>
                <Text>Main content area for {selectedItem}</Text>
              </Stack>
            </Card>
          </Stack>
          <Card>
            <Stack direction="vertical" gap={2} padding={3} width={280}>
              <Heading level={4}>Details</Heading>
              <Text color="secondary">Select an item to view details.</Text>
            </Stack>
          </Card>
        </Stack>
      </AppShell>
    </ThemeProvider>
  );
}
