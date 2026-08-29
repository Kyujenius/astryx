import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Separator} from '@/components/ui/separator';

export default function ProductDetail() {
  return (
    <div className="space-y-6 max-w-2xl">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <a href="/" className="hover:text-foreground">Home</a><span>/</span>
        <a href="/electronics" className="hover:text-foreground">Electronics</a><span>/</span>
        <a href="/electronics/audio" className="hover:text-foreground">Audio</a><span>/</span>
        <span className="text-foreground" aria-current="page">Wireless Headphones Pro</span>
      </nav>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Wireless Headphones Pro</h1>
          <Badge variant="secondary">In Stock</Badge>
        </div>
        <p className="text-xl font-semibold">$299.99</p>
        <Separator />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Product Details</h3>
          <p className="text-muted-foreground">Premium wireless headphones with active noise cancellation, 30-hour battery life, and spatial audio support.</p>
        </div>
        <div className="flex gap-3">
          <Button>Add to Cart</Button>
          <Button variant="outline" onClick={() => window.history.back()}>Back</Button>
        </div>
      </div>
    </div>
  );
}
