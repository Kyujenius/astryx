import React from 'react';
import {Layout} from '@astryxdesign/core/Layout';
import {LayoutPanel} from '@astryxdesign/core/Layout';
import {LayoutContent} from '@astryxdesign/core/Layout';
import {VStack} from '@astryxdesign/core/VStack';
import {Text} from '@astryxdesign/core/Text';
import {Heading} from '@astryxdesign/core/Heading';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  sidebar: {
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  mobileSheet: {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'block',
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'var(--color-background-default)',
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      boxShadow: 'var(--shadow-high)',
      padding: 16,
      zIndex: 100,
    },
  },
});

function SidebarContent() {
  return (
    <VStack gap={3}>
      <Heading level={3}>Filters</Heading>
      <VStack gap={2}>
        <Button label="All Items" variant="ghost" onClick={() => {}} />
        <Button label="Active" variant="ghost" onClick={() => {}} />
        <Button label="Archived" variant="ghost" onClick={() => {}} />
        <Button label="Starred" variant="ghost" onClick={() => {}} />
      </VStack>
      <Text type="supporting">4 categories available</Text>
    </VStack>
  );
}

export default function ResponsiveSidebar() {
  return (
    <>
      <Layout
        height="fill"
        start={
          <div {...stylex.props(styles.sidebar)}>
            <LayoutPanel width={260} hasDivider label="Sidebar navigation">
              <SidebarContent />
            </LayoutPanel>
          </div>
        }
      >
        <LayoutContent padding={4}>
          <VStack gap={3}>
            <Heading level={1}>Content Area</Heading>
            <Text>Main content goes here. On mobile, the sidebar filters appear as a bottom sheet.</Text>
            <Card padding={3}>
              <Text>Example content card with details and information.</Text>
            </Card>
          </VStack>
        </LayoutContent>
      </Layout>
      <div {...stylex.props(styles.mobileSheet)}>
        <SidebarContent />
      </div>
    </>
  );
}
