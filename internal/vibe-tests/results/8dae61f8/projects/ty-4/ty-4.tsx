import {useState} from 'react';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Selector} from '@astryxdesign/core/Selector';
import {Card} from '@astryxdesign/core/Card';

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('utc');

  return (
    <div className="flex flex-col gap-6 p-4 max-w-2xl">
      <Heading level={1}>Settings</Heading>

      <Card padding={4}>
        <div className="flex flex-col gap-3">
          <Heading level={2}>Profile</Heading>
          <Text color="secondary">Manage your personal information and how others see you.</Text>
          <TextInput label="Display Name" value={displayName} onChange={setDisplayName} />
          <TextInput label="Email" value={email} onChange={setEmail} type="email" />
        </div>
      </Card>

      <Card padding={4}>
        <div className="flex flex-col gap-3">
          <Heading level={2}>Notifications</Heading>
          <Text color="secondary">Choose how you want to be notified about activity.</Text>
          <CheckboxInput label="Email notifications" value={emailNotifications} onChange={setEmailNotifications} />
          <CheckboxInput label="Push notifications" value={pushNotifications} onChange={setPushNotifications} />
        </div>
      </Card>

      <Card padding={4}>
        <div className="flex flex-col gap-3">
          <Heading level={2}>Preferences</Heading>
          <Text color="secondary">Set your language and regional preferences.</Text>
          <Selector label="Language" value={language} onChange={setLanguage} options={[{value: 'en', label: 'English'}, {value: 'es', label: 'Spanish'}, {value: 'fr', label: 'French'}]} />
          <Selector label="Timezone" value={timezone} onChange={setTimezone} options={[{value: 'utc', label: 'UTC'}, {value: 'est', label: 'Eastern'}, {value: 'pst', label: 'Pacific'}]} />
        </div>
      </Card>
    </div>
  );
}
