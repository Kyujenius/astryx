// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';

const PRODUCTS = [
  {id: '1', title: 'Wireless Headphones', price: 79.99, image: 'https://picsum.photos/seed/1/300/200'},
  {id: '2', title: 'Smart Watch', price: 199.99, image: 'https://picsum.photos/seed/2/300/200'},
  {id: '3', title: 'Portable Speaker', price: 49.99, image: 'https://picsum.photos/seed/3/300/200'},
  {id: '4', title: 'USB-C Hub', price: 34.99, image: 'https://picsum.photos/seed/4/300/200'},
];

export default function ProductGrid() {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Products</h2>
      <div className="grid grid-cols-2 gap-4">
        {PRODUCTS.map((p) => (
          <Card key={p.id} className="overflow-hidden">
            <img src={p.image} alt={p.title} className="w-full h-40 object-cover" />
            <CardContent className="p-4 space-y-2">
              <p className="font-semibold">{p.title}</p>
              <div className="flex items-center gap-2">
                <span className="font-bold">${p.price.toFixed(2)}</span>
                <Badge variant="secondary">In Stock</Badge>
              </div>
              <Button className="w-full">Add to Cart</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
