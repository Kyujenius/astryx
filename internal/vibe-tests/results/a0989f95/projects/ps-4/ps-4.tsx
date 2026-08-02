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
    <div>
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/electronics">Electronics</BreadcrumbItem>
        <BreadcrumbItem>Wireless Headphones Pro</BreadcrumbItem>
      </Breadcrumbs>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '24px'}}>
        <div style={{backgroundColor: '#f5f5f5', borderRadius: '12px', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Text>Product Image</Text>
        </div>

        <div>
          <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
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

          <div style={{display: 'flex', gap: '12px', marginTop: '16px'}}>
            <Button>Add to Cart</Button>
            <Button variant="outlined">Add to Wishlist</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
