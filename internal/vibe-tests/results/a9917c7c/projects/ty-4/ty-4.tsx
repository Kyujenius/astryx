import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Section} from '@astryxdesign/core/Section';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Switch} from '@astryxdesign/core/Switch';
import {Selector} from '@astryxdesign/core/Selector';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {useState} from 'react';

export default function SettingsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);

  return (
    <Stack gap={6}>
      <Heading level={1}>Settings</Heading>

      <Section>
        <Stack gap={4}>
          <Heading level={2}>Profile</Heading>
          <Text type="supporting">
            Manage your personal information and how it appears to others.
          </Text>
          <TextInput
            label="Display name"
            value={name}
            onChange={setName}
            placeholder="Enter your name"
          />
          <TextInput
            label="Email address"
            value={email}
            onChange={setEmail}
            placeholder="you@example.com"
          />
        </Stack>
      </Section>

      <Section>
        <Stack gap={4}>
          <Heading level={2}>Appearance</Heading>
          <Text type="supporting">
            Control how the interface looks and feels.
          </Text>
          <Switch
            label="Dark mode"
            isSelected={darkMode}
            onChange={setDarkMode}
          />
          <Selector
            label="Language"
            value={language}
            onChange={setLanguage}
            options={[
              {value: 'en', label: 'English'},
              {value: 'es', label: 'Spanish'},
              {value: 'fr', label: 'French'},
              {value: 'de', label: 'German'},
            ]}
          />
        </Stack>
      </Section>

      <Section>
        <Stack gap={4}>
          <Heading level={2}>Notifications</Heading>
          <Text type="supporting">
            Choose how you want to be notified about activity.
          </Text>
          <CheckboxInput
            label="Email notifications"
            isSelected={emailNotifs}
            onChange={setEmailNotifs}
          />
          <CheckboxInput
            label="Push notifications"
            isSelected={pushNotifs}
            onChange={setPushNotifs}
          />
        </Stack>
      </Section>
    </Stack>
  );
}
