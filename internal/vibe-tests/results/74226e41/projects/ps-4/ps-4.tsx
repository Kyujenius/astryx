// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Breadcrumbs, BreadcrumbItem} from '@astryxdesign/core/Breadcrumbs';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

export default function ProductDetail() {
  return (
    <div>
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/electronics">Electronics</BreadcrumbItem>
        <BreadcrumbItem href="/electronics/audio">Audio</BreadcrumbItem>
        <BreadcrumbItem>Premium Headphones</BreadcrumbItem>
      </Breadcrumbs>
      <div style={{marginTop: 24}}>
        <Heading level={1}>Premium Headphones</Heading>
        <Card>
          <div style={{padding: 24}}>
            <Heading level={3}>Product Information</Heading>
            <Text>High-fidelity wireless headphones with active noise cancellation and 30-hour battery life.</Text>
            <div style={{marginTop: 16}}>
              <Text>Price: $299.99</Text>
              <Text>In Stock: Yes</Text>
              <Text>SKU: PH-2024-001</Text>
            </div>
          </div>
        </Card>
        <div style={{marginTop: 16}}>
          <Button label="Back to Audio" variant="ghost" onPress={() => window.history.back()} />
        </div>
      </div>
    </div>
  );
}