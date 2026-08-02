import React from 'react';
import {Breadcrumbs} from '@astryxdesign/core/Breadcrumbs';
import {BreadcrumbItem} from '@astryxdesign/core/Breadcrumbs';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Badge} from '@astryxdesign/core/Badge';
import {Card} from '@astryxdesign/core/Card';

export default function ProductDetailPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/electronics">Electronics</BreadcrumbItem>
        <BreadcrumbItem>Wireless Headphones Pro</BreadcrumbItem>
      </Breadcrumbs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <div className="bg-gray-100 rounded-xl aspect-square flex items-center justify-center">
          <Text>Product Image</Text>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Heading level={1}>Wireless Headphones Pro</Heading>
            <Badge>New</Badge>
          </div>
          <Text>$299.99</Text>

          <Card>
            <Heading level={3}>Description</Heading>
            <Text>
              Premium wireless headphones with active noise cancellation,
              40-hour battery life, and spatial audio support.
            </Text>
          </Card>

          <div className="flex gap-3 mt-4">
            <Button>Add to Cart</Button>
            <Button variant="outlined">Add to Wishlist</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
