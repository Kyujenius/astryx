// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {VStack} from '@astryxdesign/core/Stack';
import {Section} from '@astryxdesign/core/Section';

export default function SettingsPage() {
  const [profile, setProfile] = useState({name: '', email: ''});
  const [notifications, setNotifications] = useState({frequency: ''});
  const [security, setSecurity] = useState({currentPassword: '', newPassword: ''});

  return (
    <VStack gap={4} padding={4} maxWidth={600}>
      <Heading level={1}>Settings</Heading>

      <Section>
        <VStack gap={2}>
          <Heading level={2}>Profile</Heading>
          <Text color="secondary">Update your personal information and display name.</Text>
          <TextInput label="Display Name" value={profile.name} onChange={(v) => setProfile(s => ({...s, name: v}))} />
          <TextInput label="Email Address" value={profile.email} onChange={(v) => setProfile(s => ({...s, email: v}))} type="email" />
        </VStack>
      </Section>

      <Section>
        <VStack gap={2}>
          <Heading level={2}>Notifications</Heading>
          <Text color="secondary">Control how and when you receive notifications.</Text>
          <TextInput label="Email Digest Frequency" value={notifications.frequency} onChange={(v) => setNotifications(s => ({...s, frequency: v}))} placeholder="e.g. daily, weekly" />
        </VStack>
      </Section>

      <Section>
        <VStack gap={2}>
          <Heading level={2}>Security</Heading>
          <Text color="secondary">Manage your password and account security settings.</Text>
          <TextInput label="Current Password" value={security.currentPassword} onChange={(v) => setSecurity(s => ({...s, currentPassword: v}))} type="password" />
          <TextInput label="New Password" value={security.newPassword} onChange={(v) => setSecurity(s => ({...s, newPassword: v}))} type="password" />
        </VStack>
      </Section>
    </VStack>
  );
}
