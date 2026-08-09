// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {AppShell} from '@astryxdesign/core/AppShell';
import {TopNav, TopNavHeading} from '@astryxdesign/core/TopNav';
import {SideNav, SideNavItem, SideNavSection} from '@astryxdesign/core/SideNav';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {Theme} from '@astryxdesign/core/Theme';
import {neutral} from '@astryxdesign/theme-neutral';

export default function AdminPanel() {
  const [activePage, setActivePage] = useState('dashboard');

  return (
    <Theme theme={neutral} mode="light">
      <AppShell
        topNav={
          <TopNav>
            <TopNavHeading>Admin Panel</TopNavHeading>
          </TopNav>
        }
        sideNav={
          <SideNav>
            <SideNavSection label="Main">
              <SideNavItem
                label="Dashboard"
                isSelected={activePage === 'dashboard'}
                onClick={() => setActivePage('dashboard')}
              />
              <SideNavItem
                label="Users"
                isSelected={activePage === 'users'}
                onClick={() => setActivePage('users')}
              />
              <SideNavItem
                label="Settings"
                isSelected={activePage === 'settings'}
                onClick={() => setActivePage('settings')}
              />
            </SideNavSection>
          </SideNav>
        }
      >
        <Stack direction="horizontal" gap={4} padding={4}>
          <Stack gap={4} size="fill">
            <Heading level={2}>
              {activePage === 'dashboard' && 'Dashboard'}
              {activePage === 'users' && 'Users'}
              {activePage === 'settings' && 'Settings'}
            </Heading>
            <Card padding={4}>
              <Text>Main content area for the {activePage} page.</Text>
            </Card>
          </Stack>
          <Card padding={4} width={300}>
            <Stack gap={2}>
              <Heading level={4}>Details</Heading>
              <Text type="supporting" color="secondary">
                Select an item from the main content to view details here.
              </Text>
            </Stack>
          </Card>
        </Stack>
      </AppShell>
    </Theme>
  );
}
