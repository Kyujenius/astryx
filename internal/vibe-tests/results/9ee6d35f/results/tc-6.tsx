// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Selector} from '@astryxdesign/core/Selector';
import {Slider} from '@astryxdesign/core/Slider';
import {Card} from '@astryxdesign/core/Card';
import {Theme} from '@astryxdesign/core';
import {neutralTheme} from '@astryxdesign/theme-neutral';
import {defineTheme} from '@astryxdesign/core/theme';

export default function AppearanceSettings() {
  const [accentColor, setAccentColor] = useState('blue');
  const [borderRadius, setBorderRadius] = useState(8);
  const [spacingScale, setSpacingScale] = useState(1);

  const customTheme = defineTheme({
    name: 'custom',
    tokens: {
      color: {
        accent: accentColor === 'blue' ? '#3b82f6' : accentColor === 'purple' ? '#8b5cf6' : '#22c55e',
      },
      shape: {
        radius: `${borderRadius}px`,
      },
    },
  });

  return (
    <div className="max-w-lg mx-auto py-8">
      <VStack gap={6}>
        <Heading level={1}>Appearance</Heading>
        <Text color="secondary">Changes apply via the Astryx theme system.</Text>

        <Card padding={4}>
          <VStack gap={3}>
            <Heading level={3}>Accent Color</Heading>
            <Selector label="Color" isLabelHidden options={[
              {value: 'blue', label: 'Blue'},
              {value: 'purple', label: 'Purple'},
              {value: 'green', label: 'Green'},
            ]} value={accentColor} onChange={setAccentColor} />
          </VStack>
        </Card>

        <Card padding={4}>
          <VStack gap={3}>
            <Heading level={3}>Border Radius</Heading>
            <Slider label="Radius" value={borderRadius} onChange={setBorderRadius} min={0} max={24} step={2} formatValue={v => `${v}px`} />
          </VStack>
        </Card>

        <Card padding={4}>
          <VStack gap={3}>
            <Heading level={3}>Spacing Scale</Heading>
            <Slider label="Scale" value={spacingScale} onChange={setSpacingScale} min={0.5} max={2} step={0.25} formatValue={v => `${v}x`} />
          </VStack>
        </Card>
      </VStack>
    </div>
  );
}
