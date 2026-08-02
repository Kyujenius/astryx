import React from 'react';
import {defineTheme} from '@astryxdesign/core/Theme';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Badge} from '@astryxdesign/core/Badge';

const brandTheme = defineTheme({
  name: 'brand',
  tokens: {
    accent: '#6366f1',
    background: '#ffffff',
    foreground: '#1e1e2e',
    muted: '#f1f5f9',
    border: '#e2e8f0',
    radius: '8px',
  },
});

export default function ThemedApp() {
  return (
    <div {...brandTheme.props}>
      <Card>
        <Heading level={1}>Brand Theme Demo</Heading>
        <Text>
          This page uses a custom brand theme with an indigo accent color.
        </Text>
        <div style={{display: 'flex', gap: '8px', marginTop: '16px'}}>
          <Button>Primary Action</Button>
          <Button variant="outlined">Secondary</Button>
          <Badge>Themed Badge</Badge>
        </div>
      </Card>
    </div>
  );
}
