// Copyright (c) Meta Platforms, Inc. and affiliates.

import {VStack} from '@astryxdesign/core/Stack';
import {Theme} from '@astryxdesign/core/theme';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {useState} from 'react';
import {neutralTheme} from '@astryxdesign/theme-neutral';

export default function DarkModeToggle() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  return (
    <Theme theme={neutralTheme} mode={mode}>
      <VStack gap={4} padding={4} maxWidth={400}>
        <Heading level={2}>Theme Settings</Heading>
        <Card>
          <VStack gap={3}>
            <Text>Current mode: {mode}</Text>
            <Button
              label={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              variant="secondary"
              onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
            />
          </VStack>
        </Card>
      </VStack>
    </Theme>
  );
}
