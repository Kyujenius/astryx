import {Button} from '@/components/ui/button';
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator} from '@/components/ui/breadcrumb';

export default function ProductDetailPage() {
  return (
    <div className="space-y-4 p-6">
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
      <div className="space-y-3">
        <h1 className="text-3xl font-bold">Premium Headphones</h1>
        <p className="text-sm text-muted-foreground">By AudioTech Co.</p>
        <p className="text-2xl font-bold">$299.99</p>
        <p>Experience crystal-clear audio with premium over-ear headphones.</p>
        <div className="flex gap-2">
          <Button>Add to Cart</Button>
          <Button variant="outline">Save for Later</Button>
        </div>
      </div>
    </div>
  );
}
