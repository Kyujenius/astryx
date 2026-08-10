// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Divider} from '@astryxdesign/core/Divider';

const navItems = ['Dashboard', 'Projects', 'Analytics', 'Settings', 'Help'];

export default function ResponsiveSidebar() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-[280px] border-r border-gray-200 max-md:fixed max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:w-full max-md:border-r-0 max-md:border-t max-md:border-gray-200 max-md:max-h-[40vh] max-md:z-50">
        <div className="flex flex-col gap-1 p-3">
          <Heading level={5}>Navigation</Heading>
          <Divider />
          {navItems.map(item => (
            <Button key={item} label={item} variant="ghost" width="100%" />
          ))}
        </div>
      </aside>
      <main className="flex-1 p-6">
        <div className="flex flex-col gap-3">
          <Heading level={2}>Main Content</Heading>
          <Text type="body">This sidebar becomes a bottom sheet on mobile viewports.</Text>
        </div>
      </main>
    </div>
  );
}
