import {useState} from 'react';
import {AppShell} from '@astryxdesign/core/AppShell';
import {TopNav, TopNavItem} from '@astryxdesign/core/TopNav';
import {MobileNav, MobileNavToggle} from '@astryxdesign/core/MobileNav';
import {SideNavItem} from '@astryxdesign/core/SideNav';
import {Button} from '@astryxdesign/core/Button';
import {HStack} from '@astryxdesign/core/HStack';
import {Text} from '@astryxdesign/core/Text';

const links = ['Home', 'Products', 'About', 'Contact'];

export default function ResponsiveNav() {
  return (
    <AppShell
      topNav={
        <TopNav
          startContent={<Text weight="bold">MyApp</Text>}
        >
          {links.map(link => (
            <TopNavItem key={link} label={link} href={`/${link.toLowerCase()}`} />
          ))}
        </TopNav>
      }
      mobileNav={
        <MobileNav header="MyApp">
          {links.map(link => (
            <SideNavItem key={link} label={link} href={`/${link.toLowerCase()}`} />
          ))}
        </MobileNav>
      }
    >
      <Text>Page content goes here.</Text>
    </AppShell>
  );
}
