// Copyright (c) Meta Platforms, Inc. and affiliates.

import React from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {MediaTheme} from '@astryxdesign/core/theme';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  page: { padding: 32, display: 'flex', flexDirection: 'column', gap: 32 },
  dark: { backgroundColor: '#1a1a2e', borderRadius: 'var(--radius-lg)', padding: 32 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginTop: 16 },
});

export default function ThemedSection() {
  return (
    <div {...stylex.props(styles.page)}>
      <section>
        <Heading level={2}>Regular section</Heading>
        <Text>Default theme content.</Text>
      </section>
      <section {...stylex.props(styles.dark)}>
        <MediaTheme mode="dark">
          <Heading level={2}>Featured</Heading>
          <Text color="secondary">Dark themed section.</Text>
          <div {...stylex.props(styles.grid)}>
            <Card><div style={{padding: 16}}><Heading level={4}>Premium</Heading><Text type="supporting">Best for teams</Text><Button variant="filled" onPress={() => {}}>Upgrade</Button></div></Card>
            <Card><div style={{padding: 16}}><Heading level={4}>Enterprise</Heading><Text type="supporting">Custom solutions</Text><Button variant="outlined" onPress={() => {}}>Contact</Button></div></Card>
          </div>
        </MediaTheme>
      </section>
    </div>
  );
}
