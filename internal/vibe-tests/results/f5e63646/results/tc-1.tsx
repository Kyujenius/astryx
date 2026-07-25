// Copyright (c) Meta Platforms, Inc. and affiliates.

import {VStack} from '@astryxdesign/core/Stack';
import {Theme} from '@astryxdesign/core/theme';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Card} from '@astryxdesign/core/Card';
import {neutralTheme} from '@astryxdesign/theme-neutral';
import {useState} from 'react';

export default function DarkModeToggle() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  return (
    <Theme theme={neutralTheme} mode={mode}>
      <div className="min-h-screen p-8">
        <VStack gap={4} maxWidth={400}>
          <Heading level={2}>Appearance</Heading>
          <Card>
            <VStack gap={3}>
              <Text>Current: {mode} mode</Text>
              <Button
                label={mode === 'light' ? 'Enable dark mode' : 'Enable light mode'}
                variant="secondary"
                onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
              />
            </VStack>
          </Card>
        </VStack>
      </div>
    </Theme>
  );
}
