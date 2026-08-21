import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';

export default function ProductDetailPage() {
  return (
    <div className="flex flex-col gap-4 p-6 max-w-3xl">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1 text-sm text-muted-foreground">
          <li><a href="/" className="hover:text-foreground">Home</a></li>
          <li>/</li>
          <li><a href="/electronics" className="hover:text-foreground">Electronics</a></li>
          <li>/</li>
          <li><a href="/electronics/audio" className="hover:text-foreground">Audio</a></li>
          <li>/</li>
          <li className="text-foreground font-medium" aria-current="page">Premium Headphones</li>
        </ol>
      </nav>
      <h1 className="text-3xl font-bold">Premium Headphones</h1>
      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p>High-quality noise-canceling headphones with 30-hour battery life, premium drivers, and comfortable over-ear design.</p>
          <Separator />
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">$299.99</span>
            <span className="text-sm text-muted-foreground">Free shipping</span>
          </div>
          <div className="flex gap-2">
            <Button>Add to Cart</Button>
            <Button variant="ghost" onClick={() => history.back()}>Back</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
