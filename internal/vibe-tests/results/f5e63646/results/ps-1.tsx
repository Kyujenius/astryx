// Copyright (c) Meta Platforms, Inc. and affiliates.

import {AppShell} from '@astryxdesign/core/AppShell';
import {TopNav, TopNavHeading} from '@astryxdesign/core/TopNav';
import {SideNav, SideNavItem, SideNavSection, SideNavHeading} from '@astryxdesign/core/SideNav';
import {VStack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Card} from '@astryxdesign/core/Card';
import {Switch} from '@astryxdesign/core/Switch';
import {Theme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';
import {useState} from 'react';

export default function SettingsDashboard() {
  const [section, setSection] = useState('general');
  const [dark, setDark] = useState(false);
  const [notifs, setNotifs] = useState(true);

  return (
    <Theme theme={neutralTheme} mode={dark ? 'dark' : 'light'}>
      <AppShell
        topNav={<TopNav heading={<TopNavHeading>Settings App</TopNavHeading>} />}
        sideNav={
          <SideNav header={<SideNavHeading heading="Settings" />}>
            <SideNavSection title="Menu">
              <SideNavItem label="General" isSelected={section === 'general'} onClick={() => setSection('general')} />
              <SideNavItem label="Notifications" isSelected={section === 'notifs'} onClick={() => setSection('notifs')} />
              <SideNavItem label="Security" isSelected={section === 'security'} onClick={() => setSection('security')} />
            </SideNavSection>
          </SideNav>
        }
      >
        <div className="p-6">
          <VStack gap={4}>
            <Heading level={2}>General Settings</Heading>
            <Card>
              <VStack gap={3}>
                <Switch label="Dark mode" value={dark} onChange={setDark} />
                <Switch label="Notifications" value={notifs} onChange={setNotifs} />
              </VStack>
            </Card>
          </VStack>
        </div>
      </AppShell>
    </Theme>
  );
}
