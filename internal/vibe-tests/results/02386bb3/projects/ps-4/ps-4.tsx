// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Breadcrumbs, BreadcrumbItem} from '@astryxdesign/core/Breadcrumbs';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

export default function ProductDetail() {
  return (
    <div className="p-6 max-w-2xl">
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/electronics">Electronics</BreadcrumbItem>
        <BreadcrumbItem href="/electronics/audio">Audio</BreadcrumbItem>
        <BreadcrumbItem>Premium Headphones</BreadcrumbItem>
      </Breadcrumbs>
      <div className="mt-6">
        <Heading level={1}>Premium Headphones</Heading>
        <Card>
          <div className="p-6 space-y-3">
            <Heading level={3}>Product Information</Heading>
            <Text>High-fidelity wireless headphones with active noise cancellation.</Text>
            <Text>Price: $299.99</Text>
          </div>
        </Card>
        <div className="mt-4">
          <Button label="Back" variant="ghost" onPress={() => window.history.back()} />
        </div>
      </div>
    </div>
  );
}