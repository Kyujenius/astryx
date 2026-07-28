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
          <SideNavItem label="Integrations" />
        </SideNav>
      }
    >
      <VStack gap={4}>
        <Heading level={1}>General Settings</Heading>
        <Card padding={4}>
          <VStack gap={2}>
            <Heading level={3}>Application</Heading>
            <Text color="secondary">Manage your application preferences and configuration.</Text>
          </VStack>
        </Card>
        <Card padding={4}>
          <VStack gap={2}>
            <Heading level={3}>Appearance</Heading>
            <Text color="secondary">Customize colors, fonts, and layout preferences.</Text>
          </VStack>
        </Card>
      </VStack>
    </AppShell>
  );
}
