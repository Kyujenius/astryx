import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Separator} from '@/components/ui/separator';

export default function ProductDetail() {
  return (
    <div className="space-y-4 p-4">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground">
        <a href="/" className="hover:text-foreground">Home</a>
        <span>/</span>
        <a href="/electronics" className="hover:text-foreground">Electronics</a>
        <span>/</span>
        <a href="/electronics/audio" className="hover:text-foreground">Audio</a>
        <span>/</span>
        <span className="text-foreground">Wireless Headphones Pro</span>
      </nav>
      <div className="flex gap-6 flex-wrap">
        <Card className="w-[400px] h-[400px] flex items-center justify-center">
          <CardContent>
            <p className="text-muted-foreground">Product Image</p>
          </CardContent>
        </Card>
        <div className="space-y-4 w-[400px]">
          <div className="flex gap-2">
            <Badge variant="secondary">In Stock</Badge>
            <Badge>New</Badge>
          </div>
          <h1 className="text-3xl font-bold">Wireless Headphones Pro</h1>
          <p className="text-muted-foreground">Premium noise-canceling wireless headphones with 40-hour battery life.</p>
          <Separator />
          <p className="text-2xl font-bold">$299.99</p>
          <div className="flex gap-2">
            <Button>Add to cart</Button>
            <Button variant="outline">Add to wishlist</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
