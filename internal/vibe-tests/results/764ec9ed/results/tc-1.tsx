// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';
import {useState} from 'react';
import {Theme} from '@astryxdesign/core/theme';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {neutralTheme} from '@astryxdesign/theme-neutral';

export default function DarkModeToggle() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  return (
    <Theme theme={neutralTheme} mode={mode}>
      <VStack gap={4} padding={4}>
        <Heading level={2}>Theme Switcher</Heading>
        <Text>Current mode: {mode}</Text>
        <Button
          label={mode === 'light' ? 'Switch to Dark' : 'Switch to Light'}
          variant="primary"
          onClick={() => setMode((m) => (m === 'light' ? 'dark' : 'light'))}
        />
        <Card padding={4}>
          <VStack gap={2}>
            <Heading level={3}>Sample Content</Heading>
            <Text>This content adapts to the current theme mode. Colors, backgrounds, and contrast all switch automatically.</Text>
          </VStack>
        </Card>
      </VStack>
    </Theme>
  );
}
