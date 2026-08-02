import React, {useState} from 'react';
import {TopNav} from '@astryxdesign/core/TopNav';
import {NavMenu} from '@astryxdesign/core/NavMenu';
import {IconButton} from '@astryxdesign/core/IconButton';
import {Button} from '@astryxdesign/core/Button';
import {Text} from '@astryxdesign/core/Text';

export default function ResponsiveNavigation() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    {label: 'Home', href: '/'},
    {label: 'Products', href: '/products'},
    {label: 'About', href: '/about'},
    {label: 'Contact', href: '/contact'},
  ];

  return (
    <TopNav>
      <Text><strong>MyApp</strong></Text>

      <div className="hidden md:flex gap-2">
        {navItems.map((item) => (
          <Button key={item.label} variant="ghost" href={item.href}>
            {item.label}
          </Button>
        ))}
      </div>

      <div className="md:hidden">
        <IconButton
          label="Menu"
          icon={() => (
            <svg viewBox="0 0 24 24" width={24} height={24} fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          )}
          onPress={() => setIsMobileOpen(!isMobileOpen)}
        />
      </div>

      {isMobileOpen && (
        <NavMenu>
          {navItems.map((item) => (
            <Button key={item.label} variant="ghost" href={item.href}>
              {item.label}
            </Button>
          ))}
        </NavMenu>
      )}
    </TopNav>
  );
}
