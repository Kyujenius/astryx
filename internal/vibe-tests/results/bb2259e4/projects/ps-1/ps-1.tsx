import {AppShell} from '@astryxdesign/core/AppShell';
import {SideNav} from '@astryxdesign/core/SideNav';
import {SideNavItem} from '@astryxdesign/core/SideNav';
import {SideNavSection} from '@astryxdesign/core/SideNav';
import {SideNavHeading} from '@astryxdesign/core/SideNav';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';
import {Card} from '@astryxdesign/core/Card';
import {Theme} from '@astryxdesign/core/Theme';
import {useState} from 'react';

const navItems = [
  {section: 'Account', items: ['Profile', 'Security', 'Notifications']},
  {section: 'Workspace', items: ['General', 'Members', 'Billing']},
];

export default function SettingsDashboard() {
  const [selectedItem, setSelectedItem] = useState('Profile');

  return (
    <AppShell
      height="fill"
      contentPadding={4}
      sideNav={
        <SideNav
          header={<SideNavHeading title="Settings" />}
        >
          {navItems.map((group) => (
            <SideNavSection key={group.section} title={group.section}>
              {group.items.map((item) => (
                <SideNavItem
                  key={item}
                  label={item}
                  isSelected={selectedItem === item}
                  onPress={() => setSelectedItem(item)}
                />
              ))}
            </SideNavSection>
          ))}
        </SideNav>
      }
    >
      <VStack gap={3}>
        <Heading level={2}>{selectedItem}</Heading>
        <Text color="secondary">
          Manage your {selectedItem.toLowerCase()} settings and preferences.
        </Text>
        <Card padding={4}>
          <Text>Content for {selectedItem} settings will appear here.</Text>
        </Card>
      </VStack>
    </AppShell>
  );
}
