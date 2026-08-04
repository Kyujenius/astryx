// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';
import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';

export default function ProductDetail() {
  return (
    <div className="p-8 space-y-4 max-w-6xl mx-auto">
      <nav aria-label="Breadcrumb">
        <ol className="flex gap-2 text-sm text-muted-foreground">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li>/</li>
          <li><a href="/electronics" className="hover:underline">Electronics</a></li>
          <li>/</li>
          <li><a href="/electronics/audio" className="hover:underline">Audio</a></li>
          <li>/</li>
          <li className="text-foreground font-medium">Wireless Headphones Pro</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold">Wireless Headphones Pro</h1>

      <div className="flex gap-8">
        <img
          src="https://picsum.photos/seed/product/500/500"
          alt="Wireless Headphones Pro"
          className="w-96 h-96 object-cover rounded-lg"
        />
        <div className="flex flex-col gap-4">
          <p className="text-3xl font-bold">$299.99</p>
          <p className="text-muted-foreground">Premium noise-canceling wireless headphones with 40-hour battery life, custom drivers, and multipoint Bluetooth connection.</p>
          <Card>
            <CardContent className="py-3">
              <p className="text-sm text-muted-foreground">Free shipping on orders over $50</p>
              <p className="text-sm text-muted-foreground">30-day return policy</p>
            </CardContent>
          </Card>
          <div className="flex gap-3">
            <Button>Add to cart</Button>
            <Button variant="outline">Add to wishlist</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
