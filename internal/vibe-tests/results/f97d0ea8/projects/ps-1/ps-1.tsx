// Copyright (c) Meta Platforms, Inc. and affiliates.

import {AppShell} from '@astryxdesign/core/AppShell';
import {TopNav, TopNavHeading} from '@astryxdesign/core/TopNav';
import {SideNav, SideNavItem, SideNavSection, SideNavHeading} from '@astryxdesign/core/SideNav';
import {VStack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {Switch} from '@astryxdesign/core/Switch';
import {useState} from 'react';

export default function SettingsDashboard() {
  const [activeSection, setActiveSection] = useState('general');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <AppShell
      topNav={
        <TopNav heading={<TopNavHeading>My App</TopNavHeading>} />
      }
      sideNav={
        <SideNav header={<SideNavHeading heading="Settings" />}>
          <SideNavSection title="Navigation">
            <SideNavItem label="General" isSelected={activeSection === 'general'} onClick={() => setActiveSection('general')} />
            <SideNavItem label="Notifications" isSelected={activeSection === 'notifications'} onClick={() => setActiveSection('notifications')} />
            <SideNavItem label="Privacy" isSelected={activeSection === 'privacy'} onClick={() => setActiveSection('privacy')} />
            <SideNavItem label="Account" isSelected={activeSection === 'account'} onClick={() => setActiveSection('account')} />
          </SideNavSection>
        </SideNav>
      }
    >
      <VStack gap={4} padding={4}>
        <Heading level={2}>
          {activeSection === 'general' && 'General Settings'}
          {activeSection === 'notifications' && 'Notification Preferences'}
          {activeSection === 'privacy' && 'Privacy Settings'}
          {activeSection === 'account' && 'Account Settings'}
        </Heading>
        <Card>
          <VStack gap={3}>
            <Switch label="Dark mode" value={darkMode} onChange={setDarkMode} />
            <Switch label="Email notifications" value={notifications} onChange={setNotifications} />
          </VStack>
        </Card>
      </VStack>
    </AppShell>
  );
}
