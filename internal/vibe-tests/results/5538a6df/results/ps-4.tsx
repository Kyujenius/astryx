// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from '@/components/ui/breadcrumb';

export default function ProductDetailPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="/electronics">Electronics</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="/electronics/audio">Audio</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Premium Headphones</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Button variant="ghost" onClick={() => history.back()}>Back</Button>

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Premium Headphones</h1>
        <p className="text-xl font-semibold">$299.99</p>
        <Separator />
        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <p className="text-muted-foreground">
              High-fidelity wireless headphones with active noise cancellation,
              40-hour battery life, and premium comfort for all-day listening.
            </p>
            <div className="flex gap-3">
              <Button>Add to Cart</Button>
              <Button variant="outline">Save for Later</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
