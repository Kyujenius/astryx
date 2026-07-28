// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Switch} from '@astryxdesign/core/Switch';
import {Selector} from '@astryxdesign/core/Selector';

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState('');
  const [language, setLanguage] = useState('en');
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [theme, setTheme] = useState('system');
  const [fontSize, setFontSize] = useState('medium');

  return (
    <VStack gap={6} maxWidth={600}>
      <Heading level={1}>Settings</Heading>

      <VStack gap={3}>
        <Heading level={2}>Profile</Heading>
        <Text color="secondary">Manage your personal information and public profile.</Text>
        <TextInput label="Display Name" value={displayName} onChange={setDisplayName} />
        <Selector
          label="Language"
          options={[
            {value: 'en', label: 'English'},
            {value: 'es', label: 'Spanish'},
            {value: 'fr', label: 'French'},
            {value: 'de', label: 'German'},
          ]}
          value={language}
          onChange={setLanguage}
        />
      </VStack>

      <VStack gap={3}>
        <Heading level={2}>Notifications</Heading>
        <Text color="secondary">Choose how you want to be notified about activity.</Text>
        <Switch label="Email notifications" value={emailNotifs} onChange={setEmailNotifs} />
        <Switch label="Push notifications" value={pushNotifs} onChange={setPushNotifs} />
      </VStack>

      <VStack gap={3}>
        <Heading level={2}>Appearance</Heading>
        <Text color="secondary">Adjust how the application looks and feels.</Text>
        <Selector
          label="Theme"
          options={['System', 'Light', 'Dark']}
          value={theme}
          onChange={setTheme}
        />
        <Selector
          label="Font Size"
          options={['Small', 'Medium', 'Large']}
          value={fontSize}
          onChange={setFontSize}
        />
      </VStack>
    </VStack>
  );
}
