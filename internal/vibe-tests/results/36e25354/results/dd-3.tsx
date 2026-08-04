// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';

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
    <div className="p-8 space-y-6">
      <h2 className="text-2xl font-bold">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
            <CardHeader>
              <CardTitle className="text-lg">{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add to cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
