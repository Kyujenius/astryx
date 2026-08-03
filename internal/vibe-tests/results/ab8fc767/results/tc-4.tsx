// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/Stack';
import {HStack} from '@astryxdesign/core/Stack';

interface ThemeOption {
  id: string;
  name: string;
  description: string;
  colors: {bg: string; text: string; accent: string};
}

const THEMES: ThemeOption[] = [
  {id: 'default', name: 'Default', description: 'Clean and minimal', colors: {bg: '#ffffff', text: '#1a1a1a', accent: '#0066cc'}},
  {id: 'midnight', name: 'Midnight', description: 'Dark purple ambiance', colors: {bg: '#1a0a2e', text: '#e8e0f0', accent: '#9b59b6'}},
  {id: 'forest', name: 'Forest', description: 'Dark green serenity', colors: {bg: '#0a1f0a', text: '#d4edda', accent: '#28a745'}},
];

export default function ThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState('default');

  return (
    <VStack gap={4} padding={4}>
      <Heading level={2}>Theme</Heading>
      <Text color="secondary">Choose a theme for your workspace.</Text>
      <HStack gap={3} wrap="wrap">
        {THEMES.map(theme => (
          <Card key={theme.id} padding={3} width={200}>
            <VStack gap={2}>
              <div
                style={{
                  width: '100%',
                  height: 80,
                  borderRadius: 8,
                  backgroundColor: theme.colors.bg,
                  border: '1px solid var(--color-border-default)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{color: theme.colors.accent, fontWeight: 600, fontSize: 14}}>Aa</span>
              </div>
              <Heading level={4}>{theme.name}</Heading>
              <Text type="supporting" color="secondary">{theme.description}</Text>
              <Button
                label={activeTheme === theme.id ? 'Active' : 'Apply'}
                variant={activeTheme === theme.id ? 'primary' : 'secondary'}
                isDisabled={activeTheme === theme.id}
                onClick={() => setActiveTheme(theme.id)}
              />
            </VStack>
          </Card>
        ))}
      </HStack>
    </VStack>
  );
}
