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
  const [page, setPage] = useState('dashboard');

  return (
    <Theme theme={neutral} mode="light">
      <AppShell
        topNav={<TopNav><TopNavHeading>Admin Panel</TopNavHeading></TopNav>}
        sideNav={
          <SideNav>
            <SideNavSection label="Main">
              <SideNavItem label="Dashboard" isSelected={page === 'dashboard'} onClick={() => setPage('dashboard')} />
              <SideNavItem label="Users" isSelected={page === 'users'} onClick={() => setPage('users')} />
              <SideNavItem label="Settings" isSelected={page === 'settings'} onClick={() => setPage('settings')} />
            </SideNavSection>
          </SideNav>
        }
      >
        <div className="flex gap-4 p-4">
          <div className="flex-1">
            <Heading level={2}>{page.charAt(0).toUpperCase() + page.slice(1)}</Heading>
            <Card padding={4}>
              <Text>Main content for the {page} section.</Text>
            </Card>
          </div>
          <aside className="w-72">
            <Card padding={4}>
              <Stack gap={2}>
                <Heading level={4}>Details</Heading>
                <Text type="supporting" color="secondary">Select an item to view details.</Text>
              </Stack>
            </Card>
          </aside>
        </div>
      </AppShell>
    </Theme>
  );
}
