import {useState} from 'react';
import {SideNav} from '@astryxdesign/core/SideNav';
import {SideNavHeading} from '@astryxdesign/core/SideNav';
import {SideNavItem} from '@astryxdesign/core/SideNav';
import {SideNavSection} from '@astryxdesign/core/SideNav';
import {MobileNav} from '@astryxdesign/core/MobileNav';
import {Stack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';

const navItems = [
  {id: 'dashboard', label: 'Dashboard'},
  {id: 'projects', label: 'Projects'},
  {id: 'tasks', label: 'Tasks'},
  {id: 'settings', label: 'Settings'},
];

export default function ResponsiveSidebar() {
  const [active, setActive] = useState('dashboard');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navContent = (
    <SideNavSection title="Navigation">
      {navItems.map(item => (
        <SideNavItem
          key={item.id}
          label={item.label}
          isSelected={active === item.id}
          onClick={() => {
            setActive(item.id);
            setIsMobileOpen(false);
          }}
        />
      ))}
    </SideNavSection>
  );

  return (
    <Stack direction="horizontal" height="100vh">
      {/* Desktop sidebar */}
      <div className="hidden md:block">
        <SideNav header={<SideNavHeading heading="My App" />}>
          {navContent}
        </SideNav>
      </div>

      {/* Mobile bottom sheet via MobileNav */}
      <div className="md:hidden">
        <MobileNav>
          {navItems.map(item => (
            <MobileNav.Item
              key={item.id}
              label={item.label}
              isSelected={active === item.id}
              onClick={() => setActive(item.id)}
            />
          ))}
        </MobileNav>
      </div>

      {/* Main content */}
      <Stack direction="vertical" gap={4} padding={6}>
        <Heading level={1}>{navItems.find(i => i.id === active)?.label}</Heading>
        <Text>Content for the {active} section goes here.</Text>
      </Stack>
    </Stack>
  );
}
