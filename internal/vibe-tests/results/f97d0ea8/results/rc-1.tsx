// Copyright (c) Meta Platforms, Inc. and affiliates.

import {AppShell} from '@astryxdesign/core/AppShell';
import {TopNav, TopNavHeading, TopNavItem} from '@astryxdesign/core/TopNav';
import {MobileNav} from '@astryxdesign/core/MobileNav';
import {SideNavItem, SideNavSection} from '@astryxdesign/core/SideNav';
import {VStack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

export default function ResponsiveNavigation() {
  return (
    <AppShell
      topNav={
        <TopNav
          heading={<TopNavHeading>My App</TopNavHeading>}
          startContent={
            <>
              <TopNavItem label="Home" href="#" />
              <TopNavItem label="About" href="#" />
              <TopNavItem label="Services" href="#" />
              <TopNavItem label="Contact" href="#" />
            </>
          }
        />
      }
      mobileNav={
        <MobileNav header="Navigation">
          <SideNavSection title="Pages" isHeaderHidden>
            <SideNavItem label="Home" href="#" />
            <SideNavItem label="About" href="#" />
            <SideNavItem label="Services" href="#" />
            <SideNavItem label="Contact" href="#" />
          </SideNavSection>
        </MobileNav>
      }
    >
      <VStack gap={4} padding={4}>
        <Heading level={1}>Welcome</Heading>
        <Text>This navigation collapses to a hamburger menu on mobile viewports.</Text>
      </VStack>
    </AppShell>
  );
}
