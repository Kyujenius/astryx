// Copyright (c) Meta Platforms, Inc. and affiliates.

import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Breadcrumbs, BreadcrumbItem} from '@astryxdesign/core/Breadcrumbs';
import {Card} from '@astryxdesign/core/Card';
import {Divider} from '@astryxdesign/core/Divider';

export default function ProductDetailPage() {
  return (
    <VStack gap={4} padding={4}>
      <Breadcrumbs label="Product navigation">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/electronics">Electronics</BreadcrumbItem>
        <BreadcrumbItem href="/electronics/audio">Audio</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Premium Headphones</BreadcrumbItem>
      </Breadcrumbs>

      <Button label="Back" variant="ghost" onClick={() => history.back()} />

      <VStack gap={3}>
        <Heading level={1}>Premium Headphones</Heading>
        <Text type="large">$299.99</Text>
        <Divider />
        <Card padding={3}>
          <VStack gap={2}>
            <Heading level={4}>Product Details</Heading>
            <Text type="body">
              High-fidelity wireless headphones with active noise cancellation,
              40-hour battery life, and premium comfort for all-day listening.
            </Text>
            <HStack gap={2}>
              <Button label="Add to Cart" variant="primary" />
              <Button label="Save for Later" variant="secondary" />
            </HStack>
          </VStack>
        </Card>
      </VStack>
    </VStack>
  );
}
