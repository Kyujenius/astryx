// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {AppShell} from '@astryxdesign/core/AppShell';
import {TopNav} from '@astryxdesign/core/TopNav';
import {TopNavItem} from '@astryxdesign/core/TopNav';
import {TopNavHeading} from '@astryxdesign/core/TopNav';
import {Button} from '@astryxdesign/core/Button';
import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';

export default function ResponsiveNav() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <AppShell
      topNav={
        <TopNav
          heading={<TopNavHeading>MyApp</TopNavHeading>}
          startContent={
            <>
              <TopNavItem isSelected={currentPage === 'home'} onClick={() => setCurrentPage('home')}>Home</TopNavItem>
              <TopNavItem isSelected={currentPage === 'about'} onClick={() => setCurrentPage('about')}>About</TopNavItem>
              <TopNavItem isSelected={currentPage === 'contact'} onClick={() => setCurrentPage('contact')}>Contact</TopNavItem>
            </>
          }
          endContent={
            <Button label="Sign in" variant="primary" size="sm" />
          }
        />
      }
    >
      <Stack padding={4} gap={3}>
        <Text type="large">Current page: {currentPage}</Text>
      </Stack>
    </AppShell>
  );
}
