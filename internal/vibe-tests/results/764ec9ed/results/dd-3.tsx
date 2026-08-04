// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {HStack} from '@astryxdesign/core/HStack';
import {VStack} from '@astryxdesign/core/VStack';
import {Thumbnail} from '@astryxdesign/core/Thumbnail';

const products = [
  {id: 1, name: 'Wireless Headphones', price: 79.99, image: 'https://picsum.photos/seed/headphones/300/200'},
  {id: 2, name: 'Laptop Stand', price: 49.99, image: 'https://picsum.photos/seed/stand/300/200'},
  {id: 3, name: 'Mechanical Keyboard', price: 129.99, image: 'https://picsum.photos/seed/keyboard/300/200'},
  {id: 4, name: 'USB-C Hub', price: 39.99, image: 'https://picsum.photos/seed/hub/300/200'},
  {id: 5, name: 'Monitor Light', price: 59.99, image: 'https://picsum.photos/seed/light/300/200'},
  {id: 6, name: 'Webcam HD', price: 89.99, image: 'https://picsum.photos/seed/webcam/300/200'},
];

export default function ProductGrid() {
  return (
    <VStack gap={4} padding={4}>
      <Heading level={2}>Products</Heading>
      <HStack gap={3}>
        {products.map((product) => (
          <Card key={product.id} padding={0} width={280}>
            <VStack gap={2}>
              <Thumbnail
                src={product.image}
                alt={product.name}
                width="100%"
                aspectRatio="3/2"
                shape="rounded"
              />
              <VStack gap={1} padding={3}>
                <Heading level={4}>{product.name}</Heading>
                <Text type="large" weight="semibold">${product.price.toFixed(2)}</Text>
                <Button label="Add to cart" variant="primary" width="100%" />
              </VStack>
            </VStack>
          </Card>
        ))}
      </HStack>
    </VStack>
  );
}
