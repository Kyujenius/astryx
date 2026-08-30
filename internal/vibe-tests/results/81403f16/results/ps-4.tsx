import React from 'react';
import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';

export default function ProductDetailPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <nav className="text-sm text-muted-foreground"><a href="/" className="hover:underline">Home</a><span className="mx-2">/</span><a href="/electronics" className="hover:underline">Electronics</a><span className="mx-2">/</span><a href="/electronics/headphones" className="hover:underline">Headphones</a><span className="mx-2">/</span><span>Pro Wireless Headphones</span></nav>
      <div className="flex flex-wrap gap-8">
        <div className="flex-1 min-w-[300px] bg-muted rounded-lg h-72 flex items-center justify-center"><span className="text-muted-foreground">Product Image</span></div>
        <div className="flex-1 min-w-[300px] space-y-4">
          <div className="flex gap-2"><Badge>In Stock</Badge><Badge variant="secondary">Best Seller</Badge></div>
          <h1 className="text-3xl font-bold">Pro Wireless Headphones</h1>
          <p className="text-2xl font-bold">$299.99</p>
          <p className="text-muted-foreground">Premium noise-canceling wireless headphones with 30-hour battery life, adaptive EQ, and spatial audio support.</p>
          <Card><CardContent className="pt-4 space-y-1"><p className="text-sm text-muted-foreground">Free shipping on orders over $50</p><p className="text-sm text-muted-foreground">30-day return policy</p></CardContent></Card>
          <div className="flex gap-2"><Button>Add to Cart</Button><Button variant="outline">Save for Later</Button></div>
        </div>
      </div>
    </div>
  );
}
