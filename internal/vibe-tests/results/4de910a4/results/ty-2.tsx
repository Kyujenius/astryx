// Copyright (c) Meta Platforms, Inc. and affiliates.

import React from 'react';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Avatar} from '@astryxdesign/core/Avatar';
import {Badge} from '@astryxdesign/core/Badge';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  header: { maxWidth: 720, marginInline: 'auto', paddingBlock: 48, display: 'flex', flexDirection: 'column', gap: 16 },
  meta: { display: 'flex', alignItems: 'center', gap: 12, paddingTop: 8 },
});

export default function BlogPostHeader() {
  return (
    <header {...stylex.props(styles.header)}>
      <Badge variant="accent">Design Systems</Badge>
      <Heading level={1} type="display-1">The Future of Component Architecture</Heading>
      <Text type="large" color="secondary">How compositional patterns and design tokens reshape UI development at scale.</Text>
      <div {...stylex.props(styles.meta)}>
        <Avatar name="Sarah Chen" size="medium" />
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <Text>Sarah Chen</Text>
          <Text type="supporting" color="secondary">July 26, 2026</Text>
        </div>
      </div>
    </header>
  );
}
