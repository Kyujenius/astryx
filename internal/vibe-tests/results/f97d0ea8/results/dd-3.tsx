// Copyright (c) Meta Platforms, Inc. and affiliates.

import {VStack, HStack} from '@astryxdesign/core/Stack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {Thumbnail} from '@astryxdesign/core/Thumbnail';
import {Grid} from '@astryxdesign/core/Grid';
import {Badge} from '@astryxdesign/core/Badge';

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
}

const PRODUCTS: Product[] = [
  {id: '1', title: 'Wireless Headphones', price: 79.99, image: 'https://picsum.photos/seed/1/300/200'},
  {id: '2', title: 'Smart Watch', price: 199.99, image: 'https://picsum.photos/seed/2/300/200'},
  {id: '3', title: 'Portable Speaker', price: 49.99, image: 'https://picsum.photos/seed/3/300/200'},
  {id: '4', title: 'USB-C Hub', price: 34.99, image: 'https://picsum.photos/seed/4/300/200'},
];

export default function ProductGrid() {
  return (
    <VStack gap={4} padding={4}>
      <Heading level={2}>Products</Heading>
      <Grid columns={2} gap={4}>
        {PRODUCTS.map((product) => (
          <Card key={product.id} padding={0}>
            <VStack gap={3}>
              <Thumbnail src={product.image} alt={product.title} />
              <VStack gap={2} padding={3}>
                <Text weight="semibold">{product.title}</Text>
                <HStack gap={2} vAlign="center">
                  <Text weight="bold">${product.price.toFixed(2)}</Text>
                  <Badge label="In Stock" variant="green" />
                </HStack>
                <Button label="Add to cart" variant="primary" />
              </VStack>
            </VStack>
          </Card>
        ))}
      </Grid>
    </VStack>
  );
}
