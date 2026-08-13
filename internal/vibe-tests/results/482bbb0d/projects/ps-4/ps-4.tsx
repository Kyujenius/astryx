import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';

export default function ProductDetailPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          <li><a href="/" className="hover:text-foreground">Home</a></li>
          <li>/</li>
          <li><a href="/electronics" className="hover:text-foreground">Electronics</a></li>
          <li>/</li>
          <li aria-current="page" className="text-foreground font-medium">Wireless Headphones</li>
        </ol>
      </nav>
      <div className="flex flex-wrap gap-6">
        <img
          src="https://placehold.co/400x300"
          alt="Wireless Headphones"
          className="rounded-lg max-w-[400px]"
        />
        <Card className="w-[360px]">
          <CardContent className="p-6 flex flex-col gap-3">
            <h1 className="text-2xl font-bold">Wireless Headphones</h1>
            <p className="text-xl font-bold">$79.99</p>
            <p className="text-muted-foreground">
              Premium over-ear headphones with active noise cancellation,
              40-hour battery life, and multipoint Bluetooth connectivity.
            </p>
            <Separator />
            <div className="flex gap-2">
              <Button>Add to cart</Button>
              <Button variant="outline">Save for later</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
