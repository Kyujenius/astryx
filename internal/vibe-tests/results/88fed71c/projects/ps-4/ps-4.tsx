// Copyright (c) Meta Platforms, Inc. and affiliates.

"use client";
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator} from '@/components/ui/breadcrumb';

export default function ProductDetail() {
  return (
    <div className="p-6 max-w-2xl">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="/electronics">Electronics</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="/electronics/audio">Audio</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Premium Headphones</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-bold mt-6">Premium Headphones</h1>
      <Card className="mt-4">
        <CardHeader><CardTitle>Product Information</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <p>High-fidelity wireless headphones with active noise cancellation.</p>
          <p>Price: $299.99</p>
          <p>In Stock: Yes</p>
        </CardContent>
      </Card>
      <Button variant="ghost" className="mt-4" onClick={() => window.history.back()}>Back</Button>
    </div>
  );
}