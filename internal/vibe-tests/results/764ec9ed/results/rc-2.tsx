// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';
import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Layout, LayoutContent, LayoutPanel} from '@astryxdesign/core/Layout';

const filters = ['All', 'Electronics', 'Clothing', 'Books', 'Home'];

export default function ResponsiveSidebar() {
  const [selected, setSelected] = useState('All');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const filterContent = (
    <VStack gap={2} padding={3}>
      <Heading level={3}>Filters</Heading>
      {filters.map((filter) => (
        <Button
          key={filter}
          label={filter}
          variant={selected === filter ? 'primary' : 'ghost'}
          onClick={() => setSelected(filter)}
          width="100%"
        />
      ))}
    </VStack>
  );

  return (
    <Layout>
      <LayoutPanel position="start" width={260} isCollapsible>
        {filterContent}
      </LayoutPanel>
      <LayoutContent>
        <VStack gap={3} padding={4}>
          <Heading level={2}>Products: {selected}</Heading>
          <Text>Showing items in the {selected} category.</Text>
          <Card padding={4}>
            <Text>Product listing content goes here.</Text>
          </Card>
        </VStack>
      </LayoutContent>
    </Layout>
  );
}
