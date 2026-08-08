// Copyright (c) Meta Platforms, Inc. and affiliates.

import {AppShell} from '@astryxdesign/core/AppShell';
import {TopNav} from '@astryxdesign/core/TopNav';
import {TopNavItem} from '@astryxdesign/core/TopNav';
import {TopNavHeading} from '@astryxdesign/core/TopNav';
import {Button} from '@astryxdesign/core/Button';
import {useState} from 'react';

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
          endContent={<Button label="Sign in" variant="primary" size="sm" />}
        />
      }
    >
      <div className="p-6">
        <p className="text-lg">Current page: {currentPage}</p>
      </div>
    </AppShell>
  );
}
