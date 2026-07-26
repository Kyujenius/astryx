// Copyright (c) Meta Platforms, Inc. and affiliates.

import React, {useState} from 'react';
import {AppShell} from '@astryxdesign/core/AppShell';
import {SideNav} from '@astryxdesign/core/SideNav';
import {SideNavHeading} from '@astryxdesign/core/SideNav';
import {SideNavSection} from '@astryxdesign/core/SideNav';
import {SideNavItem} from '@astryxdesign/core/SideNav';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Switch} from '@astryxdesign/core/Switch';
import {Button} from '@astryxdesign/core/Button';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  content: { padding: 32, display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 720 },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBlock: 12 },
});

export default function SettingsDashboard() {
  const [section, setSection] = useState('general');
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [emailNotifs, setEmailNotifs] = useState(true);

  return (
    <AppShell sideNav={
      <SideNav header={<SideNavHeading heading="Settings" />}>
        <SideNavSection title="Account">
          <SideNavItem label="General" isSelected={section === 'general'} onClick={() => setSection('general')} />
          <SideNavItem label="Notifications" isSelected={section === 'notifications'} onClick={() => setSection('notifications')} />
          <SideNavItem label="Security" isSelected={section === 'security'} onClick={() => setSection('security')} />
        </SideNavSection>
      </SideNav>
    }>
      <div {...stylex.props(styles.content)}>
        <Heading level={2}>{section.charAt(0).toUpperCase() + section.slice(1)}</Heading>
        {section === 'general' && (
          <Card><div style={{padding: 24, display: 'flex', flexDirection: 'column', gap: 16}}>
            <TextInput label="Name" value={name} onChange={setName} />
            <TextInput label="Email" value={email} onChange={setEmail} />
            <Button variant="filled">Save</Button>
          </div></Card>
        )}
        {section === 'notifications' && (
          <Card><div style={{padding: 24}}>
            <div {...stylex.props(styles.row)}><Text>Email notifications</Text><Switch isSelected={emailNotifs} onChange={setEmailNotifs} label="Email notifications" /></div>
          </div></Card>
        )}
      </div>
    </AppShell>
  );
}
