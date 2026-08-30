import React, {useState} from 'react';
import {Breadcrumbs, BreadcrumbItem} from '@astryxdesign/core/Breadcrumbs';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Badge} from '@astryxdesign/core/Badge';
import {StackItem} from '@astryxdesign/core/Stack';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  imagePlaceholder: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);

  return (
    <VStack gap={4} padding={4} maxWidth={960}>
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/electronics">Electronics</BreadcrumbItem>
        <BreadcrumbItem href="/electronics/headphones">Headphones</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Pro Wireless Headphones</BreadcrumbItem>
      </Breadcrumbs>

      <HStack gap={5} wrap="wrap">
        <StackItem size="fill">
          <div {...stylex.props(styles.imagePlaceholder)}>
            <Text color="secondary">Product Image</Text>
          </div>
        </StackItem>
        <StackItem size="fill">
          <VStack gap={3}>
            <VStack gap={1}>
              <HStack gap={1} vAlign="center">
                <Badge label="In Stock" variant="success" />
                <Badge label="Best Seller" variant="blue" />
              </HStack>
              <Heading level={1}>Pro Wireless Headphones</Heading>
              <Text type="large" weight="bold">$299.99</Text>
            </VStack>
            <Text>
              Premium noise-canceling wireless headphones with 30-hour battery life,
              adaptive EQ, and spatial audio support. Comfortable for all-day wear
              with memory foam ear cushions.
            </Text>
            <Card variant="muted" padding={2}>
              <VStack gap={1}>
                <Text type="supporting">Free shipping on orders over $50</Text>
                <Text type="supporting">30-day return policy</Text>
              </VStack>
            </Card>
            <HStack gap={2}>
              <Button label="Add to Cart" variant="primary" onClick={() => {}} />
              <Button label="Save for Later" variant="secondary" onClick={() => {}} />
            </HStack>
          </VStack>
        </StackItem>
      </HStack>
    </VStack>
  );
}
