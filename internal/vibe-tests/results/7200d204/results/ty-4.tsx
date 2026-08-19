import {useState} from 'react';
import {Heading, Text} from '@astryxdesign/core/Text';
import {Stack} from '@astryxdesign/core/Stack';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Switch} from '@astryxdesign/core/Switch';
import {Selector} from '@astryxdesign/core/Selector';
import {Divider} from '@astryxdesign/core/Divider';
import {Card} from '@astryxdesign/core/Card';

export default function SettingsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);

  return (
    <Stack gap="xl">
      <Heading level={1}>Settings</Heading>
      <Card>
        <Stack gap="md">
          <Stack gap="xs">
            <Heading level={2}>Profile</Heading>
            <Text color="secondary">Manage your personal information.</Text>
          </Stack>
          <TextInput label="Display name" value={name} onChange={setName} />
          <TextInput label="Email" type="email" value={email} onChange={setEmail} />
        </Stack>
      </Card>
      <Divider />
      <Card>
        <Stack gap="md">
          <Stack gap="xs">
            <Heading level={2}>Appearance</Heading>
            <Text color="secondary">Customize how the app looks.</Text>
          </Stack>
          <Switch label="Dark mode" isSelected={darkMode} onChange={setDarkMode} />
          <Selector
            label="Language"
            value={language}
            onChange={setLanguage}
            options={[
              {value: 'en', label: 'English'},
              {value: 'es', label: 'Spanish'},
              {value: 'fr', label: 'French'},
            ]}
          />
        </Stack>
      </Card>
      <Divider />
      <Card>
        <Stack gap="md">
          <Stack gap="xs">
            <Heading level={2}>Notifications</Heading>
            <Text color="secondary">Choose how you want to be notified.</Text>
          </Stack>
          <Switch label="Email notifications" isSelected={emailNotifs} onChange={setEmailNotifs} />
          <Switch label="Push notifications" isSelected={pushNotifs} onChange={setPushNotifs} />
        </Stack>
      </Card>
    </Stack>
  );
}
