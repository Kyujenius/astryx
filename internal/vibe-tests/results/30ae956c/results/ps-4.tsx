import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';

export default function ProductDetailPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex gap-1">
          <li><a href="/" className="hover:underline">Home</a> /</li>
          <li><a href="/category" className="hover:underline">Electronics</a> /</li>
          <li aria-current="page" className="font-medium text-foreground">Wireless Headphones Pro</li>
        </ol>
      </nav>
      <div className="grid grid-cols-2 gap-6">
        <div className="aspect-square bg-muted rounded-lg flex items-center justify-center text-5xl">🎧</div>
        <Card>
          <CardContent className="p-6 space-y-3">
            <Badge variant="outline" className="bg-green-50 text-green-700">In Stock</Badge>
            <h1 className="text-3xl font-bold">Wireless Headphones Pro</h1>
            <p className="text-2xl font-bold">$299.99</p>
            <p className="text-muted-foreground">Premium noise-cancelling headphones with 40-hour battery life, spatial audio, and adaptive EQ.</p>
            <div className="flex gap-2 mt-4">
              <Button>Add to Cart</Button>
              <Button variant="outline">Save for Later</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
