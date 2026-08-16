import {useState} from 'react';
import {AppShell} from '@astryxdesign/core/AppShell';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {TabList, Tab} from '@astryxdesign/core/TabList';
import {Card} from '@astryxdesign/core/Card';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {Switch} from '@astryxdesign/core/Switch';

function SideNavContent({active, onNavigate}: {active: string; onNavigate: (v: string) => void}) {
  const items = ['General', 'Notifications', 'Security', 'Billing'];
  return (
    <nav aria-label="Settings navigation" style={{padding: 16, display: 'flex', flexDirection: 'column', gap: 4}}>
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onNavigate(item.toLowerCase())}
          style={{
            padding: '8px 12px',
            border: 'none',
            borderRadius: 6,
            textAlign: 'start',
            cursor: 'pointer',
            background: active === item.toLowerCase() ? 'var(--color-background-selected)' : 'transparent',
            fontWeight: active === item.toLowerCase() ? 600 : 400,
          }}
        >
          {item}
        </button>
      ))}
    </nav>
  );
}

export default function SettingsDashboard() {
  const [section, setSection] = useState('general');
  const [name, setName] = useState('');
  const [emailNotifs, setEmailNotifs] = useState(true);

  return (
    <AppShell
      topNav={
        <div style={{padding: '12px 24px'}}>
          <Heading level={4}>Settings</Heading>
        </div>
      }
      sideNav={<SideNavContent active={section} onNavigate={setSection} />}
      contentPadding={4}
    >
      {section === 'general' && (
        <Card padding={4}>
          <Heading level={2}>General</Heading>
          <TextInput label="Display name" value={name} onChange={setName} placeholder="Your name" />
          <Button label="Save changes" variant="primary" />
        </Card>
      )}
      {section === 'notifications' && (
        <Card padding={4}>
          <Heading level={2}>Notifications</Heading>
          <Switch label="Email notifications" isSelected={emailNotifs} onChange={setEmailNotifs} />
        </Card>
      )}
      {section === 'security' && (
        <Card padding={4}>
          <Heading level={2}>Security</Heading>
          <Text display="block">Manage your password and two-factor authentication.</Text>
          <Button label="Change password" variant="secondary" />
        </Card>
      )}
      {section === 'billing' && (
        <Card padding={4}>
          <Heading level={2}>Billing</Heading>
          <Text display="block">View invoices and manage your subscription.</Text>
        </Card>
      )}
    </AppShell>
  );
}
