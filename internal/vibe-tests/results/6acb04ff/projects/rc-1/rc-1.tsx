// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {AppShell} from '@astryxdesign/core/AppShell';
import {Button} from '@astryxdesign/core/Button';
import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';

export default function ResponsiveNav() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ['Home', 'About', 'Services', 'Contact'];

  return (
    <div>
      <header style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #e5e5e5'}}>
        <Heading level={3}>Logo</Heading>
        <nav style={{display: 'none'}}>
          <Stack direction="horizontal" gap={3}>
            {navItems.map((item) => (
              <Text key={item} weight="medium">{item}</Text>
            ))}
          </Stack>
        </nav>
        <Button
          label="Menu"
          variant="ghost"
          isIconOnly
          onClick={() => setIsOpen(!isOpen)}
        />
      </header>
      {isOpen && (
        <nav style={{padding: 16, borderBottom: '1px solid #e5e5e5'}}>
          <Stack gap={2}>
            {navItems.map((item) => (
              <Button key={item} label={item} variant="ghost" />
            ))}
          </Stack>
        </nav>
      )}
    </div>
  );
}
