// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {AppShell} from '@astryxdesign/core/AppShell';
import {TopNav} from '@astryxdesign/core/TopNav';
import {TopNavHeading} from '@astryxdesign/core/TopNav';
import {SideNav} from '@astryxdesign/core/SideNav';
import {SideNavItem} from '@astryxdesign/core/SideNav';
import {SideNavSection} from '@astryxdesign/core/SideNav';
import {SideNavHeading} from '@astryxdesign/core/SideNav';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

export default function AdminPanel() {
  const [page, setPage] = useState('dashboard');

  return (
    <AppShell
      height="fill"
      variant="elevated"
      topNav={
        <TopNav
          heading={<TopNavHeading>Admin Panel</TopNavHeading>}
        />
      }
      sideNav={
        <SideNav
          header={<SideNavHeading>Navigation</SideNavHeading>}
          collapsible
        >
          <SideNavSection title="Main">
            <SideNavItem isSelected={page === 'dashboard'} onClick={() => setPage('dashboard')}>Dashboard</SideNavItem>
            <SideNavItem isSelected={page === 'users'} onClick={() => setPage('users')}>Users</SideNavItem>
            <SideNavItem isSelected={page === 'settings'} onClick={() => setPage('settings')}>Settings</SideNavItem>
          </SideNavSection>
          <SideNavSection title="Reports">
            <SideNavItem isSelected={page === 'analytics'} onClick={() => setPage('analytics')}>Analytics</SideNavItem>
            <SideNavItem isSelected={page === 'logs'} onClick={() => setPage('logs')}>Logs</SideNavItem>
          </SideNavSection>
        </SideNav>
      }
    >
      <Stack padding={4} gap={3}>
        <Heading level={2}>{page.charAt(0).toUpperCase() + page.slice(1)}</Heading>
        <Text>Content for the {page} section goes here.</Text>
      </Stack>
    </AppShell>
  );
}
