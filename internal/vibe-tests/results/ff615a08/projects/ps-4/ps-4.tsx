import {Card, CardContent} from '../components/ui/card';
import {Button} from '../components/ui/button';

export default function ProductDetailPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex items-center gap-1.5">
          <li><a href="/" className="hover:text-foreground">Home</a></li>
          <li>/</li>
          <li><a href="/electronics" className="hover:text-foreground">Electronics</a></li>
          <li>/</li>
          <li><a href="/electronics/audio" className="hover:text-foreground">Audio</a></li>
          <li>/</li>
          <li aria-current="page" className="text-foreground font-medium">Wireless Headphones Pro</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="pt-6">
            <div className="w-full h-72 bg-muted rounded-lg" />
          </CardContent>
        </Card>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">Wireless Headphones Pro</h1>
          <p className="text-2xl font-bold">$299.99</p>
          <p className="text-muted-foreground">Premium noise-canceling wireless headphones with 30-hour battery life.</p>
          <div className="flex gap-3">
            <Button>Add to Cart</Button>
            <Button variant="outline">Save for Later</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
