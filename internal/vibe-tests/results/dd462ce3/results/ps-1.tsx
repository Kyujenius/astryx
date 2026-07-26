// Copyright (c) Meta Platforms, Inc. and affiliates.

import React, {useState} from 'react';
import {AppShell} from '@astryxdesign/core/AppShell';
import {SideNav} from '@astryxdesign/core/SideNav';
import {SideNavHeading} from '@astryxdesign/core/SideNav';
import {SideNavSection} from '@astryxdesign/core/SideNav';
import {SideNavItem} from '@astryxdesign/core/SideNav';
import {Heading} from '@astryxdesign/core/Heading';
import {Card} from '@astryxdesign/core/Card';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';

export default function SettingsDashboard() {
  const [section, setSection] = useState('general');
  return (
    <AppShell sideNav={
      <SideNav header={<SideNavHeading heading="Settings" />}>
        <SideNavSection title="Account">
          <SideNavItem label="General" isSelected={section === 'general'} onClick={() => setSection('general')} />
          <SideNavItem label="Notifications" isSelected={section === 'notifications'} onClick={() => setSection('notifications')} />
        </SideNavSection>
      </SideNav>
    }>
      <div className="p-8 max-w-2xl flex flex-col gap-6">
        <Heading level={2}>{section.charAt(0).toUpperCase() + section.slice(1)}</Heading>
        <Card><div className="p-6 flex flex-col gap-4">
          <TextInput label="Name" value="John" onChange={() => {}} />
          <Button variant="filled">Save</Button>
        </div></Card>
      </div>
    </AppShell>
  );
}
