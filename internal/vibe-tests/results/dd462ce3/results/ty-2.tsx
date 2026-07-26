// Copyright (c) Meta Platforms, Inc. and affiliates.

import React from 'react';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Avatar} from '@astryxdesign/core/Avatar';
import {Badge} from '@astryxdesign/core/Badge';

export default function BlogPostHeader() {
  return (
    <header className="max-w-2xl mx-auto py-12 flex flex-col gap-4">
      <Badge variant="accent">Design Systems</Badge>
      <Heading level={1} type="display-1">The Future of Component Architecture</Heading>
      <Text type="large" color="secondary">Compositional patterns and design tokens reshaping UI at scale.</Text>
      <div className="flex items-center gap-3 pt-2">
        <Avatar name="Sarah Chen" size="medium" />
        <div className="flex flex-col"><Text>Sarah Chen</Text><Text type="supporting" color="secondary">July 26, 2026</Text></div>
      </div>
    </header>
  );
}
