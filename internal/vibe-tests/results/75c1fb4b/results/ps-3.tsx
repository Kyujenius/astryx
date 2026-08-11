// Copyright (c) Meta Platforms, Inc. and affiliates.

import {AppShell} from '@astryxdesign/core/AppShell';
import {SideNav} from '@astryxdesign/core/SideNav';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';

export default function AdminPanel() {
  return (
    <AppShell
      topNav={
        <Stack direction="horizontal" gap={3} padding={3}>
          <Heading level={3}>Admin Panel</Heading>
        </Stack>
      }
      sideNav={
        <SideNav
          header={<Heading level={4}>Navigation</Heading>}
          collapsible
        >
          <Stack gap={1}>
            <Text weight="medium">Dashboard</Text>
            <Text weight="medium">Users</Text>
            <Text weight="medium">Settings</Text>
            <Text weight="medium">Reports</Text>
          </Stack>
        </SideNav>
      }
    >
      <Stack direction="horizontal" gap={4} padding={4}>
        <Stack gap={4} width="100%">
          <Heading level={2}>Dashboard</Heading>
          <Card>
            <Stack padding={4}>
              <Text>Main content area. Display tables, charts, or forms here.</Text>
            </Stack>
          </Card>
        </Stack>
        <Stack gap={3} width={320}>
          <Heading level={3}>Details</Heading>
          <Card>
            <Stack padding={3}>
              <Text type="supporting">Select an item to view details.</Text>
            </Stack>
          </Card>
        </Stack>
      </Stack>
    </AppShell>
  );
}
