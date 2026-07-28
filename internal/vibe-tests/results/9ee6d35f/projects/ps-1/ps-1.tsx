// Copyright (c) Meta Platforms, Inc. and affiliates.

import {AppShell} from '@astryxdesign/core/AppShell';
import {SideNav, SideNavItem} from '@astryxdesign/core/SideNav';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';
import {Card} from '@astryxdesign/core/Card';

export default function SettingsDashboard() {
  return (
    <AppShell
      contentPadding={4}
      sideNav={
        <SideNav header={<Heading level={3}>Settings</Heading>}>
          <SideNavItem label="General" isSelected />
          <SideNavItem label="Account" />
          <SideNavItem label="Notifications" />
          <SideNavItem label="Security" />
        </SideNav>
      }
    >
      <VStack gap={4}>
        <Heading level={1}>General Settings</Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card padding={4}>
            <VStack gap={2}>
              <Heading level={3}>Application</Heading>
              <Text color="secondary">Manage your application preferences.</Text>
            </VStack>
          </Card>
          <Card padding={4}>
            <VStack gap={2}>
              <Heading level={3}>Appearance</Heading>
              <Text color="secondary">Customize colors and layout.</Text>
            </VStack>
          </Card>
        </div>
      </VStack>
    </AppShell>
  );
}
