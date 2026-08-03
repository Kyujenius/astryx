// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useEffect} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Layout} from '@astryxdesign/core/Layout';
import {LayoutPanel} from '@astryxdesign/core/Layout';
import {LayoutContent} from '@astryxdesign/core/Layout';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/Stack';
import {Button} from '@astryxdesign/core/Button';

const NAV_ITEMS = ['Dashboard', 'Analytics', 'Settings', 'Help'];

export default function ResponsiveSidebar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('Dashboard');

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const navContent = (
    <VStack gap={1} padding={2}>
      <Heading level={3}>Navigation</Heading>
      {NAV_ITEMS.map(item => (
        <Button
          key={item}
          label={item}
          variant={selected === item ? 'primary' : 'ghost'}
          onClick={() => { setSelected(item); setIsOpen(false); }}
        />
      ))}
    </VStack>
  );

  if (isMobile) {
    return (
      <VStack gap={0} height="100%">
        <VStack padding={2}>
          <Heading level={2}>{selected}</Heading>
          <Text color="secondary">Content for the {selected} section goes here.</Text>
        </VStack>
        {isOpen && (
          <div style={{position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10}}>
            <Card padding={0} elevation="high">
              {navContent}
            </Card>
          </div>
        )}
        <div style={{position: 'fixed', bottom: isOpen ? 'auto' : 16, right: 16}}>
          <Button label={isOpen ? 'Close' : 'Menu'} variant="primary" onClick={() => setIsOpen(!isOpen)} />
        </div>
      </VStack>
    );
  }

  return (
    <Layout
      start={
        <LayoutPanel width={240} hasDivider>
          {navContent}
        </LayoutPanel>
      }
      content={
        <LayoutContent padding={4}>
          <VStack gap={2}>
            <Heading level={2}>{selected}</Heading>
            <Text color="secondary">Content for the {selected} section goes here.</Text>
          </VStack>
        </LayoutContent>
      }
    />
  );
}
