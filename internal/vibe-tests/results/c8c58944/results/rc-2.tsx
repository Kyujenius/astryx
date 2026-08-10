// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useEffect} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Divider} from '@astryxdesign/core/Divider';
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    display: 'flex',
    minHeight: '100vh',
  },
  sidebar: {
    width: 280,
    borderInlineEnd: '1px solid var(--color-border-default)',
    '@media (max-width: 768px)': {
      position: 'fixed',
      insetBlockEnd: 0,
      insetInlineStart: 0,
      insetInlineEnd: 0,
      width: '100%',
      borderInlineEnd: 'none',
      borderBlockStart: '1px solid var(--color-border-default)',
      maxHeight: '40vh',
      zIndex: 100,
    },
  },
  main: {
    flex: 1,
  },
});

const navItems = ['Dashboard', 'Projects', 'Analytics', 'Settings', 'Help'];

export default function ResponsiveSidebar() {
  return (
    <div {...stylex.props(styles.container)}>
      <aside {...stylex.props(styles.sidebar)}>
        <VStack gap={1} padding={3}>
          <Heading level={5}>Navigation</Heading>
          <Divider />
          {navItems.map(item => (
            <Button key={item} label={item} variant="ghost" width="100%" />
          ))}
        </VStack>
      </aside>
      <main {...stylex.props(styles.main)}>
        <VStack gap={3} padding={4}>
          <Heading level={2}>Main Content</Heading>
          <Text type="body">This sidebar becomes a bottom sheet on mobile viewports.</Text>
        </VStack>
      </main>
    </div>
  );
}
