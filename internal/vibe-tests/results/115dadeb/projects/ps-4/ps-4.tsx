// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';
import {Breadcrumbs, BreadcrumbItem} from '@astryxdesign/core/Breadcrumbs';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {HStack} from '@astryxdesign/core/HStack';
import {VStack} from '@astryxdesign/core/VStack';
import {Thumbnail} from '@astryxdesign/core/Thumbnail';

export default function ProductDetail() {
  return (
    <VStack gap={4} padding={4}>
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/electronics">Electronics</BreadcrumbItem>
        <BreadcrumbItem href="/electronics/audio">Audio</BreadcrumbItem>
        <BreadcrumbItem>Wireless Headphones Pro</BreadcrumbItem>
      </Breadcrumbs>

      <Heading level={1}>Wireless Headphones Pro</Heading>

      <HStack gap={6}>
        <Thumbnail
          src="https://picsum.photos/seed/product/500/500"
          alt="Wireless Headphones Pro"
          width={400}
          height={400}
          shape="rounded"
        />
        <VStack gap={3}>
          <Text type="display-2">$299.99</Text>
          <Text>Premium noise-canceling wireless headphones with 40-hour battery life, custom drivers, and multipoint Bluetooth connection.</Text>
          <Card padding={3} variant="muted">
            <VStack gap={1}>
              <Text type="supporting">Free shipping on orders over $50</Text>
              <Text type="supporting">30-day return policy</Text>
            </VStack>
          </Card>
          <HStack gap={2}>
            <Button label="Add to cart" variant="primary" />
            <Button label="Add to wishlist" variant="secondary" />
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
}
