// Copyright (c) Meta Platforms, Inc. and affiliates.

import React from 'react';
import {AppShell} from '@astryxdesign/core/AppShell';
import {TopNav} from '@astryxdesign/core/TopNav';
import {SideNav} from '@astryxdesign/core/SideNav';
import {SideNavHeading} from '@astryxdesign/core/SideNav';
import {SideNavSection} from '@astryxdesign/core/SideNav';
import {SideNavItem} from '@astryxdesign/core/SideNav';
import {MobileNav} from '@astryxdesign/core/MobileNav';
import {MobileNavToggle} from '@astryxdesign/core/MobileNav';
import {Heading} from '@astryxdesign/core/Heading';

const navItems = (
  <SideNavSection title="Navigation">
    <SideNavItem label="Home" isSelected href="/" />
    <SideNavItem label="Products" href="/products" />
    <SideNavItem label="About" href="/about" />
  </SideNavSection>
);

export default function ResponsiveNav() {
  return (
    <AppShell
      sideNav={<SideNav header={<SideNavHeading heading="MyApp" />}>{navItems}</SideNav>}
      mobileNav={<MobileNav header="MyApp">{navItems}</MobileNav>}
      topNav={<TopNav heading={<Heading level={4}>MyApp</Heading>} startContent={<MobileNavToggle />} />}
    >
      <div className="p-8"><Heading level={1}>Welcome</Heading></div>
    </AppShell>
  );
}
