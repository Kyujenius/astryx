// Copyright (c) Meta Platforms, Inc. and affiliates.

import {AppShell} from '@astryxdesign/core/AppShell';
import {TopNav, TopNavHeading, TopNavItem} from '@astryxdesign/core/TopNav';
import {MobileNav} from '@astryxdesign/core/MobileNav';
import {SideNavItem, SideNavSection} from '@astryxdesign/core/SideNav';
import {VStack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

export default function ResponsiveNav() {
  return (
    <AppShell
      topNav={
        <TopNav
          heading={<TopNavHeading>Brand</TopNavHeading>}
          startContent={
            <div className="hidden md:flex gap-2">
              <TopNavItem label="Home" href="#" />
              <TopNavItem label="Products" href="#" />
              <TopNavItem label="About" href="#" />
            </div>
          }
        />
      }
      mobileNav={
        <MobileNav header="Menu">
          <SideNavSection title="Pages" isHeaderHidden>
            <SideNavItem label="Home" href="#" />
            <SideNavItem label="Products" href="#" />
            <SideNavItem label="About" href="#" />
          </SideNavSection>
        </MobileNav>
      }
    >
      <VStack gap={4} padding={4}>
        <Heading level={1}>Welcome</Heading>
        <Text>Responsive navigation with hamburger on mobile.</Text>
      </VStack>
    </AppShell>
  );
}
