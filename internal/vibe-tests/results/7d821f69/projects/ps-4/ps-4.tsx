import React from 'react';
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator} from '@/components/ui/breadcrumb';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

export default function ProductDetailPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="/electronics">Electronics</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Wireless Headphones Pro</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <div className="bg-muted rounded-xl aspect-square flex items-center justify-center">
          <span className="text-muted-foreground">Product Image</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Wireless Headphones Pro</h1>
            <Badge>New</Badge>
          </div>
          <p className="text-xl font-semibold">$299.99</p>

          <Card>
            <CardHeader><CardTitle>Description</CardTitle></CardHeader>
            <CardContent>
              Premium wireless headphones with active noise cancellation,
              40-hour battery life, and spatial audio support.
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button>Add to Cart</Button>
            <Button variant="outline">Add to Wishlist</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
