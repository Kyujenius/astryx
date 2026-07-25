// Copyright (c) Meta Platforms, Inc. and affiliates.

import {VStack, HStack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {Thumbnail} from '@astryxdesign/core/Thumbnail';
import {Badge} from '@astryxdesign/core/Badge';

const PRODUCTS = [
  {id: '1', title: 'Wireless Headphones', price: 79.99, image: 'https://picsum.photos/seed/1/300/200'},
  {id: '2', title: 'Smart Watch', price: 199.99, image: 'https://picsum.photos/seed/2/300/200'},
  {id: '3', title: 'Portable Speaker', price: 49.99, image: 'https://picsum.photos/seed/3/300/200'},
  {id: '4', title: 'USB-C Hub', price: 34.99, image: 'https://picsum.photos/seed/4/300/200'},
];

export default function ProductGrid() {
  return (
    <VStack gap={4} padding={4}>
      <Heading level={2}>Products</Heading>
      <div className="grid grid-cols-2 gap-4">
        {PRODUCTS.map((p) => (
          <Card key={p.id} padding={0}>
            <VStack gap={2}>
              <Thumbnail src={p.image} alt={p.title} />
              <VStack gap={2} padding={3}>
                <Text weight="semibold">{p.title}</Text>
                <HStack gap={2} vAlign="center">
                  <Text weight="bold">${p.price.toFixed(2)}</Text>
                  <Badge label="In Stock" variant="green" />
                </HStack>
                <Button label="Add to cart" variant="primary" />
              </VStack>
            </VStack>
          </Card>
        ))}
      </div>
    </VStack>
  );
}
