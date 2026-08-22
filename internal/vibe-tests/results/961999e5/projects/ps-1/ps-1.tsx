import {AppShell} from '@astryxdesign/core/AppShell';
import {SideNav, SideNavItem, SideNavSection} from '@astryxdesign/core/SideNav';
import {Heading} from '@astryxdesign/core/Heading';
import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {useState} from 'react';

const sections = [
  {title: 'Account', items: ['Profile', 'Password', 'Email']},
  {title: 'Preferences', items: ['Appearance', 'Notifications', 'Language']},
  {title: 'Billing', items: ['Plan', 'Payment Methods', 'Invoices']},
];

export default function SettingsDashboard() {
  const [active, setActive] = useState('Profile');

  return (
    <AppShell
      contentPadding={4}
      sideNav={
        <SideNav>
          {sections.map((section) => (
            <SideNavSection key={section.title} title={section.title}>
              {section.items.map((item) => (
                <SideNavItem
                  key={item}
                  label={item}
                  isSelected={active === item}
                  onClick={() => setActive(item)}
                />
              ))}
            </SideNavSection>
          ))}
        </SideNav>
      }
    >
      <Stack gap={4}>
        <Heading level={1}>Settings</Heading>
        <Heading level={2}>{active}</Heading>
        <Text color="secondary">Configure your {active.toLowerCase()} settings here.</Text>
      </Stack>
    </AppShell>
  );
}
