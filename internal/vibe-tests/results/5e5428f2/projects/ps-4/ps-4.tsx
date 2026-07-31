import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';

export default function ProductDetailPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col gap-4">
      <nav className="flex items-center gap-1 text-sm text-muted-foreground">
        <a href="/" className="hover:underline">Home</a><span>/</span>
        <a href="/electronics" className="hover:underline">Electronics</a><span>/</span>
        <a href="/electronics/headphones" className="hover:underline">Headphones</a><span>/</span>
        <span className="text-foreground">Studio Pro Max</span>
      </nav>
      <div className="flex gap-6">
        <img className="w-1/2 h-96 object-cover rounded-lg" src="https://picsum.photos/600/400" alt="Studio Pro Max Headphones" />
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">Studio Pro Max</h1>
          <p className="text-muted-foreground">Premium wireless headphones with active noise cancellation</p>
          <span className="text-2xl font-bold">$349.99</span>
          <Card>
            <CardContent className="flex flex-col gap-2 p-4">
              <span className="font-semibold">Key Features</span>
              <span>Active Noise Cancellation</span>
              <span>40-hour battery life</span>
              <span>Spatial Audio support</span>
              <span>Premium memory foam cushions</span>
            </CardContent>
          </Card>
          <div className="flex gap-2">
            <Button>Add to Cart</Button>
            <Button variant="secondary">Save for Later</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
